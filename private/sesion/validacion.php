<?php
session_start();
require_once __DIR__ . "/../conexion.php";

$data = json_decode(file_get_contents("php://input"), true);

$username = $data['username'] ?? '';
$password = $data['password'] ?? '';

if (!$username || !$password) {
    echo json_encode(["success" => false, "message" => "Datos incompletos"]);
    exit;
}

$conexion = conectar_bd();

$sql = "SELECT * FROM usuarios WHERE nombre = ?";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(["success" => false, "message" => "Usuario no encontrado"]);
    exit;
}

$user = $result->fetch_assoc();

if ($password !== $user['contrasenia']) {
    echo json_encode(["success" => false, "message" => "Contraseña incorrecta"]);
    exit;
}

$_SESSION['user'] = [
    "id" => $user['id'],
    "nombre" => $user['nombre'],
    "rol" => $user['rol']
];

echo json_encode([
    "success" => true,
    "user" => $_SESSION['user']
]);
