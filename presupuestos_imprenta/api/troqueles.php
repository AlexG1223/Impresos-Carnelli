<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    try {
        $stmt = $pdo->query("SELECT * FROM troqueles ORDER BY nombre ASC");
        $troqueles = $stmt->fetchAll();
        sendJsonResponse(true, $troqueles);
    } catch (Exception $e) {
        sendJsonResponse(false, null, "Error listando troqueles: " . $e->getMessage());
    }
} elseif ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    
    $id     = isset($data['id']) && $data['id'] ? intval($data['id']) : null;
    $nombre = trim($data['nombre'] ?? '');
    $ancho  = floatval($data['ancho'] ?? 0);
    $largo  = floatval($data['largo'] ?? 0);
    $bocas  = intval($data['bocas'] ?? 0);

    if (empty($nombre) || $ancho <= 0 || $largo <= 0 || $bocas <= 0) {
        sendJsonResponse(false, null, "Por favor complete todos los campos numéricos mayores a cero.");
    }

    try {
        if ($id) {
            $stmt = $pdo->prepare("UPDATE troqueles SET nombre=?, ancho=?, largo=?, bocas=? WHERE id=?");
            $stmt->execute([$nombre, $ancho, $largo, $bocas, $id]);
            sendJsonResponse(true, ['id' => $id], "Troquel actualizado exitosamente");
        } else {
            $stmt = $pdo->prepare("INSERT INTO troqueles (nombre, ancho, largo, bocas) VALUES (?, ?, ?, ?)");
            $stmt->execute([$nombre, $ancho, $largo, $bocas]);
            sendJsonResponse(true, ['id' => $pdo->lastInsertId()], "Troquel guardado exitosamente");
        }
    } catch (Exception $e) {
        sendJsonResponse(false, null, "Error guardando troquel: " . $e->getMessage());
    }
} elseif ($method === 'DELETE') {
    $data = json_decode(file_get_contents("php://input"), true);
    $id = intval($data['id'] ?? 0);

    if ($id <= 0) {
        sendJsonResponse(false, null, "ID inválido");
    }

    try {
        $stmt = $pdo->prepare("DELETE FROM troqueles WHERE id = ?");
        $stmt->execute([$id]);
        sendJsonResponse(true, null, "Troquel eliminado");
    } catch (Exception $e) {
        sendJsonResponse(false, null, "Error eliminando troquel: " . $e->getMessage());
    }
} else {
    sendJsonResponse(false, null, "Método no soportado");
}
?>
