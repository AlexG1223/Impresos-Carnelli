<?php
session_start();

if (!isset($_SESSION["user"]["id"])) {
    echo json_encode(["success" => false, "message" => "No autenticado"]);
    exit;
}

require_once __DIR__ . "/../conexion.php";
$conexion = conectar_bd();

$id_cliente = (int)($_POST["id_cliente"] ?? 0);
$fecha_ingreso = $_POST["fecha_ingreso"] ?? null;

if (!$id_cliente || !$fecha_ingreso) {
    echo json_encode(["success" => false, "message" => "Datos incompletos"]);
    exit;
}

$id_vendedor = (int)$_SESSION["user"]["id"];

$detalle_trabajo = $_POST["detalle_trabajo"] ?? null;
$presupuesto = $_POST["presupuesto"] ?? null;
$fecha_prometida = $_POST["fecha_prometida"] ?? null;
$sena = $_POST["sena"] ?? null;
$cantidad_impresiones = $_POST["cantidad_impresiones"] ?? null;

$sector_destino = $_POST["sector_destino"] ?? "DISEÑO";
$es_repeticion = isset($_POST["es_repeticion"]) ? 1 : 0;
$ot_origen_id = isset($_POST["ot_origen_id"]) ? (int)$_POST["ot_origen_id"] : null;

// Regla de negocio: etapa según repetición
$etapa = $es_repeticion ? "EN_PRODUCCION" : ($_POST["etapa"] ?? "INGRESADA");


$es_repeticion = isset($_POST["es_repeticion"]) ? 1 : 0;
$ot_origen_id = isset($_POST["ot_origen_id"]) ? (int)$_POST["ot_origen_id"] : null;


$sql = "
INSERT INTO ordenes_trabajo
(id_cliente, id_vendedor, detalle_trabajo, presupuesto, fecha_ingreso, fecha_prometida, es_repeticion, sector_destino, sena, cantidad_impresiones, etapa)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
";

$stmt = $conexion->prepare($sql);
$stmt->bind_param(
    "iisdssisdis",
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
    $etapa
);

if (!$stmt->execute()) {
    echo json_encode(["success" => false, "error" => $stmt->error]);
    exit;
}

$id_orden = $stmt->insert_id;

$accion = $es_repeticion
    ? "Creación de OT repetida (ingresa directamente a Producción desde OT #$ot_origen_id)"
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
