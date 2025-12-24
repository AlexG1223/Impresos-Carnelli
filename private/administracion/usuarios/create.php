<?php
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["success" => false, "message" => "Datos inválidos"]);
    exit;
}

if (!isset($data["nombre"], $data["password"], $data["rol"])) {
    echo json_encode(["success" => false, "message" => "Campos incompletos"]);
    exit;
}

$nombre = $data["nombre"];
$password = password_hash($data["password"], PASSWORD_DEFAULT);
$rol = $data["rol"];

require_once __DIR__ . "/../../conexion.php";

$conexion = conectar_bd();

$sql = "INSERT INTO usuarios (nombre, contrasenia, rol) VALUES (?, ?, ?)";
$stmt = $conexion->prepare($sql);

if (!$stmt) {
    echo json_encode(["success" => false, "error" => $conexion->error]);
    exit;
}

$stmt->bind_param("sss", $nombre, $password, $rol);

$ok = $stmt->execute();

if (!$ok) {
    echo json_encode(["success" => false, "error" => $stmt->error]);
    exit;
}

echo json_encode(["success" => true]);
