<?php
require_once __DIR__ . "/../conexion.php";
$conexion = conectar_bd();

if (!isset($_POST['id_ot'], $_POST['presupuesto'], $_POST['fecha_ingreso'], $_POST['sector_destino'])) {
    echo json_encode(["success" => false, "message" => "Datos incompletos"]);
    exit;
}

$id_ot = $_POST['id_ot'];
$presupuesto = $_POST['presupuesto'];
$fecha_ingreso = $_POST['fecha_ingreso'];
$fecha_prometida = $_POST['fecha_prometida'] ?? null;
$detalle_trabajo = $_POST['detalle_trabajo'] ?? '';
$sena = $_POST['sena'] ?? 0;
$cantidad_impresiones = $_POST['cantidad_impresiones'] ?? 0;
$sector_destino = $_POST['sector_destino'];
$direccion_entrega = $_POST['direccion_entrega'];

$total_pago = isset($_POST['total_pago']) && $_POST['total_pago'] === 'on' ? 1 : 0;

if ($sector_destino !== 'OFFSET' && $sector_destino !== 'SERIGRAFIA') {
    echo json_encode(["success" => false, "message" => "Sector destino no válido"]);
    exit;
}

$sql = "UPDATE ordenes_trabajo SET 
            presupuesto = ?, 
            fecha_ingreso = ?, 
            fecha_prometida = ?, 
            detalle_trabajo = ?, 
            sena = ?, 
            cantidad_impresiones = ?, 
            sector_destino = ?, 
            total_pago = ?, 
            direccion_entrega = ?
        WHERE id = ?";

$stmt = $conexion->prepare($sql);
$stmt->bind_param(
    "dssssdsisi", 
    $presupuesto, 
    $fecha_ingreso, 
    $fecha_prometida, 
    $detalle_trabajo, 
    $sena, 
    $cantidad_impresiones, 
    $sector_destino, 
    $total_pago,  
    $direccion_entrega,
    $id_ot
);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => "Error al actualizar la OT: " . $stmt->error]);
}
?>
