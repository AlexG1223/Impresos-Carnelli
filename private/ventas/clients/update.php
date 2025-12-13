<?php

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data["id"])) {
    echo json_encode([
        "success" => false,
        "message" => "Datos inválidos"
    ]);
    exit;
}

$required = [
    "nombre_empresa",
    "razon_social",
    "rut",
    "direccion",
    "localidad",
    "telefono"
];

foreach ($required as $field) {
    if (!isset($data[$field]) || trim($data[$field]) === "") {
        echo json_encode([
            "success" => false,
            "message" => "Campo obligatorio faltante: $field"
        ]);
        exit;
    }
}

$id             = (int)$data["id"];
$nombre_empresa = $data["nombre_empresa"];
$razon_social   = $data["razon_social"];
$rut            = $data["rut"];
$direccion      = $data["direccion"];
$localidad      = $data["localidad"];
$telefono       = $data["telefono"];
$observaciones  = $data["observaciones"] ?? null;

require_once __DIR__ . "/../../conexion.php";
$conexion = conectar_bd();

$sql = "
    UPDATE clientes SET
        nombre_empresa = ?,
        razon_social   = ?,
        rut            = ?,
        direccion      = ?,
        localidad      = ?,
        telefono       = ?,
        observaciones  = ?
    WHERE id = ?
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
    "sssssssi",
    $nombre_empresa,
    $razon_social,
    $rut,
    $direccion,
    $localidad,
    $telefono,
    $observaciones,
    $id
);

if (!$stmt->execute()) {
    echo json_encode([
        "success" => false,
        "error" => $stmt->error
    ]);
    exit;
}

echo json_encode([
    "success" => true
]);
