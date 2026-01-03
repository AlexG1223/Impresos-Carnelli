<?php
session_start();
require_once __DIR__ . "/../conexion.php";

if (!isset($_SESSION["user"]["id"])) {
    echo json_encode(["success" => false, "message" => "No autenticado"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
$id_ot = $data['id_ot'] ?? null;

if (!$id_ot) {
    echo json_encode([
        "success" => false,
        "message" => "ID inválido"
    ]);
    exit;
}

$conexion = conectar_bd();

$stmt = $conexion->prepare("DELETE FROM ordenes_trabajo WHERE id = ?");
$stmt->bind_param("i", $id_ot);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "OT eliminada correctamente"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Error al eliminar la OT"
    ]);
}

$stmt->close();
$conexion->close();
