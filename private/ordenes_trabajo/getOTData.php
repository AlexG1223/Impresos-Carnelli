<?php
session_start();

if (!isset($_SESSION["user"]["id"])) {
    echo json_encode(["success" => false, "message" => "No autenticado"]);
    exit;
}

require_once __DIR__ . "/../conexion.php";
$conexion = conectar_bd();

$data = json_decode(file_get_contents("php://input"), true);
$id_ot = $data['id_ot'] ?? null;

if (!$id_ot) {
    echo json_encode(["success" => false, "message" => "ID OT inválido"]);
    exit;
}

$sql = "
SELECT 
    ot.id AS id_ot,
    ot.id_cliente,
    ot.id_vendedor,
    ot.detalle_trabajo,
    ot.presupuesto,
    ot.fecha_ingreso,
    ot.fecha_prometida,
    ot.sena,
    ot.cantidad_impresiones,
    ot.sector_destino,
    ot.es_repeticion,
    ot.etapa,
    c.nombre_empresa AS cliente_nombre,
    u.nombre AS vendedor_nombre
FROM ordenes_trabajo ot
JOIN clientes c ON ot.id_cliente = c.id
JOIN usuarios u ON ot.id_vendedor = u.id
WHERE ot.id = ?
";

$stmt = $conexion->prepare($sql);
$stmt->bind_param("i", $id_ot);

if (!$stmt->execute()) {
    echo json_encode(["success" => false, "message" => "Error al obtener los datos de la OT"]);
    exit;
}

$result = $stmt->get_result();
$ot = $result->fetch_assoc();

if (!$ot) {
    echo json_encode(["success" => false, "message" => "OT no encontrada"]);
    exit;
}

echo json_encode(["success" => true, "data" => $ot]);

$stmt->close();
$conexion->close();
