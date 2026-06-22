<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Retrieve budget history
        $stmt = $pdo->query("SELECT * FROM presupuestos ORDER BY creado_en DESC");
        sendJsonResponse(true, $stmt->fetchAll());
        break;

    case 'POST':
        // Save new budget
        $data = json_decode(file_get_contents("php://input"), true);
        if (!$data)
            sendJsonResponse(false, null, "Datos inválidos");

        $sql = "INSERT INTO presupuestos (descripcion, cliente, cantidad, archivo_final_str, maquina_str, costo_base, ganancia, comision, iva, precio_final, datos_json) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $pdo->prepare($sql);
        try {
            $stmt->execute([
                $data['descripcion'] ?? 'Presupuesto sin nombre',
                $data['cliente'] ?? '',
                intval($data['cantidad'] ?? 0),
                $data['archivo_final_str'] ?? '',
                $data['maquina_str'] ?? '',
                floatval($data['costo_base'] ?? 0),
                floatval($data['ganancia'] ?? 0),
                floatval($data['comision'] ?? 0),
                floatval($data['iva'] ?? 0),
                floatval($data['precio_final'] ?? 0),
                json_encode($data['datos_json'] ?? [])
            ]);
            sendJsonResponse(true, ['id' => $pdo->lastInsertId()], "Presupuesto guardado exitosamente");
        } catch (PDOException $e) {
            sendJsonResponse(false, null, "Error al guardar: " . $e->getMessage());
        }
        break;

    case 'DELETE':
        $id = $_GET['id'] ?? null;
        if (!$id)
            sendJsonResponse(false, null, "ID no proporcionado");

        $stmt = $pdo->prepare("DELETE FROM presupuestos WHERE id = ?");
        $stmt->execute([$id]);
        sendJsonResponse(true, null, "Presupuesto eliminado");
        break;

    default:
        sendJsonResponse(false, null, "Método no soportado");
        break;
}
?>