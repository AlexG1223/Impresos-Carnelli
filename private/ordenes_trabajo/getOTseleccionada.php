<?php
require_once __DIR__ . "/../conexion.php";
$conexion = conectar_bd();

$input = json_decode(file_get_contents("php://input"), true);
$otId = (int)($input ?? 0);

if ($otId <= 0) {
  echo json_encode([
    "success" => false,
    "message" => "ID de OT inválido"
  ]);
  exit;
}


$sqlOT = "
  SELECT 
    id,
    id_cliente,
    detalle_trabajo,
    sena,
    presupuesto,
    es_repeticion,
    sector_destino,
    cantidad_impresiones,
    direccion_entrega
  FROM ordenes_trabajo
  WHERE id = ?
  LIMIT 1
";

$stmtOT = $conexion->prepare($sqlOT);
$stmtOT->bind_param("i", $otId);
$stmtOT->execute();
$resultOT = $stmtOT->get_result();

if ($resultOT->num_rows === 0) {
  echo json_encode([
    "success" => false,
    "message" => "OT no encontrada"
  ]);
  exit;
}

$ot = $resultOT->fetch_assoc();

$sqlArchivos = "
  SELECT 
    id,
    ruta_archivo,
    tipo,
    fecha_subida
  FROM archivos
  WHERE id_orden = ?
  ORDER BY id ASC
";

$stmtArchivos = $conexion->prepare($sqlArchivos);
$stmtArchivos->bind_param("i", $otId);
$stmtArchivos->execute();

$archivos = [];
$resArchivos = $stmtArchivos->get_result();

while ($row = $resArchivos->fetch_assoc()) {
  $archivos[] = $row;
}


echo json_encode([
  "success" => true,
  "data" => [
    "orden_trabajo" => $ot,
    "archivos" => $archivos
  ]
]);
