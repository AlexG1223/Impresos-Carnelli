<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $stmt = $pdo->query("SELECT * FROM formatos_impresion ORDER BY nombre ASC");
        sendJsonResponse(true, $stmt->fetchAll());
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        if (!$data) sendJsonResponse(false, null, "Datos inválidos");

        $sql = "INSERT INTO formatos_impresion (nombre, ancho, largo) VALUES (?, ?, ?)";
        $stmt = $pdo->prepare($sql);
        try {
            $stmt->execute([
                $data['nombre'], 
                $data['ancho'], 
                $data['largo']
            ]);
            sendJsonResponse(true, ['id' => $pdo->lastInsertId()], "Formato agregado exitosamente");
        } catch (PDOException $e) {
            sendJsonResponse(false, null, "Error al guardar: " . $e->getMessage());
        }
        break;

    case 'DELETE':
        $id = $_GET['id'] ?? null;
        if (!$id) sendJsonResponse(false, null, "ID no proporcionado");
        
        $stmt = $pdo->prepare("DELETE FROM formatos_impresion WHERE id = ?");
        $stmt->execute([$id]);
        sendJsonResponse(true, null, "Formato eliminado exitosamente");
        break;

    default:
        sendJsonResponse(false, null, "Método no soportado");
        break;
}
?>
