<?php
session_start();

if (!isset($_SESSION["user"]["id"])) {
    echo json_encode(["success" => false, "message" => "No autenticado"]);
    exit;
}

require_once __DIR__ . "/../conexion.php";
$conexion = conectar_bd();

$data = json_decode(file_get_contents("php://input"), true);

$idOrden = (int)($data["id_orden"] ?? 0);
$especificaciones = $data["especificaciones_tecnicas"] ?? null;
$sectorResponsable = $data["sector_responsable"] ?? null;

if (!$idOrden || !$sectorResponsable) {
    echo json_encode(["success" => false, "message" => "Datos incompletos"]);
    exit;
}

$idUsuario = (int)$_SESSION["user"]["id"];

$conexion->begin_transaction();

try {

$sql = "
    INSERT INTO detalle_produccion
    (id_orden, especificaciones_tecnicas, sector_responsable)
    VALUES (?, ?, ?)
";


    $stmt = $conexion->prepare($sql);
    $stmt->bind_param(
        "iss",
        $idOrden,
        $especificaciones,
        $sectorResponsable
    );
    $stmt->execute();


    $sqlUpdateOT = "
        UPDATE ordenes_trabajo
        SET sector_destino = ?, etapa = 'EN_PRODUCCION'
        WHERE id = ?
    ";

    $stmtU = $conexion->prepare($sqlUpdateOT);
    $stmtU->bind_param("si", $sectorResponsable, $idOrden);
    $stmtU->execute();


    $sqlHistorial = "
        INSERT INTO historial_movimientos
        (id_orden, id_usuario, fecha_hora, accion_realizada, sector)
        VALUES (?, ?, NOW(), 'Envío a Producción', ?)
    ";

    $stmtH = $conexion->prepare($sqlHistorial);
    $stmtH->bind_param(
        "iis",
        $idOrden,
        $idUsuario,
        $sectorResponsable
    );
    $stmtH->execute();

    $conexion->commit();

    echo json_encode(["success" => true]);

} catch (Exception $e) {
    $conexion->rollback();
    echo json_encode([
        "success" => false,
        "message" => "Error al enviar a producción"
    ]);
}
