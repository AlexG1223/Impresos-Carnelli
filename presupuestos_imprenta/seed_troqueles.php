<?php
require_once 'api/config.php';

try {
    $pdo->exec("INSERT INTO troqueles (nombre, ancho, largo, bocas) VALUES 
        ('Troquel Circular 5cm', 5.0, 5.0, 24),
        ('Carpeta Presentación', 45.0, 32.0, 1),
        ('Caja Fósforo', 12.0, 15.0, 4)
    ");
    echo "Troqueles de ejemplo insertados.";
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
