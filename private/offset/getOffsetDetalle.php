<?php
session_start();
require_once __DIR__ . "/../conexion.php";

if (!isset($_SESSION['user'])) {
  echo json_encode(["success" => false, "message" => "No autenticado"]);
  exit;
}

$idOrden = $_GET['id'] ?? null;

if (!$idOrden) {
  echo json_encode(["success" => false, "message" => "ID inválido"]);
  exit;
}

$conexion = conectar_bd();

$sql = "
SELECT 
  ot.id AS ot_id,
  c.nombre_empresa,
  dp.fecha_inicio_trabajo,
  dp.especificaciones_tecnicas
FROM detalle_produccion dp
JOIN ordenes_trabajo ot ON ot.id = dp.id_orden
JOIN clientes c ON c.id = ot.id_cliente
WHERE dp.id_orden = ?
  AND dp.sector_responsable = 'OFFSET'
  AND dp.fecha_fin_trabajo IS NULL
LIMIT 1
";

$stmt = $conexion->prepare($sql);
$stmt->bind_param("i", $idOrden);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
  echo json_encode(["success" => false, "message" => "No se encontró la OT"]);
  exit;
}

echo json_encode([
  "success" => true,
  "data" => $result->fetch_assoc()
]);
