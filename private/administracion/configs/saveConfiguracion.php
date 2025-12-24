<?php
session_start();

require_once __DIR__ . "/../../conexion.php";
$conexion = conectar_bd();

if (!isset($_SESSION['user'])) {
    echo json_encode(['success' => false, 'message' => 'No autenticado']);
    exit;
}

if ($_SESSION['user']['rol'] !== 'Administrador') {
    echo json_encode(['success' => false, 'message' => 'Acceso denegado']);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

$es24hs = isset($data['es24hs']) && $data['es24hs'] ? 1 : 0;
$horaEntrada = $data['horario_entrada'] ?? null;
$horaSalida  = $data['horario_salida'] ?? null;

if ($es24hs === 1) {
    $horaEntrada = null;
    $horaSalida = null;
}

if ($es24hs === 0) {
    if (!$horaEntrada || !$horaSalida) {
        echo json_encode([
            'success' => false,
            'message' => 'Debe definir horario de entrada y salida'
        ]);
        exit;
    }

    if ($horaEntrada >= $horaSalida) {
        echo json_encode([
            'success' => false,
            'message' => 'El horario de entrada debe ser menor al de salida'
        ]);
        exit;
    }
}

try {
    $checkSql = "SELECT id FROM configuracion_sistema LIMIT 1";
    $checkResult = mysqli_query($conexion, $checkSql);

    if ($row = mysqli_fetch_assoc($checkResult)) {
        $sql = "
            UPDATE configuracion_sistema
            SET 
                Es24hs = ?,
                Horario_Entrada = ?,
                Horario_Salida = ?
            WHERE id = ?
        ";

        $stmt = mysqli_prepare($conexion, $sql);
        mysqli_stmt_bind_param(
            $stmt,
            "issi",
            $es24hs,
            $horaEntrada,
            $horaSalida,
            $row['id']
        );

    } else {
        $sql = "
            INSERT INTO configuracion_sistema 
            (Es24hs, Horario_Entrada, Horario_Salida)
            VALUES (?, ?, ?)
        ";

        $stmt = mysqli_prepare($conexion, $sql);
        mysqli_stmt_bind_param(
            $stmt,
            "iss",
            $es24hs,
            $horaEntrada,
            $horaSalida
        );
    }

    if (!mysqli_stmt_execute($stmt)) {
        throw new Exception(mysqli_error($conexion));
    }

    echo json_encode([
        'success' => true,
        'message' => 'Configuración guardada correctamente'
    ]);

} catch (Exception $e) {
    error_log($e->getMessage());

    echo json_encode([
        'success' => false,
        'message' => 'Error al guardar la configuración'
    ]);
}
