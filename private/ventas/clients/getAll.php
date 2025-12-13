<?php

require_once __DIR__ . "/../../conexion.php";
$conexion = conectar_bd();

$sql = "
    SELECT 
        id,
        razon_social,
        nombre_empresa,
        rut,
        telefono,
        observaciones,
        fecha_alta,
        departamento,
        localidad,
        direccion
    FROM clientes
    ORDER BY fecha_alta DESC
";

$result = $conexion->query($sql);

if (!$result) {
    echo json_encode([
        "success" => false,
        "error" => $conexion->error
    ]);
    exit;
}

$clientes = [];

while ($row = $result->fetch_assoc()) {
    $clientes[] = $row;
}

echo json_encode([
    "success" => true,
    "data" => $clientes
]);
