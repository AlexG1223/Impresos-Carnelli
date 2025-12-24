<?php
session_start();

require_once __DIR__ . '/../../conexion.php';
$conexion = conectar_bd();

if (!isset($_SESSION['user'])) {
    echo json_encode(['success' => false, 'message' => 'No autenticado']);
    exit;
}

if ($_SESSION['user']['rol'] !== 'Administrador') {
    echo json_encode(['success' => false, 'message' => 'Acceso denegado']);
    exit;
}

$sql = "SELECT * FROM configuracion_sistema LIMIT 1";
$result = mysqli_query($conexion, $sql);

if ($row = mysqli_fetch_assoc($result)) {
    echo json_encode([
        'success' => true,
        'data' => [
            'id' => $row['id'],
            'es24hs' => (bool)$row['Es24hs'],
            'horaEntrada' => $row['Horario_Entrada'],
            'horaSalida' => $row['Horario_Salida']
        ]
    ]);
} else {
    echo json_encode([
        'success' => true,
        'data' => null
    ]);
}
