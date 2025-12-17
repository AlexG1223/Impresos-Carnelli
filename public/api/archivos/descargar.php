<?php
session_start();

if (!isset($_SESSION["user"])) {
    http_response_code(403);
    exit("Acceso denegado");
}

require_once __DIR__ . "/../../../private/conexion.php";
$conexion = conectar_bd();

$idArchivo = isset($_GET["id"]) ? intval($_GET["id"]) : 0;

if ($idArchivo <= 0) {
    http_response_code(400);
    exit("Archivo inválido");
}


$sql = "
SELECT ruta_archivo
FROM archivos
WHERE id = ?
LIMIT 1
";

$stmt = $conexion->prepare($sql);
$stmt->bind_param("i", $idArchivo);
$stmt->execute();
$res = $stmt->get_result();

if ($res->num_rows === 0) {
    http_response_code(404);
    exit("Archivo no encontrado");
}

$row = $res->fetch_assoc();

/* ============================
   Resolver ruta real
============================ */
$rutaRelativa = $row["ruta_archivo"];

/*
  Ajustá esto según tu estructura real
  Ejemplo:
  /var/www/proyecto/uploads/ordenes/2/archivo.jpg
*/
$rutaBaseUploads = realpath(__DIR__ . "/../../../");
$rutaArchivo = realpath($rutaBaseUploads . "/" . $rutaRelativa);

if (!$rutaArchivo || !str_starts_with($rutaArchivo, $rutaBaseUploads)) {
    http_response_code(403);
    exit("Acceso no permitido");
}

if (!file_exists($rutaArchivo)) {
    http_response_code(404);
    exit("Archivo no existe");
}


$mime = mime_content_type($rutaArchivo);
$nombre = basename($rutaArchivo);

header("Content-Type: $mime");
header("Content-Disposition: attachment; filename=\"$nombre\"");
header("Content-Length: " . filesize($rutaArchivo));
header("Cache-Control: private");
header("X-Content-Type-Options: nosniff");

readfile($rutaArchivo);
exit;

