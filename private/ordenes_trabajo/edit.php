<?php
require_once __DIR__ . "/../conexion.php";

header('Content-Type: application/json');
$conexion = conectar_bd();

if (!isset($_POST['id_ot'], $_POST['presupuesto'], $_POST['fecha_ingreso'], $_POST['sector_destino'])) {
    echo json_encode(["success" => false, "message" => "Datos incompletos"]);
    exit;
}

$id_ot = intval($_POST['id_ot']);
$presupuesto = floatval($_POST['presupuesto']);
$fecha_ingreso = $_POST['fecha_ingreso'];
$fecha_prometida = $_POST['fecha_prometida'] ?? null;
$detalle_trabajo = $_POST['detalle_trabajo'] ?? '';
$sena = floatval($_POST['sena'] ?? 0);
$cantidad_impresiones = intval($_POST['cantidad_impresiones'] ?? 0);
$sector_destino = $_POST['sector_destino'];
$direccion_entrega = $_POST['direccion_entrega'] ?? '';
$total_pago = isset($_POST['total_pago']) && $_POST['total_pago'] === 'on' ? 1 : 0;

// 1. Actualización de datos básicos de la OT
$sql = "UPDATE ordenes_trabajo SET 
            presupuesto = ?, fecha_ingreso = ?, fecha_prometida = ?, 
            detalle_trabajo = ?, sena = ?, cantidad_impresiones = ?, 
            sector_destino = ?, total_pago = ?, direccion_entrega = ?
        WHERE id = ?";

$stmt = $conexion->prepare($sql);
$stmt->bind_param("dsssdisssi", $presupuesto, $fecha_ingreso, $fecha_prometida, $detalle_trabajo, $sena, $cantidad_impresiones, $sector_destino, $total_pago, $direccion_entrega, $id_ot);

if (!$stmt->execute()) {
    echo json_encode(["success" => false, "message" => "Error al actualizar la OT"]);
    exit;
}

// 2. ELIMINAR ARCHIVOS MARCADOS (Los que el usuario quitó en el front)
if (!empty($_POST['archivos_eliminados'])) {
    foreach ($_POST['archivos_eliminados'] as $id_archivo) {
        $id_archivo = intval($id_archivo);
        
        // Buscamos la ruta para borrar el archivo físico
        $res = $conexion->query("SELECT ruta_archivo FROM archivos WHERE id = $id_archivo");
        if ($fila = $res->fetch_assoc()) {
            $rutaFisica = __DIR__ . "/../../" . $fila['ruta_archivo'];
            if (file_exists($rutaFisica)) {
                unlink($rutaFisica);
            }
        }
        // Borramos el registro
        $conexion->query("DELETE FROM archivos WHERE id = $id_archivo");
    }
}

// 3. CARGAR ARCHIVOS NUEVOS
// Nota: Usamos "inputAgregarArchivo" que es el ID/Name que definimos en el frontend corregido
if (!empty($_FILES["archivos"]["name"][0])) {
    $basePath = __DIR__ . "/../../uploads/ordenes/$id_ot/";
    if (!is_dir($basePath)) {
        mkdir($basePath, 0777, true);
    }

    foreach ($_FILES["archivos"]["tmp_name"] as $index => $tmpName) {
        if ($_FILES["archivos"]["error"][$index] !== UPLOAD_ERR_OK) continue;

        $nombreOriginal = $_FILES["archivos"]["name"][$index];
        $extension = strtolower(pathinfo($nombreOriginal, PATHINFO_EXTENSION));
        $nombreFinal = uniqid("archivo_") . "." . $extension;
        $rutaFinal = $basePath . $nombreFinal;

        if (move_uploaded_file($tmpName, $rutaFinal)) {
            $rutaBD = "uploads/ordenes/$id_ot/" . $nombreFinal;
            $etapa = "MODIFICACION";

            $stmtA = $conexion->prepare("INSERT INTO archivos (id_orden, ruta_archivo, tipo, etapa_origen) VALUES (?, ?, ?, ?)");
            $stmtA->bind_param("isss", $id_ot, $rutaBD, $extension, $etapa);
            $stmtA->execute();
        }
    }
}

echo json_encode(["success" => true]);