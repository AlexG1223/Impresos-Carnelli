<?php
// api/eventos.php
require_once 'config.php';

// Solo permitir peticiones GET para obtener la lista
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    sendJsonResponse(false, null, "Método no soportado");
}

function getTurismoInicio($year) {
    if (function_exists('easter_date')) {
        try {
            $easter = easter_date($year);
            return date('Y-m-d', strtotime("-7 days", $easter)); // Domingo de Ramos
        } catch (Exception $e) {
            // Continuar al fallback si hay error
        }
    }
    // Fallback de fechas para la Semana de Turismo/Santa
    $map = [
        2026 => '2026-03-29',
        2027 => '2027-03-21',
        2028 => '2028-04-09',
        2029 => '2029-03-25',
        2030 => '2030-04-14'
    ];
    return isset($map[$year]) ? $map[$year] : "$year-04-01";
}

function inicializarEventosParaAnio($pdo, $year) {
    // Verificar si ya existen eventos para este año
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM eventos_comerciales WHERE YEAR(fecha) = ?");
    $stmt->execute([$year]);
    $count = $stmt->fetchColumn();
    
    if ($count > 0) {
        return; // Ya está inicializado
    }
    
    $turismo_inicio = getTurismoInicio($year);
    
    // Acción de Gracias en EEUU es el cuarto jueves de noviembre, Black Friday es el día siguiente
    $thanksgiving = date('Y-m-d', strtotime("fourth Thursday of November $year"));
    $blackfriday = date('Y-m-d', strtotime("+1 day", strtotime($thanksgiving)));
    
    $eventos = [
        ['Reyes Magos', "$year-01-06"],
        ['San Valentín', "$year-02-14"],
        ['Semana de Turismo / de la Cerveza', $turismo_inicio],
        ['Día de la Madre', date('Y-m-d', strtotime("second sunday of May $year"))],
        ['Día de los Abuelos', "$year-06-19"], // Fijo en Uruguay (Natalicio de Artigas)
        ['Día del Padre', date('Y-m-d', strtotime("second sunday of July $year"))],
        ['Día de los Niños', date('Y-m-d', strtotime("third sunday of August $year"))],
        ['Día de los Hijos', date('Y-m-d', strtotime("third sunday of October $year"))],
        ['Halloween', "$year-10-31"],
        ['Black Friday', $blackfriday],
        ['Navidad / Fin de Año', "$year-12-25"]
    ];
    
    $stmtInsert = $pdo->prepare("INSERT INTO eventos_comerciales (nombre, fecha) VALUES (?, ?)");
    foreach ($eventos as $evt) {
        $stmtInsert->execute([$evt[0], $evt[1]]);
    }
}

try {
    // 1. Crear tabla si no existe
    $pdo->exec("CREATE TABLE IF NOT EXISTS eventos_comerciales (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        fecha DATE NOT NULL,
        comercial TINYINT(1) DEFAULT 1,
        creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )");

    // 2. Autopoblar el año actual y el siguiente para asegurar continuidad
    $anio_actual = intval(date('Y'));
    inicializarEventosParaAnio($pdo, $anio_actual);
    inicializarEventosParaAnio($pdo, $anio_actual + 1);

    // 3. Obtener eventos que aún no han pasado (hoy en adelante)
    $hoy = date('Y-m-d');
    $stmt = $pdo->prepare("
        SELECT id, nombre, fecha, DATEDIFF(fecha, ?) as dias_faltantes 
        FROM eventos_comerciales 
        WHERE fecha >= ? 
        ORDER BY fecha ASC
    ");
    $stmt->execute([$hoy, $hoy]);
    $eventos = $stmt->fetchAll();

    sendJsonResponse(true, $eventos, "Eventos comerciales obtenidos exitosamente");

} catch (Exception $e) {
    sendJsonResponse(false, null, "Error interno: " . $e->getMessage());
}
?>
