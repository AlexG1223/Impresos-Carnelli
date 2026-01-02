<?php

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["success" => false, "message" => "Datos inválidos"]);
    exit;
}

if (!isset($data["id"], $data["sectores"]) || !is_array($data["sectores"])) {
    echo json_encode(["success" => false, "message" => "Campos incompletos"]);
    exit;
}

$id = intval($data["id"]);
$sectores = $data["sectores"];

$ventas      = in_array("Ventas",      $sectores) ? 1 : 0;
$diseno      = in_array("Diseño",      $sectores) ? 1 : 0;
$offset      = in_array("Offset",      $sectores) ? 1 : 0;
$serigrafia  = in_array("Serigrafía",  $sectores) ? 1 : 0;
$expedicion  = in_array("Expedición",  $sectores) ? 1 : 0;

require_once __DIR__ . "/../../conexion.php";
$conexion = conectar_bd();

$sqlCheck = "SELECT id_usr FROM sectores WHERE id_usr = ?";
$stmtCheck = $conexion->prepare($sqlCheck);
$stmtCheck->bind_param("i", $id);
$stmtCheck->execute();
$result = $stmtCheck->get_result();

if ($result->num_rows > 0) {

    $sql = "
        UPDATE sectores SET
            `ventas` = ?,
            `diseño` = ?,
            `offset` = ?,
            `serigrafia` = ?,
            `expedicion` = ?
        WHERE id_usr = ?
    ";

    $stmt = $conexion->prepare($sql);
    $stmt->bind_param("iiiiii", 
        $ventas, $diseno, $offset, $serigrafia, $expedicion, $id
    );

} else {

    $sql = "
        INSERT INTO sectores (id_usr, `ventas`, `diseño`, `offset`, `serigrafia`, `expedicion`)
        VALUES (?, ?, ?, ?, ?, ?)
    ";

    $stmt = $conexion->prepare($sql);
    $stmt->bind_param("iiiiii", 
        $id, $ventas, $diseno, $offset, $serigrafia, $expedicion
    );
}

if (!$stmt) {
    echo json_encode(["success" => false, "error" => $conexion->error]);
    exit;
}

$ok = $stmt->execute();

if (!$ok) {
    echo json_encode(["success" => false, "error" => $stmt->error]);
    exit;
}

echo json_encode(["success" => true]);
?>
