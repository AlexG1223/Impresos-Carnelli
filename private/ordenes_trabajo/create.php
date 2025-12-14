<?php

session_start();

if (!isset($_SESSION["user"]["id"])) {
    echo json_encode(["success" => false, "message" => "No autenticado"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data["id_cliente"], $data["fecha_ingreso"])) {
    echo json_encode(["success" => false, "message" => "Datos incompletos"]);
    exit;
}

require_once __DIR__ . "/../conexion.php";
$conexion = conectar_bd();

$id_cliente = (int)$data["id_cliente"];
$id_vendedor = (int)$_SESSION["user"]["id"];

$detalle_trabajo = $data["detalle_trabajo"] ?? null;
$presupuesto = $data["presupuesto"] ?? null;
$fecha_ingreso = $data["fecha_ingreso"];
$fecha_prometida = $data["fecha_prometida"] ?? null;

$es_repeticion = isset($data["es_repeticion"]) ? 1 : 0;

$sector_destino = $data["sector_destino"] ?? "DISEÑO";
$sena = $data["sena"] ?? null;
$cantidad_impresiones = $data["cantidad_impresiones"] ?? null;
$etapa = $data["etapa"] ?? "INGRESADA";

$sql = "
INSERT INTO ordenes_trabajo
(id_cliente, id_vendedor, detalle_trabajo, presupuesto, fecha_ingreso, fecha_prometida, es_repeticion, sector_destino, sena, cantidad_impresiones, etapa)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
";

$stmt = $conexion->prepare($sql);
$stmt->bind_param(
    "iisdssisdis",
    $id_cliente,
    $id_vendedor,
    $detalle_trabajo,
    $presupuesto,
    $fecha_ingreso,
    $fecha_prometida,
    $es_repeticion,
    $sector_destino,
    $sena,
    $cantidad_impresiones,
    $etapa
);
if (!$stmt->execute()) {
    echo json_encode(["success" => false, "error" => $stmt->error]);
    exit;
}

$id_orden = $stmt->insert_id;
// luego pasar a funcion separada
$sqlHistorial = "
INSERT INTO historial_movimientos
(id_orden, id_usuario, fecha_hora, accion_realizada, sector)
VALUES (?, ?, NOW(), 'Creación de OT', ?)
";

$stmtH = $conexion->prepare($sqlHistorial);
$stmtH->bind_param("iis", $id_orden, $id_vendedor, $sector_destino);
$stmtH->execute();

echo json_encode([
    "success" => true,
    "id_orden" => $id_orden
]);
