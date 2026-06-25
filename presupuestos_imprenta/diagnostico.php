<?php
// diagnostico.php - borrar despues de usar
$host = "localhost";
$username = "root";
$password = "";
$database = "imprenta_presupuestos_v2";

echo "<h2>Diagnóstico de Base de Datos</h2>";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$database;charset=utf8mb4", $username, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    ]);
    echo "<p style='color:green'>✅ Conexión a BD OK - <b>$database</b></p>";

    $tablas = ['maquinas', 'insumos', 'troqueles', 'parametros'];
    foreach ($tablas as $tabla) {
        try {
            $count = $pdo->query("SELECT COUNT(*) FROM $tabla")->fetchColumn();
            echo "<p>📋 Tabla <b>$tabla</b>: <b>$count</b> registros</p>";
        } catch (Exception $e) {
            echo "<p style='color:orange'>⚠️ Tabla <b>$tabla</b>: no existe o error</p>";
        }
    }

    // Mostrar datos de maquinas
    echo "<h3>Máquinas:</h3><ul>";
    foreach ($pdo->query("SELECT id, nombre FROM maquinas") as $row) {
        echo "<li>#{$row['id']} - {$row['nombre']}</li>";
    }
    echo "</ul>";

    // Mostrar datos de troqueles
    echo "<h3>Troqueles:</h3><ul>";
    foreach ($pdo->query("SELECT id, nombre, ancho, largo, bocas FROM troqueles") as $row) {
        echo "<li>#{$row['id']} - {$row['nombre']} ({$row['ancho']}x{$row['largo']}cm - {$row['bocas']} bocas)</li>";
    }
    echo "</ul>";

    // Mostrar insumos
    echo "<h3>Insumos:</h3><ul>";
    foreach ($pdo->query("SELECT id, tipo, nombre FROM insumos ORDER BY tipo") as $row) {
        echo "<li>#{$row['id']} [{$row['tipo']}] - {$row['nombre']}</li>";
    }
    echo "</ul>";

} catch (PDOException $e) {
    echo "<p style='color:red'>❌ Error de conexión: " . $e->getMessage() . "</p>";
    
    // Intentar listar bases de datos disponibles
    try {
        $pdo2 = new PDO("mysql:host=$host;charset=utf8mb4", $username, $password);
        echo "<h3>Bases de datos disponibles:</h3><ul>";
        foreach ($pdo2->query("SHOW DATABASES") as $db) {
            echo "<li>{$db[0]}</li>";
        }
        echo "</ul>";
    } catch (Exception $ex) {
        echo "<p style='color:red'>❌ No se pudo conectar a MySQL: " . $ex->getMessage() . "</p>";
    }
}

// Estado de sesión
echo "<hr><h3>Estado de Sesión PHP:</h3>";
session_start();
if (isset($_SESSION['logged_in']) && $_SESSION['logged_in'] === true) {
    echo "<p style='color:green'>✅ Sesión activa</p>";
} else {
    echo "<p style='color:red'>❌ No hay sesión activa - Las APIs van a devolver 401</p>";
}
?>
