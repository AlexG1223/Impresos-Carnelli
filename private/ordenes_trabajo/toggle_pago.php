<?php
require_once __DIR__ . "/../conexion.php";

header('Content-Type: application/json');
$conexion = conectar_bd();

if (!isset($_POST['id_ot'])) {
    echo json_encode(["success" => false, "message" => "ID de OT no proporcionado"]);
    exit;
}

$id_ot = intval($_POST['id_ot']);

// 1. Obtener el estado actual
$res = $conexion->query("SELECT total_pago FROM ordenes_trabajo WHERE id = $id_ot");
if (!$fila = $res->fetch_assoc()) {
    echo json_encode(["success" => false, "message" => "OT no encontrada"]);
    exit;
}

$nuevo_estado = $fila['total_pago'] == 1 ? 0 : 1;

// 2. Actualizar
$sql = "UPDATE ordenes_trabajo SET total_pago = ? WHERE id = ?";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("ii", $nuevo_estado, $id_ot);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "nuevo_pago" => $nuevo_estado]);
} else {
    echo json_encode(["success" => false, "message" => "Error al actualizar el pago"]);
}
