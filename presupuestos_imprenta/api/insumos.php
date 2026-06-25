<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $stmt = $pdo->query("SELECT * FROM insumos ORDER BY tipo ASC, nombre ASC");
        sendJsonResponse(true, $stmt->fetchAll());
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        if (!$data)
            sendJsonResponse(false, null, "Datos inválidos");

        $gramaje = isset($data['gramaje']) && $data['gramaje'] !== '' ? $data['gramaje'] : null;
        $formato_ancho = isset($data['formato_ancho']) && $data['formato_ancho'] !== '' ? $data['formato_ancho'] : null;
        $formato_largo = isset($data['formato_largo']) && $data['formato_largo'] !== '' ? $data['formato_largo'] : null;
        $unidades = isset($data['unidades_por_paquete']) && $data['unidades_por_paquete'] !== '' ? $data['unidades_por_paquete'] : 1;
        $stock_actual = isset($data['stock_actual']) && $data['stock_actual'] !== '' ? floatval($data['stock_actual']) : 0.0;
        $stock_minimo = isset($data['stock_minimo']) && $data['stock_minimo'] !== '' ? floatval($data['stock_minimo']) : 0.0;
        $color = isset($data['color']) && $data['color'] !== '' ? $data['color'] : null;
        $talle = isset($data['talle']) && $data['talle'] !== '' ? $data['talle'] : null;
        $material = isset($data['material']) && $data['material'] !== '' ? $data['material'] : null;
        $kg_1000 = isset($data['kg_1000']) && $data['kg_1000'] !== '' ? $data['kg_1000'] : null;

        if (isset($data['id']) && $data['id']) {
            $sql = "UPDATE insumos SET tipo=?, nombre=?, gramaje=?, formato_ancho=?, formato_largo=?, costo_unidad=?, unidades_por_paquete=?, stock_actual=?, stock_minimo=?, color=?, talle=?, material=?, kg_1000=? WHERE id=?";
            try {
                $stmt = $pdo->prepare($sql);
                $stmt->execute([
                    $data['tipo'],
                    $data['nombre'],
                    $gramaje,
                    $formato_ancho,
                    $formato_largo,
                    $data['costo_unidad'],
                    $unidades,
                    $stock_actual,
                    $stock_minimo,
                    $color,
                    $talle,
                    $material,
                    $kg_1000,
                    $data['id']
                ]);
                sendJsonResponse(true, ['id' => $data['id']], "Insumo actualizado exitosamente");
            } catch (PDOException $e) {
                sendJsonResponse(false, null, "Error al actualizar: " . $e->getMessage());
            }
        } else {
            $sql = "INSERT INTO insumos (tipo, nombre, gramaje, formato_ancho, formato_largo, costo_unidad, unidades_por_paquete, stock_actual, stock_minimo, color, talle, material, kg_1000) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            try {
                $stmt = $pdo->prepare($sql);
                $stmt->execute([
                    $data['tipo'],
                    $data['nombre'],
                    $gramaje,
                    $formato_ancho,
                    $formato_largo,
                    $data['costo_unidad'],
                    $unidades,
                    $stock_actual,
                    $stock_minimo,
                    $color,
                    $talle,
                    $material,
                    $kg_1000
                ]);
                sendJsonResponse(true, ['id' => $pdo->lastInsertId()], "Insumo agregado exitosamente");
            } catch (PDOException $e) {
                sendJsonResponse(false, null, "Error al guardar: " . $e->getMessage());
            }
        }
        break;

    case 'DELETE':
        $id = $_GET['id'] ?? null;
        if (!$id)
            sendJsonResponse(false, null, "ID no proporcionado");

        $stmt = $pdo->prepare("DELETE FROM insumos WHERE id = ?");
        $stmt->execute([$id]);
        sendJsonResponse(true, null, "Insumo eliminado exitosamente");
        break;

    default:
        sendJsonResponse(false, null, "Método no soportado");
        break;
}
?>