<?php
require_once __DIR__ . "/../../conexion.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || empty($data['id'])) {
    echo json_encode(["success" => false, "message" => "ID de usuario inválido"]);
    exit;
}

$id = $data['id'];

$conexion = conectar_bd();

$sql = "DELETE FROM usuarios WHERE id = ?";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => "Error al eliminar el usuario"]);
}
?>
