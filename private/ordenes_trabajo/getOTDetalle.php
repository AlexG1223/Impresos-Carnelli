<?php

require_once __DIR__ . "/../conexion.php";
$conexion = conectar_bd();


$idOT = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($idOT <= 0) {
    echo json_encode([
        "success" => false,
        "error" => "ID de orden inválido"
    ]);
    exit;
}

$sqlOT = "
SELECT
    ot.id,
    ot.detalle_trabajo,
    ot.presupuesto,
    ot.fecha_ingreso,
    ot.fecha_prometida,

    c.nombre AS cliente_nombre,
    u.nombre AS vendedor_nombre

FROM ordenes_trabajo ot
INNER JOIN clientes c ON ot.id_cliente = c.id
INNER JOIN usuarios u ON ot.id_vendedor = u.id

WHERE ot.id = ?
LIMIT 1
";

$stmtOT = $conexion->prepare($sqlOT);
$stmtOT->bind_param("i", $idOT);
$stmtOT->execute();
$resOT = $stmtOT->get_result();

if ($resOT->num_rows === 0) {
    echo json_encode([
        "success" => false,
        "error" => "Orden de trabajo no encontrada"
    ]);
    exit;
}

$ot = $resOT->fetch_assoc();


$sqlArchivos = "
SELECT
    id,
    ruta_archivo,
    tipo,
    fecha_subida
FROM archivos
WHERE id_orden = ?
ORDER BY fecha_subida ASC
";

$stmtArchivos = $conexion->prepare($sqlArchivos);
$stmtArchivos->bind_param("i", $idOT);
$stmtArchivos->execute();
$resArchivos = $stmtArchivos->get_result();

$archivos = [];

while ($row = $resArchivos->fetch_assoc()) {
    $archivos[] = [
        "id"     => $row["id"],
        "nombre" => basename($row["ruta_archivo"]),
        "url" => "http://impresoscarnelli.com/public/api/archivos/descargar.php?id=" . $row["id"],
        "tipo"   => $row["tipo"],
        "fecha"  => $row["fecha_subida"]
    ];
}

$ot["archivos"] = $archivos;


echo json_encode([
    "success" => true,
    "data" => $ot
]);
