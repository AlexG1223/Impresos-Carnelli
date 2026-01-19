<?php
require_once __DIR__ . "/../../conexion.php";
$conexion = conectar_bd();

$data = json_decode(file_get_contents("php://input"), true);
$fechaInicio = $data['fechaInicio'] ?? null;
$fechaFin = $data['fechaFin'] ?? null;

if (!$fechaInicio || !$fechaFin) {
    echo json_encode(["success" => false, "message" => "Fechas inválidas"]);
    exit;
}

try {
    // 1. Consulta optimizada con JOIN para traer nombres de vendedores de una vez
    $sql = "
        SELECT 
            ot.id,
            ot.fecha_ingreso,
            ot.presupuesto,
            de.fecha_lista_entrega,
            u.nombre AS nombre_vendedor,
            ot.id_vendedor
        FROM ordenes_trabajo ot
        LEFT JOIN detalle_expedicion de ON de.id_orden = ot.id
        INNER JOIN usuarios u ON ot.id_vendedor = u.id
        WHERE ot.fecha_ingreso BETWEEN ? AND ?
          AND ot.total_pago = 1
        ORDER BY ot.fecha_ingreso ASC
    ";

    $stmt = $conexion->prepare($sql);
    $stmt->bind_param("ss", $fechaInicio, $fechaFin);
    $stmt->execute();
    $result = $stmt->get_result();

    $ordenes = [];
    $totalVentas = 0;
    $tempVendedores = [];

    while ($row = $result->fetch_assoc()) {
        $presupuesto = (float)$row["presupuesto"];
        $totalVentas += $presupuesto;

        // Agrupar por vendedor en memoria
        $nombreV = $row["nombre_vendedor"];
        if (!isset($tempVendedores[$nombreV])) {
            $tempVendedores[$nombreV] = 0;
        }
        $tempVendedores[$nombreV] += $presupuesto;

        $ordenes[] = [
            "id" => (int)$row["id"],
            "fechaIngreso" => $row["fecha_ingreso"],
            "fechaFinalizacion" => $row["fecha_lista_entrega"] ?? 'Pendiente',
            "presupuesto" => $presupuesto,
            "vendedor" => $nombreV
        ];
    }

    // Formatear vendedores para la respuesta
    $ventasPorVendedor = [];
    foreach ($tempVendedores as $nombre => $total) {
        $ventasPorVendedor[] = [
            "nombre" => $nombre,
            "totalVentas" => $total
        ];
    }

    echo json_encode([
        "success" => true,
        "data" => [
            "totalVentas" => $totalVentas,
            "ordenes" => $ordenes,
            "ventasPorVendedor" => $ventasPorVendedor
        ]
    ]);

} catch (Throwable $e) {
    echo json_encode([
        "success" => false,
        "message" => "Error: " . $e->getMessage()
    ]);
}