<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $stmt = $pdo->query("SELECT * FROM maquinas ORDER BY creado_en DESC");
        sendJsonResponse(true, $stmt->fetchAll());
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        if (!$data)
            sendJsonResponse(false, null, "Datos inválidos");

        if (isset($data['id']) && $data['id']) {
            $sql = "UPDATE maquinas SET nombre=?, formato_max_ancho=?, formato_max_largo=?, formato_min_ancho=?, formato_min_largo=?, medida_pinza=?, costo_hora=?, costo_puesta=?, velocidad_por_hora=?, tipo_calculo=?, costo_tinta=? WHERE id=?";
            $stmt = $pdo->prepare($sql);
            try {
                $stmt->execute([
                    $data['nombre'],
                    $data['formato_max_ancho'],
                    $data['formato_max_largo'],
                    $data['formato_min_ancho'],
                    $data['formato_min_largo'],
                    $data['medida_pinza'],
                    $data['costo_hora'],
                    $data['costo_puesta'] ?? 0,
                    $data['velocidad_por_hora'] ?? 5000,
                    $data['tipo_calculo'] ?? 'millares',
                    $data['costo_tinta'] ?? 0,
                    $data['id']
                ]);
                sendJsonResponse(true, ['id' => $data['id']], "Máquina actualizada exitosamente");
            } catch (PDOException $e) {
                sendJsonResponse(false, null, "Error al actualizar: " . $e->getMessage());
            }
        } else {
            $sql = "INSERT INTO maquinas (nombre, formato_max_ancho, formato_max_largo, formato_min_ancho, formato_min_largo, medida_pinza, costo_hora, costo_puesta, velocidad_por_hora, tipo_calculo, costo_tinta) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            $stmt = $pdo->prepare($sql);
            try {
                $stmt->execute([
                    $data['nombre'],
                    $data['formato_max_ancho'],
                    $data['formato_max_largo'],
                    $data['formato_min_ancho'],
                    $data['formato_min_largo'],
                    $data['medida_pinza'],
                    $data['costo_hora'],
                    $data['costo_puesta'] ?? 0,
                    $data['velocidad_por_hora'] ?? 5000,
                    $data['tipo_calculo'] ?? 'millares',
                    $data['costo_tinta'] ?? 0
                ]);
                sendJsonResponse(true, ['id' => $pdo->lastInsertId()], "Máquina agregada exitosamente");
            } catch (PDOException $e) {
                sendJsonResponse(false, null, "Error al guardar: " . $e->getMessage());
            }
        }
        break;

    case 'DELETE':
        $id = $_GET['id'] ?? null;
        if (!$id)
            sendJsonResponse(false, null, "ID no proporcionado");

        $stmt = $pdo->prepare("DELETE FROM maquinas WHERE id = ?");
        $stmt->execute([$id]);
        sendJsonResponse(true, null, "Máquina eliminada exitosamente");
        break;

    default:
        sendJsonResponse(false, null, "Método no soportado");
        break;
}
?>