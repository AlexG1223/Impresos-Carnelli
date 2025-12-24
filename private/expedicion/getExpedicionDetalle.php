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

$idOrden = isset($_GET["id"]) ? (int)$_GET["id"] : 0;

if ($idOrden <= 0) {
  echo json_encode([
    "success" => false,
    "message" => "ID de orden inválido"
  ]);
  exit;
}

$sql = "
SELECT
  ot.id AS id_orden,
  c.nombre_empresa AS cliente,
  u.nombre AS vendedor,
  ot.fecha_prometida,

  -- DETALLE EXPEDICION (puede ser NULL)
  de.metodo_envio,
  de.direccion_entrega_final,
  de.estado_embalaje,
  de.fecha_lista_entrega,
  de.autorizado_ventas
FROM ordenes_trabajo ot
INNER JOIN clientes c ON c.id = ot.id_cliente
INNER JOIN usuarios u ON u.id = ot.id_vendedor
LEFT JOIN detalle_expedicion de ON de.id_orden = ot.id
WHERE ot.id = ?
LIMIT 1
";

$stmt = $conexion->prepare($sql);

if (!$stmt) {
  echo json_encode([
    "success" => false,
    "message" => "Error en prepare",
    "error" => $conexion->error
  ]);
  exit;
}

$stmt->bind_param("i", $idOrden);
$stmt->execute();

$result = $stmt->get_result();
$data = $result->fetch_assoc();

if (!$data) {
  echo json_encode([
    "success" => false,
    "message" => "Orden no encontrada"
  ]);
  exit;
}


$data["tiene_expedicion"] = $data["metodo_envio"] ? true : false;

echo json_encode([
  "success" => true,
  "data" => $data
]);
