<?php
require_once __DIR__ . "/../../conexion.php";
$conexion = conectar_bd();

$data = json_decode(file_get_contents("php://input"), true);
$fechaInicio = $data['fechaInicio'] ?? null;
$fechaFin = $data['fechaFin'] ?? null;

try {
    $sql = "
        SELECT 
            dd.id,
            dd.id_orden,
            dd.fecha_inicio_trabajo,
            dd.fecha_fin_trabajo,
            dd.pago_realizado,
            u.nombre AS nombre_diseniador,
            c.nombre AS nombre_cliente
        FROM detalle_diseño dd
        INNER JOIN usuarios u ON dd.id_diseñador = u.id
        INNER JOIN ordenes_trabajo ot ON dd.id_orden = ot.id
        INNER JOIN clientes c ON ot.id_cliente = c.id
        WHERE dd.fecha_inicio_trabajo BETWEEN ? AND ?
        ORDER BY dd.fecha_inicio_trabajo ASC
    ";

    $stmt = $conexion->prepare($sql);
    $stmt->bind_param("ss", $fechaInicio, $fechaFin);
    $stmt->execute();
    $result = $stmt->get_result();

    $sesiones = [];
    $resumenDiseniadores = [];

    while ($row = $result->fetch_assoc()) {
        $inicio = new DateTime($row['fecha_inicio_trabajo']);
        $fin = $row['fecha_fin_trabajo'] ? new DateTime($row['fecha_fin_trabajo']) : null;
        
        $minutos = 0;
        if ($fin) {
            $intervalo = $inicio->diff($fin);
            $minutos = ($intervalo->days * 24 * 60) + ($intervalo->h * 60) + $intervalo->i;
        }

        $nombreD = $row['nombre_diseniador'];
        if (!isset($resumenDiseniadores[$nombreD])) {
            $resumenDiseniadores[$nombreD] = ["totalMinutos" => 0, "totalTrabajos" => 0];
        }
        
        $resumenDiseniadores[$nombreD]["totalMinutos"] += $minutos;
        $resumenDiseniadores[$nombreD]["totalTrabajos"] += 1;

        $sesiones[] = [
            "id" => $row['id'],
            "id_orden" => $row['id_orden'],
            "cliente" => $row['nombre_cliente'],
            "diseniador" => $nombreD,
            "inicio" => $row['fecha_inicio_trabajo'],
            "fin" => $row['fecha_fin_trabajo'] ?? "En proceso",
            "minutos" => $minutos,
            "pago_realizado" => (int)$row['pago_realizado']
        ];
    }

    echo json_encode([
        "success" => true,
        "data" => [
            "sesiones" => $sesiones,
            "resumen" => $resumenDiseniadores
        ]
    ]);

} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}