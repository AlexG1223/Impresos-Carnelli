<?php
require 'api/config.php';
$m = $pdo->query("SELECT * FROM maquinas WHERE nombre LIKE '%Pulpo%'")->fetch(PDO::FETCH_ASSOC);
print_r($m);

$i = $pdo->query("SELECT * FROM insumos WHERE nombre LIKE '%Algodón%'")->fetch(PDO::FETCH_ASSOC);
print_r($i);
