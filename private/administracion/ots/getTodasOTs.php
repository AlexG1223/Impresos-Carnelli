<?php
session_start();
header('Content-Type: application/json');

require_once __DIR__ . '/../../conexion.php';
$conexion = conectar_bd();

/* ===== Seguridad ===== */
if (!isset($_SESSION['user'])) {
    echo json_encode(['success' => false, 'message' => 'No autenticado']);
    exit;
}

if ($_SESSION['user']['rol'] !== 'Administrador') {
    echo json_encode(['success' => false, 'message' => 'Acceso denegado']);
    exit;
}

/* ===== Query ===== */
$sql = "
    SELECT
        ot.id AS id_ot,
        c.nombre_empresa AS cliente,
        u.nombre AS vendedor,
        DATE(ot.fecha_ingreso) AS fecha_ingreso,
        ot.fecha_prometida,

        CASE
            WHEN ot.etapa IN ('PRODUCCION', 'EN_PRODUCCION') THEN ot.sector_destino
            WHEN ot.etapa = 'INGRESADA' THEN 'DISEÑO'
            ELSE ot.etapa
        END AS estado,

        a.id AS archivo_id,
        a.ruta_archivo

    FROM ordenes_trabajo ot
    INNER JOIN clientes c ON c.id = ot.id_cliente
    INNER JOIN usuarios u ON u.id = ot.id_vendedor
    LEFT JOIN archivos a ON a.id_orden = ot.id
    ORDER BY ot.id DESC
";

$result = mysqli_query($conexion, $sql);

if (!$result) {
    echo json_encode(['success' => false, 'message' => 'Error en la consulta']);
    exit;
}

/* ===== Armado estructurado ===== */
$ots = [];

while ($row = mysqli_fetch_assoc($result)) {

    $idOT = $row['id_ot'];

    if (!isset($ots[$idOT])) {
        $ots[$idOT] = [
            'id_ot' => $row['id_ot'],
            'cliente' => $row['cliente'],
            'vendedor' => $row['vendedor'],
            'fecha_ingreso' => $row['fecha_ingreso'],
            'fecha_prometida' => $row['fecha_prometida'],
            'estado' => $row['estado'],
            'archivos' => []
        ];
    }

    if ($row['archivo_id']) {
        $ots[$idOT]['archivos'][] = [
            'id' => $row['archivo_id'],
            'nombre' => basename($row['ruta_archivo']),
            'url' => "/ICSoftware/public/api/archivos/descargar.php?id=" . $row['archivo_id']
        ];
    }
}

echo json_encode([
    'success' => true,
    'data' => array_values($ots)
]);
