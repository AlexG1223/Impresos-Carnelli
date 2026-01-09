<?php
session_start();

if (!isset($_SESSION["user"]["id"])) {
    echo json_encode([
        "success" => false,
        "message" => "No autenticado"
    ]);
    exit;
}

require_once __DIR__ . "/../conexion.php";
$conexion = conectar_bd();

$sql = "
SELECT 
    ot.id,
    ot.detalle_trabajo,
      ot.cantidad_impresiones,
    c.nombre_empresa AS cliente,
    dp.fecha_inicio_trabajo,
    dp.fecha_fin_trabajo
FROM ordenes_trabajo ot
INNER JOIN clientes c 
    ON c.id = ot.id_cliente
LEFT JOIN detalle_produccion dp 
    ON dp.id_orden = ot.id
WHERE ot.etapa = 'EN_PRODUCCION' and dp.sector_responsable = 'SERIGRAFIA'
ORDER BY ot.id DESC
";

$stmt = $conexion->prepare($sql);

if (!$stmt->execute()) {
    echo json_encode([
        "success" => false,
        "message" => "Error al obtener OTs",
        "error" => $stmt->error
    ]);
    exit;
}

$result = $stmt->get_result();

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode([
    "success" => true,
    "data" => $data
]);
