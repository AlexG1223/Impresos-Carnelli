<?php
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["success" => false, "message" => "Datos inválidos"]);
    exit;
}

if (!isset($data["id"], $data["nombre"], $data["password"], $data["rol"])) {
    echo json_encode(["success" => false, "message" => "Campos incompletos"]);
    exit;
}

$id = $data["id"];
$nombre = $data["nombre"];
$password = !empty($data["password"]) ? password_hash($data["password"], PASSWORD_DEFAULT) : null; // Si no hay contraseña, no se modifica
$rol = $data["rol"];

require_once __DIR__ . "/../../conexion.php";

$conexion = conectar_bd();

if ($password) {
    $sql = "UPDATE usuarios SET nombre = ?, contrasenia = ?, rol = ? WHERE id = ?";
    $stmt = $conexion->prepare($sql);
    $stmt->bind_param("sssi", $nombre, $password, $rol, $id);
} else {
    $sql = "UPDATE usuarios SET nombre = ?, rol = ? WHERE id = ?";
    $stmt = $conexion->prepare($sql);
    $stmt->bind_param("ssi", $nombre, $rol, $id);
}

if (!$stmt) {
    echo json_encode(["success" => false, "error" => $conexion->error]);
    exit;
}

$ok = $stmt->execute();

if (!$ok) {
    echo json_encode(["success" => false, "error" => $stmt->error]);
    exit;
}

echo json_encode(["success" => true]);
?>
