<?php
session_start();

header('Content-Type: application/json');

if (!isset($_SESSION["user"]["id"])) {
    echo json_encode([
        "success" => false,
        "message" => "No autenticado"
    ]);
    exit;
}

require_once __DIR__ . "/../conexion.php";
$conexion = conectar_bd();

$data = json_decode(file_get_contents("php://input"), true);
$id_ot = $data['id_ot'] ?? null;

if (!$id_ot) {
    echo json_encode([
        "success" => false,
        "message" => "ID OT inválido"
    ]);
    exit;
}


$sql_ot = "
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
    ot.direccion_entrega,
    ot.total_pago, 
    ot.aclaracion_entrega,
    c.nombre AS cliente_nombre,
    u.nombre AS vendedor_nombre
FROM ordenes_trabajo ot
JOIN clientes c ON ot.id_cliente = c.id
JOIN usuarios u ON ot.id_vendedor = u.id
WHERE ot.id = ?
";

$stmt_ot = $conexion->prepare($sql_ot);
$stmt_ot->bind_param("i", $id_ot);

if (!$stmt_ot->execute()) {
    echo json_encode([
        "success" => false,
        "message" => "Error al obtener la OT"
    ]);
    exit;
}

$result_ot = $stmt_ot->get_result();
$ot = $result_ot->fetch_assoc();

$stmt_ot->close();

if (!$ot) {
    echo json_encode([
        "success" => false,
        "message" => "OT no encontrada"
    ]);
    exit;
}

$sql_archivos = "
SELECT 
    id,
    tipo,
    ruta_archivo
FROM archivos
WHERE id_orden = ?
";

$stmt_arch = $conexion->prepare($sql_archivos);
$stmt_arch->bind_param("i", $id_ot);

if (!$stmt_arch->execute()) {
    echo json_encode([
        "success" => false,
        "message" => "Error al obtener archivos"
    ]);
    exit;
}

$result_arch = $stmt_arch->get_result();

$archivos = [];

while ($row = $result_arch->fetch_assoc()) {
    $archivos[] = [
        "id" => $row["id"],
        "tipo" => $row["tipo"],
        "ruta_archivo" => $row["ruta_archivo"]
    ];
}

$stmt_arch->close();

$ot["archivos"] = $archivos;

echo json_encode([
    "success" => true,
    "data" => $ot
]);

$conexion->close();
