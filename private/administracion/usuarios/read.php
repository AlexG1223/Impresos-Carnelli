<?php

require_once __DIR__ . "/../../conexion.php";

$conexion = conectar_bd();

$sql = "
SELECT 
    u.id,
    u.nombre,
    u.rol,
    s.`ventas`,
    s.`serigrafia`,
    s.`offset`,
    s.`expedicion`,
    s.`diseño`
FROM usuarios u
LEFT JOIN sectores s ON u.id = s.id_usr;
";

$result = $conexion->query($sql);

$users = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $sectores = [];

        if ($row['ventas'] == 1) $sectores[] = 'Ventas';
        if ($row['serigrafia'] == 1) $sectores[] = 'Serigrafía';
        if ($row['offset'] == 1) $sectores[] = 'Offset';
        if ($row['expedicion'] == 1) $sectores[] = 'Expedición';
        if ($row['diseño'] == 1) $sectores[] = 'Diseño';

        $users[] = [
            'id' => $row['id'],
            'nombre' => $row['nombre'],
            'rol' => $row['rol'],
            'sectores' => $sectores 
        ];
    }

    echo json_encode([
        "success" => true,
        "users" => $users
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "No se encontraron usuarios"
    ]);
}
?>
