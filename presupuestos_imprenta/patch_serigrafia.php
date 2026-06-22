<?php
require_once 'api/config.php';

try {
    // Modify ENUM without dropping table
    $pdo->exec("ALTER TABLE insumos MODIFY COLUMN tipo ENUM('papel', 'tinta', 'chapa', 'prenda', 'otro') NOT NULL");
    
    // Insert a sample garment
    $pdo->exec("INSERT IGNORE INTO insumos (tipo, nombre, costo_unidad, unidades_por_paquete) VALUES ('prenda', 'Remera de Algodón Lisa (Ejemplo)', 3000.00, 1)");
    
    echo "<h1>¡Base de datos parcheada con éxito!</h1>";
    echo "<p>El sistema ahora soporta prendas nativamente. <a href='index.html'>Volver al inicio</a></p>";
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
