<?php
session_start();
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);
$user = $data['username'] ?? '';
$pass = $data['password'] ?? '';

if ($user === 'Usuario' && $pass === 'JorgeMauro12345!') {
    $_SESSION['logged_in'] = true;
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => "Credenciales incorrectas"]);
}
?>
