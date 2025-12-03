<?php
header("Content-Type: application/json");

// Recibir JSON del frontend
$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["success" => false, "message" => "Datos inválidos"]);
    exit;
}

// PASAMOS el arreglo $data al controlador real dentro de private
require_once __DIR__ . "/../../../private/sesion/validacion.php";
