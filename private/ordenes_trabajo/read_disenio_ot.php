<?php
require_once __DIR__ . "/../conexion.php";
$conexion = conectar_bd();

$sql = "
SELECT
    ot.id,
    ot.id_cliente,
    ot.id_vendedor,
    ot.fecha_ingreso,
    ot.fecha_prometida,
    ot.etapa,

    c.nombre_empresa AS cliente_nombre,

    u.nombre AS vendedor_nombre,

    COUNT(a.id) AS total_archivos

FROM ordenes_trabajo ot

INNER JOIN clientes c
    ON ot.id_cliente = c.id

INNER JOIN usuarios u
    ON ot.id_vendedor = u.id

LEFT JOIN archivos a
    ON a.id_orden = ot.id

WHERE ot.sector_destino = 'DISEÑO'
  AND ot.etapa = 'INGRESADA'

GROUP BY ot.id
ORDER BY ot.fecha_ingreso ASC
";

$result = $conexion->query($sql);

if (!$result) {
    echo json_encode([
        "success" => false,
        "error" => $conexion->error
    ]);
    exit;
}

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode([
    "success" => true,
    "data" => $data
]);
