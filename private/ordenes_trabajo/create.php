<?php
session_start();

header("Content-Type: application/json");

if (!isset($_SESSION["user"]["id"])) {
    echo json_encode(["success" => false, "message" => "No autenticado"]);
    exit;
}

require_once __DIR__ . "/../conexion.php";
$conexion = conectar_bd();


$id_cliente     = (int)($_POST["id_cliente"] ?? 0);
$fecha_ingreso  = $_POST["fecha_ingreso"] ?? null;

if (!$id_cliente || !$fecha_ingreso) {
    echo json_encode(["success" => false, "message" => "Datos incompletos"]);
    exit;
}


$id_vendedor = (int)$_SESSION["user"]["id"];

$detalle_trabajo        = $_POST["detalle_trabajo"] ?? null;
$presupuesto            = $_POST["presupuesto"] ?? null;
$fecha_prometida        = $_POST["fecha_prometida"] ?? null;
$sena                   = $_POST["sena"] ?? null;
$cantidad_impresiones   = $_POST["cantidad_impresiones"] ?? null;
$direccion_entrega      = $_POST["direccion_entrega"] ?? null;
$aclaracion_entrega     = $_POST["aclaracion_entrega"] ?? null;

$sector_destino = isset($_POST["sector_destino"]) ? trim($_POST["sector_destino"]) : "DISEÑO";

$es_repeticion = isset($_POST["es_repeticion"]) ? 1 : 0;
$ot_origen_id  = isset($_POST["ot_origen_id"]) ? (int)$_POST["ot_origen_id"] : null;

if ($es_repeticion) {
    $etapa = "EN_PRODUCCION";
} else {

    $sector_comparar = mb_strtoupper($sector_destino, 'UTF-8');
    
    if ($sector_comparar === "DISEÑO" || $sector_comparar === "DISEÑO ") {
        $etapa = "INGRESADA";
    } else {
        $etapa = "EN_PRODUCCION";
    }
}
$sql = "
INSERT INTO ordenes_trabajo
(id_cliente, id_vendedor, detalle_trabajo, presupuesto, fecha_ingreso, fecha_prometida, es_repeticion, sector_destino, sena, cantidad_impresiones, etapa, direccion_entrega, aclaracion_entrega)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
";

$stmt = $conexion->prepare($sql);
$stmt->bind_param(
    "iisdssisdisss",
    $id_cliente,
    $id_vendedor,
    $detalle_trabajo,
    $presupuesto,
    $fecha_ingreso,
    $fecha_prometida,
    $es_repeticion,
    $sector_destino,
    $sena,
    $cantidad_impresiones,
    $etapa,
    $direccion_entrega,
    $aclaracion_entrega
);

if (!$stmt->execute()) {
    echo json_encode(["success" => false, "error" => $stmt->error]);
    exit;
}

$id_orden = $stmt->insert_id;

$accion = $es_repeticion
    ? "Creación de OT repetida (desde OT #$ot_origen_id)"
    : "Creación de OT";

$sqlHistorial = "
INSERT INTO historial_movimientos
(id_orden, id_usuario, fecha_hora, accion_realizada, sector)
VALUES (?, ?, NOW(), ?, ?)
";

$stmtH = $conexion->prepare($sqlHistorial);
$stmtH->bind_param(
    "iiss",
    $id_orden,
    $id_vendedor,
    $accion,
    $sector_destino
);
$stmtH->execute();


if ($es_repeticion && $ot_origen_id) {
    // 1. Buscamos el detalle de la OT origen
    $sqlDetalleProduccion = "
        SELECT especificaciones_tecnicas, sector_responsable 
        FROM detalle_produccion 
        WHERE id_orden = ?
    ";

    $stmtDetalle = $conexion->prepare($sqlDetalleProduccion);
    $stmtDetalle->bind_param("i", $ot_origen_id);
    $stmtDetalle->execute();
    $resultDetalle = $stmtDetalle->get_result();

    if ($resultDetalle && $resultDetalle->num_rows > 0) {
        $detalle = $resultDetalle->fetch_assoc();
        $especificaciones_tecnicas = $detalle["especificaciones_tecnicas"];
        $sector_responsable = $detalle["sector_responsable"];

        // 2. Insertamos en la nueva OT
        $sqlInsertDetalleProduccion = "
            INSERT INTO detalle_produccion 
            (id_orden, especificaciones_tecnicas, sector_responsable) 
            VALUES (?, ?, ?)
        ";

        $stmtInsertDetalle = $conexion->prepare($sqlInsertDetalleProduccion);
        $stmtInsertDetalle->bind_param(
            "iss", 
            $id_orden, 
            $especificaciones_tecnicas, 
            $sector_responsable
        );
        $stmtInsertDetalle->execute();
    }

    $sqlArchivosOrigen = "
        SELECT ruta_archivo, tipo, etapa_origen
        FROM archivos
        WHERE id_orden = ?
    ";

    $stmtOrigen = $conexion->prepare($sqlArchivosOrigen);
    $stmtOrigen->bind_param("i", $ot_origen_id);
    $stmtOrigen->execute();
    $result = $stmtOrigen->get_result();

    if ($result->num_rows > 0) {
        $destinoBase = __DIR__ . "/../../uploads/ordenes/$id_orden/";
        if (!is_dir($destinoBase)) {
            mkdir($destinoBase, 0777, true);
        }

        while ($archivo = $result->fetch_assoc()) {
            $rutaOrigenBD = $archivo["ruta_archivo"];
            $rutaOrigenFS = __DIR__ . "/../../" . $rutaOrigenBD;

            if (!file_exists($rutaOrigenFS)) continue;

            $extension = pathinfo($rutaOrigenFS, PATHINFO_EXTENSION);
            $nuevoNombre = uniqid("archivo_") . "." . $extension;
            $rutaDestinoFS = $destinoBase . $nuevoNombre;

            if (copy($rutaOrigenFS, $rutaDestinoFS)) {
                $rutaDestinoBD = "uploads/ordenes/$id_orden/" . $nuevoNombre;

                $sqlInsertArchivo = "
                    INSERT INTO archivos
                    (id_orden, ruta_archivo, tipo, etapa_origen)
                    VALUES (?, ?, ?, ?)
                ";

                $stmtInsert = $conexion->prepare($sqlInsertArchivo);
                $stmtInsert->bind_param(
                    "isss",
                    $id_orden,
                    $rutaDestinoBD,
                    $archivo["tipo"],
                    $archivo["etapa_origen"]
                );
                $stmtInsert->execute();
            }
        }
    }
}


if (!empty($_FILES["archivos"]["name"][0])) {

    $basePath = __DIR__ . "/../../uploads/ordenes/$id_orden/";
    if (!is_dir($basePath)) {
        mkdir($basePath, 0777, true);
    }

    foreach ($_FILES["archivos"]["tmp_name"] as $index => $tmpName) {

        if ($_FILES["archivos"]["error"][$index] !== UPLOAD_ERR_OK) continue;

        $nombreOriginal = $_FILES["archivos"]["name"][$index];
        $extension = pathinfo($nombreOriginal, PATHINFO_EXTENSION);

        $nombreFinal = uniqid("archivo_") . "." . $extension;
        $rutaFinal = $basePath . $nombreFinal;

        if (move_uploaded_file($tmpName, $rutaFinal)) {

            $rutaBD = "uploads/ordenes/$id_orden/" . $nombreFinal;

            $sqlArchivo = "
            INSERT INTO archivos
            (id_orden, ruta_archivo, tipo, etapa_origen)
            VALUES (?, ?, ?, ?)
            ";

            $stmtA = $conexion->prepare($sqlArchivo);
            $stmtA->bind_param(
                "isss",
                $id_orden,
                $rutaBD,
                $extension,
                $etapa
            );
            $stmtA->execute();
        }
    }
}

echo json_encode([
    "success" => true,
    "id_orden" => $id_orden,
    "es_repeticion" => $es_repeticion,
    "ot_origen_id" => $ot_origen_id
]);
