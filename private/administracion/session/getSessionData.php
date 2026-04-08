<?php
// Asegúrate de que NO haya espacios antes de <?php
header('Content-Type: application/json');
session_start();

// Verificamos si la sesión existe
if (!isset($_SESSION["user"]["id"])) {
    echo json_encode([
        "success" => false,
        "message" => "No autenticado"
    ]);
    exit;
}

// Preparamos la respuesta con lo que realmente guardaste en el login
$response = [
    "success" => true,
    "data" => [
        "id"     => $_SESSION["user"]["id"],
        "nombre" => $_SESSION["user"]["nombre"],
        "rol"    => $_SESSION["user"]["rol"],
        // Si necesitas los sectores en el frontend, agrégalos aquí:
        "sectores" => $_SESSION["sectores"] ?? []
    ]
];

echo json_encode($response);
exit;