<?php 
    // Indicar al navegador que la respuesta es JSON
    header('Content-Type: application/json; charset=utf-8');

    // Opcional: Si vas a recibir datos POST en JSON, se leerían así:
    // $input = json_decode(file_get_contents('php://input'), true);

    echo json_encode([
        'success' => true, 
        'message' => 'Usuarios XD'
    ]);
    
    exit;
?>