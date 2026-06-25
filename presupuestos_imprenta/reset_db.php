<?php
$host = 'localhost';
$user = 'root';
$pass = '';

try {
    $pdo = new PDO("mysql:host=$host", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Drop and recreate DB
    $pdo->exec("DROP DATABASE IF EXISTS imprenta_presupuestos_v2");
    $pdo->exec("CREATE DATABASE imprenta_presupuestos_v2");
    $pdo->exec("USE imprenta_presupuestos_v2");

    // Load database.sql
    $sql = file_get_contents('database.sql');
    $pdo->exec($sql);

    echo "Database reset successfully.\n";
} catch (PDOException $e) {
    echo "Error resetting database: " . $e->getMessage() . "\n";
}
?>