<?php
session_start();

header("Content-Type: application/json");

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
    c.nombre AS cliente,
    CASE 
        WHEN de.id IS NULL THEN 'PENDIENTE'
        ELSE 'LISTO'
    END AS estado_expedicion
FROM ordenes_trabajo ot
INNER JOIN clientes c 
    ON c.id = ot.id_cliente
LEFT JOIN detalle_expedicion de
    ON de.id_orden = ot.id
WHERE ot.etapa = 'EXPEDICION'
ORDER BY ot.id DESC
";

$stmt = $conexion->prepare($sql);

if (!$stmt) {
  echo json_encode([
    "success" => false,
    "message" => "Error al preparar consulta",
    "error" => $conexion->error
  ]);
  exit;
}

if (!$stmt->execute()) {
  echo json_encode([
    "success" => false,
    "message" => "Error al ejecutar consulta",
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
