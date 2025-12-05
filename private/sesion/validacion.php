<?php
session_start();
require_once __DIR__ . "/../conexion.php";

header("Content-Type: application/json");

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


if (!password_verify($password, $user['contrasenia'])) {
    echo json_encode(["success" => false, "message" => "Contraseña incorrecta"]);
    exit;
}


$sqlSectores = "SELECT ventas, serigrafia, offset, expedicion, `diseño`, administracion 
                FROM sectores 
                WHERE id_usr = ?";

$stmt2 = $conexion->prepare($sqlSectores);
$stmt2->bind_param("i", $user['id']);
$stmt2->execute();

$resultSectores = $stmt2->get_result();

$sectoresDisponibles = [];

if ($resultSectores->num_rows > 0) {
    $row = $resultSectores->fetch_assoc();
    foreach ($row as $sector => $valor) {
        if ($valor == 1) {
            $sectoresDisponibles[] = $sector;
        }
    }
}


$_SESSION['user'] = [
    "id" => $user['id'],
    "nombre" => $user['nombre'],
    "rol" => $user['rol']
];

$_SESSION["sectores"] = $sectoresDisponibles;
$_SESSION["sector_actual"] = null;


echo json_encode([
    "success" => true,
    "user" => $_SESSION['user'],
    "sectores" => $_SESSION["sectores"]
]);
