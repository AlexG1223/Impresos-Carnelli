<?php
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["success" => false, "message" => "Datos inválidos"]);
    exit;
}

require_once __DIR__ . "/../../../private/sesion/validacion.php";
