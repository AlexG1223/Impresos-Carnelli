<?php
header('Content-Type: application/json');
require_once __DIR__ . "/../../conexion.php";

$conexion = conectar_bd();
$data = json_decode(file_get_contents("php://input"), true);

$idOrden = (int)($data["idOrden"] ?? 0);

if (!$idOrden) {
    echo json_encode(["success" => false, "message" => "ID inválido"]);
    exit;
}

$sqlGet = "SELECT comision_paga FROM ordenes_trabajo WHERE id = ?";
$stmt = $conexion->prepare($sqlGet);
$stmt->bind_param("i", $idOrden);
$stmt->execute();
$res = $stmt->get_result();
$row = $res->fetch_assoc();

if (!$row) {
    echo json_encode(["success" => false, "message" => "Orden no encontrada"]);
    exit;
}

$nuevoEstado = $row["comision_paga"] ? 0 : 1;

$sqlUpdate = "UPDATE ordenes_trabajo SET comision_paga = ? WHERE id = ?";
$stmt = $conexion->prepare($sqlUpdate);
$stmt->bind_param("ii", $nuevoEstado, $idOrden);
$stmt->execute();

echo json_encode([
    "success" => true,
    "comision_paga" => $nuevoEstado
]);
