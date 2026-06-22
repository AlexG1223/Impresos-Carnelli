<?php
// api/config.php
session_start();

// Proteger toda la API excepto endpoints públicos
$current_script = basename($_SERVER['PHP_SELF']);
$public_scripts = ['login.php', 'logout.php', 'check_auth.php', 'fix.php'];

if (!in_array($current_script, $public_scripts)) {
    if ((!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true) && !isset($_SESSION['user'])) {
        header('Content-Type: application/json');
        http_response_code(401);
        echo json_encode(["success" => false, "message" => "No autorizado. Inicie sesión."]);
        exit;
    }
}

// Configuración de la base de datos MySQL (Detección automática de entorno)
$is_local = ($_SERVER['HTTP_HOST'] === 'localhost' || $_SERVER['HTTP_HOST'] === '127.0.0.1' || strpos($_SERVER['HTTP_HOST'], 'localhost') !== false);

if ($is_local) {
    // Desarrollo Local (XAMPP)
    $host = "localhost";
    $username = "root";
    $password = "";
    $database = "imprenta_presupuestos_v2";
} else {
    // Producción (Hostinger)
    $host = "localhost";
    $username = "u240116336_presupuestos";
    $password = "kDALtZ9M";
    $database = "u240116336_presupuestos";
}

// Intentar establecer la conexión
try {
    $dsn = "mysql:host=$host;dbname=$database;charset=utf8mb4";
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ];

    $pdo = new PDO($dsn, $username, $password, $options);
} catch (PDOException $e) {
    // Si la base de datos no existe (Error 1049), la creamos automáticamente
    if (strpos($e->getMessage(), '1049') !== false) {
        try {
            $pdo_init = new PDO("mysql:host=$host;charset=utf8mb4", $username, $password, $options);
            $pdo_init->exec("CREATE DATABASE IF NOT EXISTS `$database` CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;");
            $pdo_init->exec("USE `$database`;");
            $sql = file_get_contents(__DIR__ . '/../database.sql');
            $pdo_init->exec($sql);
            
            // Reconectar ya con la base de datos creada
            $pdo = new PDO($dsn, $username, $password, $options);
        } catch (PDOException $ex) {
            header('Content-Type: application/json');
            echo json_encode(["success" => false, "message" => "Error auto-instalando DB: " . $ex->getMessage()]);
            exit;
        }
    } else {
        header('Content-Type: application/json');
        echo json_encode(["success" => false, "message" => "Error de conexión a la base de datos: " . $e->getMessage()]);
        exit;
    }
}

// Funciones utilitarias para devolver respuestas JSON
function sendJsonResponse($success, $data = null, $message = null)
{
    header('Content-Type: application/json');
    $response = ['success' => $success];
    if ($data !== null)
        $response['data'] = $data;
    if ($message !== null)
        $response['message'] = $message;
    echo json_encode($response);
    exit;
}

// Configuración de cabeceras para permitir CORS (si fuese necesario en el futuro)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
?>