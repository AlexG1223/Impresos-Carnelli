<?php

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode([
        "success" => false,
        "message" => "Datos inválidos"
    ]);
    exit;
}

$required = [
    "razon_social",
    "nombre",
    "empresa",
    "rut",
    "telefono",
    "departamento",
    "localidad",
    "direccion"
];



$razon_social   = $data["razon_social"] ?? "";
$nombre = $data["nombre"] ?? "Sin Nombre";
$empresa = $data["empresa"] ?? "";
$rut            = $data["rut"] ?? "";
$telefono       = $data["telefono"] ?? "";
$observaciones  = $data["observaciones"] ?? null;
$departamento   = $data["departamento"] ?? "";
$localidad      = $data["localidad"] ?? "";
$direccion      = $data["direccion"] ?? "";

require_once __DIR__ . "/../../conexion.php";
$conexion = conectar_bd();


$sql = "
    INSERT INTO clientes
    (razon_social, nombre, empresa, rut, telefono, observaciones, fecha_alta, departamento, localidad, direccion)
    VALUES (?, ?, ?, ?, ?, ?,CURDATE(), ?, ?, ?)
";

$stmt = $conexion->prepare($sql);

if (!$stmt) {
    echo json_encode([
        "success" => false,
        "error" => $conexion->error
    ]);
    exit;
}

$stmt->bind_param(
    "sssssssss",
    $razon_social,
    $nombre,
    $empresa,
    $rut,
    $telefono,
    $observaciones,
    $departamento,
    $localidad,
    $direccion
);

if (!$stmt->execute()) {
    echo json_encode([
        "success" => false,
        "error" => $stmt->error
    ]);
    exit;
}

echo json_encode([
    "success" => true,
    "id_cliente" => $stmt->insert_id
]);
