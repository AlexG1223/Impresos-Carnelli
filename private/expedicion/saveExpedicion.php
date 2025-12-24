<?php
session_start();

if (!isset($_SESSION["user"]["id"])) {
  echo json_encode([
    "success" => false,
    "message" => "No autenticado"
  ]);
  exit;
}

require_once __DIR__ . "/../conexion.php";
$conexion = conectar_bd();

$data = json_decode(file_get_contents("php://input"), true);

$idOrden = (int)($data["id_orden"] ?? 0);
$metodoEnvio = $data["metodo_envio"] ?? null;
$direccionFinal = $data["direccion_entrega_final"] ?? null;
$estadoEmbalaje = $data["estado_embalaje"] ?? null;
$estadoExpedicion = $data["estado_expedicion"] ?? null;

$idUsuario = $_SESSION["user"]["id"];

if ($idOrden <= 0 || !$metodoEnvio || !$estadoEmbalaje) {
  echo json_encode([
    "success" => false,
    "message" => "Datos incompletos"
  ]);
  exit;
}

$conexion->begin_transaction();

try {

  /* ===============================
     CHECK EXISTENCIA
     =============================== */
  $checkSql = "SELECT id FROM detalle_expedicion WHERE id_orden = ? LIMIT 1";
  $checkStmt = $conexion->prepare($checkSql);
  $checkStmt->bind_param("i", $idOrden);
  $checkStmt->execute();
  $checkResult = $checkStmt->get_result();

  $existe = $checkResult->num_rows > 0;

  /* ===============================
     UPDATE
     =============================== */
  if ($existe) {

    $sql = "
      UPDATE detalle_expedicion SET
        metodo_envio = ?,
        direccion_entrega_final = ?,
        estado_embalaje = ?,
        fecha_lista_entrega = CURDATE()
      WHERE id_orden = ?
    ";

    $stmt = $conexion->prepare($sql);
    $stmt->bind_param(
      "sssi",
      $metodoEnvio,
      $direccionFinal,
      $estadoEmbalaje,
      $idOrden
    );

    $accion = "Actualización de datos de Expedición";

  }
  /* ===============================
     INSERT
     =============================== */
  else {

    $sql = "
      INSERT INTO detalle_expedicion (
        id_orden,
        metodo_envio,
        direccion_entrega_final,
        estado_embalaje,
        fecha_lista_entrega
      ) VALUES (?, ?, ?, ?, CURDATE())
    ";

    $stmt = $conexion->prepare($sql);
    $stmt->bind_param(
      "isss",
      $idOrden,
      $metodoEnvio,
      $direccionFinal,
      $estadoEmbalaje
    );

    $accion = "Carga inicial de datos de Expedición";
  }

  if (!$stmt->execute()) {
    throw new Exception("Error al guardar detalle de expedición");
  }

  /* ===============================
     HISTORIAL DE MOVIMIENTOS
     =============================== */
  $accionCompleta = $accion;

  if ($estadoExpedicion) {
    $accionCompleta .= " - Estado: " . $estadoExpedicion;
  }

  $histSql = "
    INSERT INTO historial_movimientos (
      id_orden,
      id_usuario,
      fecha_hora,
      accion_realizada,
      sector
    ) VALUES (?, ?, NOW(), ?, 'EXPEDICION')
  ";

  $histStmt = $conexion->prepare($histSql);
  $histStmt->bind_param(
    "iis",
    $idOrden,
    $idUsuario,
    $accionCompleta
  );

  if (!$histStmt->execute()) {
    throw new Exception("Error al registrar historial");
  }

  $conexion->commit();

  echo json_encode([
    "success" => true,
    "message" => $accion
  ]);

} catch (Exception $e) {

  $conexion->rollback();

  echo json_encode([
    "success" => false,
    "message" => "No se pudo guardar la expedición",
    "error" => $e->getMessage()
  ]);
}
