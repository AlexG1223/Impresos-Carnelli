<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

header('Content-Type: application/json; charset=UTF-8');

if (!isset($_SESSION['user'])) {
    http_response_code(403);
    echo json_encode(['success' => false, 'message' => 'No autenticado']);
    exit;
}

require_once __DIR__ . '/../conexion.php';
$conexion = conectar_bd();

$input = json_decode(file_get_contents('php://input'), true);
$id_orden = (int)($input['id_orden'] ?? 0);
$especificaciones = $input['especificaciones_tecnicas'] ?? '';

if ($id_orden <= 0) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'ID de orden inválido']);
    exit;
}

if (is_array($especificaciones)) {
    $especificaciones = json_encode($especificaciones, JSON_UNESCAPED_UNICODE);
}

// Verificar si existe registro en detalle_produccion
$checkSql = "SELECT id FROM detalle_produccion WHERE id_orden = ? LIMIT 1";
$stmtCheck = $conexion->prepare($checkSql);
$stmtCheck->bind_param("i", $id_orden);
$stmtCheck->execute();
$resCheck = $stmtCheck->get_result();

if ($resCheck->num_rows > 0) {
    $sqlDP = "UPDATE detalle_produccion SET especificaciones_tecnicas = ? WHERE id_orden = ?";
    $stmtDP = $conexion->prepare($sqlDP);
    $stmtDP->bind_param("si", $especificaciones, $id_orden);
    $ok = $stmtDP->execute();
    $stmtDP->close();
} else {
    $sector = 'OFFSET';
    $resOT = $conexion->query("SELECT sector_destino FROM ordenes_trabajo WHERE id = $id_orden LIMIT 1");
    if ($resOT && $rowOT = $resOT->fetch_assoc()) {
        $sector = $rowOT['sector_destino'] ?: 'OFFSET';
    }
    $sqlDP = "INSERT INTO detalle_produccion (id_orden, especificaciones_tecnicas, sector_responsable, fecha_inicio_trabajo) VALUES (?, ?, ?, NOW())";
    $stmtDP = $conexion->prepare($sqlDP);
    $stmtDP->bind_param("iss", $id_orden, $especificaciones, $sector);
    $ok = $stmtDP->execute();
    $stmtDP->close();
}

$stmtCheck->close();
$conexion->close();

echo json_encode([
    'success' => true,
    'message' => 'Especificaciones técnicas guardadas correctamente'
]);
