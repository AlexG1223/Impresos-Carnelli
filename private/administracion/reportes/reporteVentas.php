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

    // Obtener las órdenes de trabajo
    $sql = "
        SELECT 
            ot.id,
            ot.fecha_ingreso,
            ot.presupuesto,
            de.fecha_lista_entrega,
            ot.id_vendedor
        FROM ordenes_trabajo ot
        INNER JOIN detalle_expedicion de 
            ON de.id_orden = ot.id
        WHERE ot.fecha_ingreso BETWEEN ? AND ?
          AND de.fecha_lista_entrega IS NOT NULL
          AND ot.total_pago = 1
        ORDER BY ot.fecha_ingreso ASC
    ";

    $stmt = $conexion->prepare($sql);
    $stmt->bind_param("ss", $fechaInicio, $fechaFin);
    $stmt->execute();

    $result = $stmt->get_result();

    $ordenes = [];
    $totalVentas = 0;
    $ventasPorVendedor = [];

    while ($row = $result->fetch_assoc()) {
        $presupuesto = (float)$row["presupuesto"];
        $totalVentas += $presupuesto;

        // Acumular ventas por vendedor
        $idVendedor = $row["id_vendedor"];
        if (!isset($ventasPorVendedor[$idVendedor])) {
            $ventasPorVendedor[$idVendedor] = 0;
        }
        $ventasPorVendedor[$idVendedor] += $presupuesto;

        $ordenes[] = [
            "id" => (int)$row["id"],
            "fechaIngreso" => $row["fecha_ingreso"],
            "fechaFinalizacion" => $row["fecha_lista_entrega"],
            "presupuesto" => $presupuesto
        ];
    }

    // Obtener el nombre de los vendedores
    $vendedores = [];
    foreach ($ventasPorVendedor as $idVendedor => $totalVendedor) {
        $sqlVendedor = "SELECT nombre FROM usuarios WHERE id = ?";
        $stmtVendedor = $conexion->prepare($sqlVendedor);
        $stmtVendedor->bind_param("i", $idVendedor);
        $stmtVendedor->execute();
        $resultVendedor = $stmtVendedor->get_result();
        $vendedor = $resultVendedor->fetch_assoc();
        
        if ($vendedor) {
            $vendedores[] = [
                "nombre" => $vendedor['nombre'],
                "totalVentas" => $totalVendedor
            ];
        }
    }

    echo json_encode([
        "success" => true,
        "data" => [
            "totalVentas" => $totalVentas,
            "ordenes" => $ordenes,
            "ventasPorVendedor" => $vendedores
        ]
    ]);
    exit;

} catch (Throwable $e) {
    echo json_encode([
        "success" => false,
        "message" => "Error al generar reporte de ventas"
    ]);
    exit;
}
