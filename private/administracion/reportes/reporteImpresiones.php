<?php

header('Content-Type: application/json; charset=utf-8');

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
            ot.cantidad_impresiones,
            de.fecha_lista_entrega
        FROM ordenes_trabajo ot
        INNER JOIN detalle_expedicion de 
            ON de.id_orden = ot.id
        WHERE ot.fecha_ingreso BETWEEN ? AND ?
          AND de.fecha_lista_entrega IS NOT NULL
        ORDER BY ot.fecha_ingreso ASC
    ";

    $stmt = $conexion->prepare($sql);
    $stmt->bind_param("ss", $fechaInicio, $fechaFin);
    $stmt->execute();

    $result = $stmt->get_result();

    $ordenes = [];
    $totalImpresiones = 0;

    while ($row = $result->fetch_assoc()) {
        $cantidadImpresiones = (int)$row["cantidad_impresiones"];
        $totalImpresiones += $cantidadImpresiones;

        $ordenes[] = [
            "id" => (int)$row["id"],
            "fechaIngreso" => $row["fecha_ingreso"],
            "fechaFinalizacion" => $row["fecha_lista_entrega"],
            // ✅ cantidad de impresiones POR OT
            "cantidadImpresiones" => $cantidadImpresiones
        ];
    }

    echo json_encode([
        "success" => true,
        "data" => [
            // ✅ total general
            "totalImpresiones" => $totalImpresiones,
            // ✅ detalle por OT
            "ordenes" => $ordenes
        ]
    ]);
    exit;

} catch (Throwable $e) {
    echo json_encode([
        "success" => false,
        "message" => "Error al generar reporte de impresiones"
    ]);
    exit;
}
