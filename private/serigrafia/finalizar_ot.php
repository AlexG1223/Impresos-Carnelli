<?php
session_start();

if (!isset($_SESSION["user"]["id"])) {
    echo json_encode(["success" => false, "message" => "No autenticado"]);
    exit;
}

require_once __DIR__ . "/../conexion.php";
$conexion = conectar_bd();

$data = json_decode(file_get_contents("php://input"), true);
$id_ot = (int)($data["id_ot"] ?? 0);
$id_usuario = (int)$_SESSION["user"]["id"];

if (!$id_ot) {
    echo json_encode(["success" => false, "message" => "OT inválida"]);
    exit;
}

mysqli_begin_transaction($conexion);


$sql1 = "
UPDATE detalle_produccion
SET fecha_fin_trabajo = NOW()
WHERE id_orden = ?
AND fecha_fin_trabajo IS NULL
";

$stmt1 = $conexion->prepare($sql1);
$stmt1->bind_param("i", $id_ot);


$sql2 = "
UPDATE ordenes_trabajo
SET etapa = 'EXPEDICION'
WHERE id = ?
";

$stmt2 = $conexion->prepare($sql2);
$stmt2->bind_param("i", $id_ot);


$sql3 = "
INSERT INTO historial_movimientos
(id_orden, id_usuario, fecha_hora, accion_realizada)
VALUES (?, ?, NOW(), 'Fin de Producción serigrafia')
";

$stmt3 = $conexion->prepare($sql3);
$stmt3->bind_param("ii", $id_ot, $id_usuario);

$ok =
    $stmt1->execute() &&
    $stmt2->execute() &&
    $stmt3->execute() &&
    ($stmt1->affected_rows > 0); 

if ($ok) {
    mysqli_commit($conexion);
    echo json_encode(["success" => true]);
} else {
    mysqli_rollback($conexion);
    echo json_encode([
        "success" => false,
        "message" => "La OT ya fue finalizada o ocurrió un error"
    ]);
}
