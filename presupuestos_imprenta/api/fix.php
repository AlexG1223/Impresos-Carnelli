<?php
// api/fix.php
// Este script es público para permitir reparar la base de datos fácilmente en producción.

require_once 'config.php';

echo "<!DOCTYPE html>
<html lang='es'>
<head>
    <meta charset='UTF-8'>
    <title>Reparador de Base de Datos - Impresos Carnelli</title>
    <style>
        body { font-family: sans-serif; background: #0f172a; color: #f8fafc; padding: 2rem; }
        .container { max-width: 600px; margin: 0 auto; background: #1e293b; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.3); }
        h1 { color: #3b82f6; border-bottom: 2px solid #334155; padding-bottom: 0.5rem; }
        .status-ok { color: #10b981; font-weight: bold; }
        .status-err { color: #ef4444; font-weight: bold; }
        .log-item { background: #0f172a; padding: 0.5rem 1rem; border-radius: 4px; font-family: monospace; margin: 0.5rem 0; border-left: 4px solid #3b82f6; }
        .btn { display: inline-block; background: #3b82f6; color: #fff; padding: 0.5rem 1rem; text-decoration: none; border-radius: 4px; margin-top: 1rem; }
        .btn:hover { background: #2563eb; }
    </style>
</head>
<body>
<div class='container'>
    <h1>Reparador de Base de Datos</h1>";

try {
    // 1. Obtener columnas existentes en la tabla 'insumos'
    $stmt = $pdo->query("DESCRIBE insumos");
    $columns = $stmt->fetchAll(PDO::FETCH_COLUMN);

    $missing_columns = [
        'stock_actual' => "ALTER TABLE insumos ADD COLUMN stock_actual DECIMAL(10,2) NOT NULL DEFAULT 0.00 AFTER unidades_por_paquete",
        'stock_minimo' => "ALTER TABLE insumos ADD COLUMN stock_minimo DECIMAL(10,2) NOT NULL DEFAULT 0.00 AFTER stock_actual",
        'color'        => "ALTER TABLE insumos ADD COLUMN color VARCHAR(50) DEFAULT NULL AFTER stock_minimo",
        'talle'        => "ALTER TABLE insumos ADD COLUMN talle VARCHAR(50) DEFAULT NULL AFTER color",
        'material'     => "ALTER TABLE insumos ADD COLUMN material VARCHAR(100) DEFAULT NULL AFTER talle",
        'kg_1000'      => "ALTER TABLE insumos ADD COLUMN kg_1000 DECIMAL(10,2) DEFAULT NULL AFTER material"
    ];

    $applied = 0;
    foreach ($missing_columns as $col => $sql) {
        if (!in_array($col, $columns)) {
            $pdo->exec($sql);
            echo "<div class='log-item'>✅ Columna <strong>$col</strong> agregada exitosamente.</div>";
            $applied++;
        } else {
            echo "<div class='log-item'>ℹ️ Columna <strong>$col</strong> ya existe en la tabla.</div>";
        }
    }

    if ($applied > 0) {
        echo "<p class='status-ok'>🎉 ¡Se aplicaron $applied cambios a la base de datos con éxito!</p>";
    } else {
        echo "<p class='status-ok'>✅ La base de datos ya está actualizada y cuenta con todas las columnas necesarias.</p>";
    }

} catch (PDOException $e) {
    echo "<p class='status-err'>❌ Error al reparar la base de datos: " . htmlspecialchars($e->getMessage()) . "</p>";
}

echo "<a href='../index.html' class='btn'>Ir a la Calculadora</a>
</div>
</body>
</html>";
?>
