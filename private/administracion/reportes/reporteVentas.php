<?php
require_once __DIR__ . "/../../conexion.php";
$conexion = conectar_bd();

$data = json_decode(file_get_contents("php://input"), true);
$fechaInicio = $data['fechaInicio'] ?? null;
$fechaFin = $data['fechaFin'] ?? null;

if (!$fechaInicio || !$fechaFin) {
    echo json_encode([
        "success" => false,
        "message" => "Fechas inválidas"
    ]);
    exit;
}

try {

    $sql = "
        SELECT 
            ot.id,
            ot.fecha_ingreso,
            ot.presupuesto,
            ot.comision_paga,
            de.fecha_lista_entrega,
            u.nombre AS nombre_vendedor
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
    $totalComision = 0;

    // Estructura temporal por vendedor
    // [ nombre => [ventas => float, comision => float] ]
    $tempVendedores = [];

    while ($row = $result->fetch_assoc()) {

        $presupuesto = (float)$row["presupuesto"];
        $comisionPaga = (int)$row["comision_paga"];
        $nombreVendedor = $row["nombre_vendedor"];

        $totalVentas += $presupuesto;

        if (!isset($tempVendedores[$nombreVendedor])) {
            $tempVendedores[$nombreVendedor] = [
                "ventas" => 0,
                "comision" => 0
            ];
        }

        $tempVendedores[$nombreVendedor]["ventas"] += $presupuesto;

        if ($comisionPaga === 1) {
            $tempVendedores[$nombreVendedor]["comision"] += $presupuesto;
            $totalComision += $presupuesto;
        }

        $ordenes[] = [
            "id" => (int)$row["id"],
            "fechaIngreso" => $row["fecha_ingreso"],
            "fechaFinalizacion" => $row["fecha_lista_entrega"] ?? "Pendiente",
            "presupuesto" => $presupuesto,
            "comision_paga" => $comisionPaga,
            "vendedor" => $nombreVendedor
        ];
    }

    // Formatear vendedores
    $ventasPorVendedor = [];
    foreach ($tempVendedores as $nombre => $datos) {
        $ventasPorVendedor[] = [
            "nombre" => $nombre,
            "totalVentas" => $datos["ventas"],
            "totalComision" => $datos["comision"]
        ];
    }

    echo json_encode([
        "success" => true,
        "data" => [
            "totalVentas" => $totalVentas,
            "totalComision" => $totalComision,
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
