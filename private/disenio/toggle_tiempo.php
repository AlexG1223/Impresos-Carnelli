<?php
require_once __DIR__ . "/../conexion.php";
session_start();

$conexion = conectar_bd();

$data = json_decode(file_get_contents("php://input"), true);
$id_orden = isset($data['id_orden']) ? intval($data['id_orden']) : 0;

$id_diseniador = $_SESSION['id_usuario'] ?? 1; 

if ($id_orden <= 0) {
    echo json_encode(["success" => false, "message" => "ID de orden no válido"]);
    exit;
}

$sqlCheck = "SELECT id FROM detalle_diseño 
             WHERE id_orden = ? AND fecha_fin_trabajo IS NULL 
             ORDER BY id DESC LIMIT 1";

$stmtCheck = $conexion->prepare($sqlCheck);
$stmtCheck->bind_param("i", $id_orden);
$stmtCheck->execute();
$resultado = $stmtCheck->get_result();

if ($row = $resultado->fetch_assoc()) {
    $id_detalle = $row['id'];
    $sqlFinish = "UPDATE detalle_diseño SET fecha_fin_trabajo = NOW() WHERE id = ?";
    $stmtF = $conexion->prepare($sqlFinish);
    $stmtF->bind_param("i", $id_detalle);
    
    if ($stmtF->execute()) {
        echo json_encode(["success" => true, "estado" => "Finalizado"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error al finalizar trabajo"]);
    }
} else {

    $sqlStart = "INSERT INTO detalle_diseño (id_orden, id_diseñador, fecha_inicio_trabajo) 
                 VALUES (?, ?, NOW())";
    $stmtS = $conexion->prepare($sqlStart);
    $stmtS->bind_param("ii", $id_orden, $id_diseniador);
    
    if ($stmtS->execute()) {
        echo json_encode(["success" => true, "estado" => "Trabajo en Proceso"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error al iniciar trabajo"]);
    }
}