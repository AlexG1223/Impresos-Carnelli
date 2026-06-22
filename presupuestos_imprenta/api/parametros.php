<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $stmt = $pdo->query("SELECT * FROM parametros_globales WHERE id = 1");
        $data = $stmt->fetch();
        if ($data) {
            sendJsonResponse(true, $data);
        } else {
            sendJsonResponse(false, null, "No se encontraron parámetros.");
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        if (!$data)
            sendJsonResponse(false, null, "Datos inválidos");

        $sql = "UPDATE parametros_globales SET ganancia=?, comision=?, iva=? WHERE id=1";
        $stmt = $pdo->prepare($sql);
        try {
            $stmt->execute([
                $data['ganancia'] ?? 30.00,
                $data['comision'] ?? 0.00,
                $data['iva'] ?? 22.00
            ]);
            sendJsonResponse(true, null, "Parámetros actualizados exitosamente");
        } catch (PDOException $e) {
            sendJsonResponse(false, null, "Error al actualizar: " . $e->getMessage());
        }
        break;

    default:
        sendJsonResponse(false, null, "Método no soportado");
        break;
}
?>
