<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

if (!isset($_SESSION['user'])) {
    http_response_code(403);
    echo '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><title>Acceso no autorizado</title><style>body{font-family:system-ui,-apple-system,sans-serif;text-align:center;padding:60px 20px;background:#f8fafc;color:#1e293b;}h2{color:#e11d48;}</style></head><body><h2>⚠️ Acceso no autorizado</h2><p>Debes iniciar sesión en ICSoftware para imprimir órdenes de trabajo.</p></body></html>';
    exit;
}

require_once __DIR__ . '/../conexion.php';
$conexion = conectar_bd();

$id_orden = (int)($_GET['id'] ?? $_GET['id_orden'] ?? 0);

if ($id_orden <= 0) {
    http_response_code(400);
    echo '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><title>Identificador Inválido</title><style>body{font-family:system-ui,-apple-system,sans-serif;text-align:center;padding:60px 20px;background:#f8fafc;color:#1e293b;}h2{color:#e11d48;}</style></head><body><h2>⚠️ Identificador inválido</h2><p>No se especificó un número de orden de trabajo válido.</p></body></html>';
    exit;
}

// 1. Obtener datos principales de la OT y relaciones
$sql_ot = "
SELECT 
    ot.id,
    ot.id_cliente,
    ot.id_vendedor,
    ot.detalle_trabajo,
    ot.presupuesto,
    ot.fecha_ingreso,
    ot.fecha_prometida,
    ot.es_repeticion,
    ot.sector_destino,
    ot.sena,
    ot.cantidad_impresiones,
    ot.etapa,
    ot.total_pago,
    ot.direccion_entrega,
    ot.comision_paga,
    ot.aclaracion_entrega,
    
    c.nombre AS cliente_nombre,
    c.razon_social AS cliente_razon_social,
    c.empresa AS cliente_empresa,
    c.rut AS cliente_rut,
    c.telefono AS cliente_telefono,
    c.direccion AS cliente_direccion,
    c.departamento AS cliente_departamento,
    c.localidad AS cliente_localidad,
    c.observaciones AS cliente_observaciones,
    c.fecha_alta AS cliente_fecha_alta,
    
    u.nombre AS vendedor_nombre,
    
    dp.especificaciones_tecnicas,
    dp.sector_responsable,
    dp.fecha_inicio_trabajo AS produccion_inicio,
    dp.fecha_fin_trabajo AS produccion_fin,
    op.nombre AS operario_nombre,
    
    dd.fecha_inicio_trabajo AS diseno_inicio,
    dd.fecha_fin_trabajo AS diseno_fin,
    dd.pago_realizado AS diseno_pago,
    dis.nombre AS disenador_nombre,
    
    de.metodo_envio,
    de.direccion_entrega_final,
    de.estado_embalaje,
    de.etiqueta_impresa,
    de.fecha_lista_entrega,
    de.autorizado_ventas,
    de.id AS id_expedicion

FROM ordenes_trabajo ot
INNER JOIN clientes c ON ot.id_cliente = c.id
LEFT JOIN usuarios u ON ot.id_vendedor = u.id
LEFT JOIN detalle_produccion dp ON dp.id_orden = ot.id
LEFT JOIN usuarios op ON dp.id_operario = op.id
LEFT JOIN detalle_diseño dd ON dd.id_orden = ot.id
LEFT JOIN usuarios dis ON dd.id_diseñador = dis.id
LEFT JOIN detalle_expedicion de ON de.id_orden = ot.id
WHERE ot.id = ?
LIMIT 1
";

$stmt_ot = $conexion->prepare($sql_ot);
$stmt_ot->bind_param("i", $id_orden);
$stmt_ot->execute();
$res_ot = $stmt_ot->get_result();

if ($res_ot->num_rows === 0) {
    echo '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><title>OT no encontrada</title><style>body{font-family:system-ui,-apple-system,sans-serif;text-align:center;padding:60px 20px;background:#f8fafc;color:#1e293b;}h2{color:#e11d48;}</style></head><body><h2>⚠️ Orden de trabajo no encontrada</h2><p>La OT #' . htmlspecialchars($id_orden) . ' no existe en el sistema.</p></body></html>';
    exit;
}

$ot = $res_ot->fetch_assoc();
$stmt_ot->close();

// 2. Obtener archivos adjuntos
$sql_arch = "SELECT id, ruta_archivo, tipo, fecha_subida, etapa_origen FROM archivos WHERE id_orden = ? ORDER BY fecha_subida ASC, id ASC";
$stmt_arch = $conexion->prepare($sql_arch);
$stmt_arch->bind_param("i", $id_orden);
$stmt_arch->execute();
$res_arch = $stmt_arch->get_result();

$archivos = [];
while ($rowA = $res_arch->fetch_assoc()) {
    $ext = strtolower(pathinfo($rowA['ruta_archivo'], PATHINFO_EXTENSION));
    $isImg = in_array($ext, ['jpg', 'jpeg', 'png', 'webp', 'gif']);
    $realFPath = realpath(__DIR__ . '/../../' . $rowA['ruta_archivo']);
    $thumbBase64 = null;
    
    if ($isImg && $realFPath && file_exists($realFPath)) {
        $mime = ($ext === 'jpg' || $ext === 'jpeg') ? 'image/jpeg' : ('image/' . $ext);
        $thumbBase64 = 'data:' . $mime . ';base64,' . base64_encode(file_get_contents($realFPath));
    }
    
    $archivos[] = [
        'id' => $rowA['id'],
        'nombre' => basename($rowA['ruta_archivo']),
        'tipo' => $rowA['tipo'] ?: $ext,
        'fecha' => $rowA['fecha_subida'],
        'etapa' => $rowA['etapa_origen'],
        'isImg' => $isImg,
        'thumb' => $thumbBase64,
        'url' => '/public/api/archivos/descargar.php?id=' . $rowA['id']
    ];
}
$stmt_arch->close();

// 3. Obtener historial de movimientos
$sql_hm = "
SELECT hm.id, hm.fecha_hora, hm.accion_realizada, hm.sector, u.nombre AS usuario_nombre 
FROM historial_movimientos hm 
LEFT JOIN usuarios u ON hm.id_usuario = u.id 
WHERE hm.id_orden = ? 
ORDER BY hm.fecha_hora ASC, hm.id ASC
";
$stmt_hm = $conexion->prepare($sql_hm);
$stmt_hm->bind_param("i", $id_orden);
$stmt_hm->execute();
$res_hm = $stmt_hm->get_result();

$movimientos = [];
while ($rowM = $res_hm->fetch_assoc()) {
    $movimientos[] = $rowM;
}
$stmt_hm->close();
$conexion->close();

// 4. Formateos y cálculos de negocio
$estado = $ot['etapa'] ?? 'INGRESADA';
if ($ot['etapa'] === 'EXPEDICION' && !empty($ot['id_expedicion'])) {
    $estado = 'FINALIZADA';
} elseif (in_array($ot['etapa'], ['PRODUCCION', 'EN_PRODUCCION'])) {
    $estado = $ot['sector_destino'] ?: 'PRODUCCIÓN';
} elseif ($ot['etapa'] === 'INGRESADA') {
    $estado = 'DISEÑO';
}

$presupuesto = (float)($ot['presupuesto'] ?? 0);
$sena = (float)($ot['sena'] ?? 0);
$saldo = max(0, $presupuesto - $sena);
$isPagado = ((int)($ot['total_pago'] ?? 0) === 1) || ($presupuesto > 0 && $saldo <= 0.01);
$esRepeticion = ((int)($ot['es_repeticion'] ?? 0)) === 1;

function formatearFechaHora($str) {
    if (!$str || $str === '0000-00-00 00:00:00') return '-';
    $t = strtotime($str);
    return $t ? date('d/m/Y H:i', $t) : $str;
}

function formatearFecha($str) {
    if (!$str || $str === '0000-00-00') return '-';
    $t = strtotime($str);
    return $t ? date('d/m/Y', $t) : $str;
}

$fechaIngresoFmt = formatearFechaHora($ot['fecha_ingreso']);
$fechaPrometidaFmt = formatearFecha($ot['fecha_prometida']);
$disenoInicioFmt = formatearFechaHora($ot['diseno_inicio']);
$disenoFinFmt = formatearFechaHora($ot['diseno_fin']);
$prodInicioFmt = formatearFechaHora($ot['produccion_inicio']);
$prodFinFmt = formatearFechaHora($ot['produccion_fin']);

// Procesar especificaciones técnicas si ya existen estructuradas o en texto
$specsData = [];
$rawSpecs = trim($ot['especificaciones_tecnicas'] ?? '');
if (!empty($rawSpecs)) {
    $decoded = json_decode($rawSpecs, true);
    if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {
        $specsData = $decoded;
    }
}

$medidasFinalesVal = $specsData['medidas_finales'] ?? '';
$cantidadVal = $specsData['cantidad'] ?? (!empty($ot['cantidad_impresiones']) ? number_format($ot['cantidad_impresiones'], 0, '', '.') : '');
$tipoPapelVal = $specsData['tipo_papel'] ?? '';
$pliegosImprimirVal = $specsData['pliegos_imprimir'] ?? '';
$coloresVal = $specsData['colores'] ?? '';
$firmaMaquinista1Val = $specsData['firma_maquinista_1'] ?? '';
$fecha1Val = $specsData['fecha_1'] ?? '';

$troqueladoVal = $specsData['troquelado'] ?? '';
$numeroTroquelVal = $specsData['numero_troquel'] ?? '';
$cantidadGolpesVal = $specsData['cantidad_golpes'] ?? '';
$firmaMaquinista2Val = $specsData['firma_maquinista_2'] ?? '';
$fecha2Val = $specsData['fecha_2'] ?? '';

$empaquetadoVal = $specsData['empaquetado'] ?? '';
$envioVal = $specsData['envio'] ?? ($ot['metodo_envio'] ?: ($ot['direccion_entrega'] ? 'Envío' : 'Retiro'));
$fechaEnvioVal = $specsData['fecha_envio'] ?? '';

$maquinasSeleccionadas = $specsData['maquinas'] ?? [];

// Logo en base64 para renderizado instantáneo
$logoPath = realpath(__DIR__ . '/../../public/assets/img/ICLogo.jpeg');
$logoBase64 = '';
if ($logoPath && file_exists($logoPath)) {
    $logoBase64 = 'data:image/jpeg;base64,' . base64_encode(file_get_contents($logoPath));
} else {
    $logoBase64 = '/public/assets/img/ICLogo.jpeg';
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Orden de Trabajo #<?= $ot['id'] ?> - <?= htmlspecialchars($ot['cliente_nombre']) ?> | Impresos Carnelli</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
  
  <style>
    /* =====================================================================
       VARIABLES DE COLOR Y DISEÑO
       ===================================================================== */
    :root {
      --primary: #2563eb;
      --primary-dark: #1d4ed8;
      --primary-light: #eff6ff;
      --slate-900: #0f172a;
      --slate-800: #1e293b;
      --slate-700: #334155;
      --slate-600: #475569;
      --slate-500: #64748b;
      --slate-400: #94a3b8;
      --slate-200: #e2e8f0;
      --slate-100: #f1f5f9;
      --slate-50:  #f8fafc;
      --success: #059669;
      --success-light: #d1fae5;
      --warning: #d97706;
      --warning-light: #fef3c7;
      --danger: #dc2626;
      --danger-light: #fee2e2;
      --purple: #7c3aed;
      --purple-light: #ede9fe;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: #0f172a;
      color: #1e293b;
      font-size: 11px;
      line-height: 1.45;
      -webkit-font-smoothing: antialiased;
    }

    /* =====================================================================
       BARRA SUPERIOR FLOTANTE (SOLO PANTALLA)
       ===================================================================== */
    .top-toolbar {
      position: sticky;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      background: rgba(15, 23, 42, 0.94);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      padding: 10px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #ffffff;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
    }

    .toolbar-info {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .toolbar-title {
      font-size: 15px;
      font-weight: 700;
      letter-spacing: -0.01em;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .toolbar-badge {
      font-family: 'JetBrains Mono', monospace;
      background: rgba(37, 99, 235, 0.3);
      border: 1px solid rgba(96, 165, 250, 0.4);
      color: #93c5fd;
      padding: 2px 8px;
      border-radius: 6px;
      font-size: 12px;
    }

    .toolbar-client {
      color: #94a3b8;
      font-size: 13px;
      border-left: 1px solid rgba(255, 255, 255, 0.2);
      padding-left: 14px;
    }

    .toolbar-actions {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-family: inherit;
      font-size: 12px;
      font-weight: 600;
      padding: 8px 16px;
      border-radius: 8px;
      border: none;
      cursor: pointer;
      transition: all 0.18s ease;
      text-decoration: none;
    }

    .btn-print {
      background: linear-gradient(135deg, #2563eb, #1d4ed8);
      color: #ffffff;
      box-shadow: 0 4px 14px rgba(37, 99, 235, 0.4);
    }

    .btn-print:hover {
      background: linear-gradient(135deg, #1d4ed8, #1e40af);
      transform: translateY(-1px);
      box-shadow: 0 6px 18px rgba(37, 99, 235, 0.5);
    }

    .btn-close {
      background: rgba(255, 255, 255, 0.1);
      color: #e2e8f0;
      border: 1px solid rgba(255, 255, 255, 0.15);
    }

    .btn-close:hover {
      background: rgba(255, 255, 255, 0.2);
      color: #ffffff;
    }

    /* =====================================================================
       CONTENEDOR A4 (HOJA TIPO PDF)
       ===================================================================== */
    .page-wrapper {
      padding: 24px 16px 40px;
      display: flex;
      justify-content: center;
    }

    .a4-container {
      width: 210mm;
      min-height: 297mm;
      background: #ffffff;
      padding: 12mm 14mm;
      box-shadow: 0 15px 45px rgba(0, 0, 0, 0.45);
      border-radius: 4px;
      color: #0f172a;
      display: flex;
      flex-direction: column;
      position: relative;
    }

    /* =====================================================================
       CABECERA CORPORATIVA Y NÚMERO DE OT
       ===================================================================== */
    .doc-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2px solid #0f172a;
      padding-bottom: 10px;
      margin-bottom: 12px;
      gap: 16px;
    }

    .header-brand {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .brand-logo {
      height: 48px;
      width: auto;
      object-fit: contain;
      border-radius: 4px;
    }

    .brand-text h1 {
      font-size: 16px;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.02em;
      line-height: 1.15;
    }

    .brand-text p.subtitle {
      font-size: 10px;
      font-weight: 600;
      color: #2563eb;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      margin-bottom: 2px;
    }

    .brand-text p.meta {
      font-size: 9px;
      color: #64748b;
    }

    .header-doc-info {
      text-align: right;
    }

    .doc-title {
      font-size: 18px;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.02em;
      text-transform: uppercase;
      line-height: 1;
    }

    .doc-ot-id {
      font-family: 'JetBrains Mono', monospace;
      font-size: 20px;
      font-weight: 800;
      color: #2563eb;
      line-height: 1.2;
      margin: 2px 0;
    }

    .header-badges {
      display: flex;
      gap: 5px;
      justify-content: flex-end;
      flex-wrap: wrap;
      margin-top: 4px;
    }

    .badge {
      display: inline-block;
      padding: 3px 8px;
      border-radius: 4px;
      font-size: 9.5px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }

    .badge-estado {
      background: #dbeafe;
      color: #1e40af;
      border: 1px solid #bfdbfe;
    }
    .badge-offset { background: #ede9fe; color: #5b21b6; border: 1px solid #ddd6fe; }
    .badge-serigrafia { background: #fce7f3; color: #9d174d; border: 1px solid #fbcfe8; }
    .badge-expedicion { background: #ecfeff; color: #155e75; border: 1px solid #cffafe; }
    .badge-finalizada { background: #d1fae5; color: #065f46; border: 1px solid #a7f3d0; }

    .badge-rep-si {
      background: #fef3c7;
      color: #92400e;
      border: 1px solid #fde68a;
    }

    /* =====================================================================
       BARRA DE MÉTRICAS CLAVE (GRID 2 COLUMNAS)
       ===================================================================== */
    .metrics-bar {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-bottom: 12px;
    }

    .metric-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 6px 10px;
    }

    .metric-card.urgent {
      background: #fff1f2;
      border-color: #fecdd3;
    }

    .metric-card.urgent .metric-label {
      color: #be123c;
    }

    .metric-card.urgent .metric-val {
      color: #9f1239;
    }

    .metric-label {
      font-size: 9px;
      font-weight: 700;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .metric-val {
      font-size: 13px;
      font-weight: 800;
      color: #0f172a;
      margin-top: 1px;
      font-family: 'JetBrains Mono', monospace;
    }

    .metric-sub {
      font-size: 8.5px;
      color: #64748b;
      margin-top: 1px;
    }

    /* =====================================================================
       SECCIONES EN 2 COLUMNAS (CLIENTE Y GESTIÓN)
       ===================================================================== */
    .grid-2col {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-bottom: 12px;
    }

    .card-box {
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 9px 11px;
      background: #ffffff;
    }

    .card-box-header {
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #1e293b;
      padding-bottom: 5px;
      margin-bottom: 7px;
      border-bottom: 1.5px solid #e2e8f0;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .info-list {
      display: grid;
      grid-template-columns: auto 1fr;
      column-gap: 8px;
      row-gap: 3.5px;
      font-size: 10.5px;
    }

    .info-list dt {
      font-weight: 600;
      color: #64748b;
      white-space: nowrap;
    }

    .info-list dd {
      color: #0f172a;
      font-weight: 500;
      word-break: break-word;
    }

    .info-list dd strong {
      font-weight: 700;
    }

    /* =====================================================================
       DETALLE DEL TRABAJO Y ESPECIFICACIONES TÉCNICAS
       ===================================================================== */
    .section-full {
      margin-bottom: 12px;
    }

    .section-title {
      font-size: 10.5px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #0f172a;
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 5px;
    }

    .content-box {
      border: 1px solid #cbd5e1;
      border-left: 4px solid #2563eb;
      background: #f8fafc;
      padding: 9px 12px;
      border-radius: 4px;
      font-size: 11px;
      line-height: 1.5;
      color: #1e293b;
      white-space: pre-wrap;
      word-break: break-word;
    }

    .content-box.tecnico {
      border-left-color: #d97706;
      background: #fffbeb;
    }

    /* =====================================================================
       FORMULARIO DE ESPECIFICACIONES TÉCNICAS (INTERACTIVO / IMPRESIÓN)
       ===================================================================== */
    .section-title-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 5px;
    }

    .specs-toolbar {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .save-status {
      font-size: 10px;
      font-weight: 600;
      color: #64748b;
      transition: all 0.2s ease;
    }
    .save-status.saved {
      color: #059669;
    }
    .save-status.saving {
      color: #d97706;
    }

    .btn-save-specs {
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      color: #1d4ed8;
      font-size: 10px;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 4px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      transition: all 0.15s ease;
    }
    .btn-save-specs:hover {
      background: #dbeafe;
      border-color: #93c5fd;
    }

    .spec-sheet {
      border: 1px solid #cbd5e1;
      border-left: 4px solid #d97706;
      background: #ffffff;
      padding: 10px 14px;
      border-radius: 4px;
    }

    /* RUTA DE MÁQUINAS */
    .spec-machines-row {
      display: flex;
      align-items: center;
      gap: 8px;
      padding-bottom: 8px;
      margin-bottom: 10px;
      border-bottom: 1.5px dashed #cbd5e1;
      flex-wrap: wrap;
    }

    .spec-machines-title {
      font-size: 11.5px;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: 0.01em;
    }

    .spec-machines-list {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;
    }

    .spec-machine-chip {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 11px;
      font-weight: 600;
      color: #334155;
      padding: 2px 7px;
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      background: #f8fafc;
      cursor: pointer;
      user-select: none;
      transition: all 0.15s ease;
    }

    .spec-machine-chip:hover {
      background: #f1f5f9;
      border-color: #94a3b8;
    }

    .spec-machine-chip.active {
      background: #ede9fe;
      color: #5b21b6;
      border-color: #c4b5fd;
      font-weight: 700;
    }

    .spec-machine-chip input[type="checkbox"] {
      display: none;
    }

    .chip-box {
      font-size: 12px;
      line-height: 1;
    }

    .chip-separator {
      color: #94a3b8;
      font-weight: bold;
    }

    /* GRID 2 COLUMNAS DE ESPECIFICACIONES */
    .spec-grid-2col {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .spec-col {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .spec-row {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 11px;
    }

    .spec-label {
      width: 135px;
      flex-shrink: 0;
      font-weight: 700;
      color: #0f172a;
      white-space: nowrap;
    }

    .spec-input {
      flex: 1;
      min-width: 0;
      font-family: inherit;
      font-size: 11px;
      font-weight: 600;
      color: #0f172a;
      background: #fafafa;
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      padding: 3px 6px;
      outline: none;
      transition: all 0.15s ease;
    }

    .spec-input:hover {
      border-color: #94a3b8;
      background: #ffffff;
    }

    .spec-input:focus {
      border-color: #2563eb;
      background: #ffffff;
      box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.15);
    }

    .spec-row-spacer {
      margin-top: 8px;
      padding-top: 6px;
      border-top: 1px dashed #e2e8f0;
    }

    .spec-subgroup {
      margin-top: 10px;
      padding-top: 8px;
      border-top: 1px dashed #e2e8f0;
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .spec-prev-notes {
      margin-top: 10px;
      padding: 6px 10px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 4px;
      font-size: 10px;
      color: #475569;
    }

    .content-empty {
      font-style: italic;
      color: #94a3b8;
    }

    /* =====================================================================
       ARCHIVOS ADJUNTOS CON MINIATURAS
       ===================================================================== */
    .archivos-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
      gap: 8px;
      margin-top: 6px;
    }

    .archivo-card {
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 6px;
      background: #ffffff;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
    }

    .archivo-thumb-img {
      max-width: 100%;
      height: 70px;
      object-fit: contain;
      border-radius: 4px;
      border: 1px solid #f1f5f9;
      background: #f8fafc;
    }

    .archivo-icon-doc {
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 26px;
      color: #e11d48;
    }

    .archivo-name {
      font-size: 9px;
      font-weight: 600;
      color: #334155;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .archivo-meta {
      font-size: 8px;
      color: #94a3b8;
    }

    /* =====================================================================
       HISTORIAL DE MOVIMIENTOS COMPACTO
       ===================================================================== */
    .timeline-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 9.5px;
      margin-top: 5px;
    }

    .timeline-table th {
      background: #f1f5f9;
      color: #475569;
      font-weight: 700;
      text-align: left;
      padding: 4px 6px;
      border: 1px solid #e2e8f0;
    }

    .timeline-table td {
      padding: 4px 6px;
      border: 1px solid #e2e8f0;
      color: #1e293b;
    }

    .doc-footer {
      margin-top: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 8px;
      color: #94a3b8;
      border-top: 1px solid #f1f5f9;
      padding-top: 8px;
    }

    /* =====================================================================
       ESTILOS EXCLUSIVOS PARA IMPRESIÓN (A4 EXACTO)
       ===================================================================== */
    @media print {
      @page {
        size: A4 portrait;
        margin: 8mm 10mm 8mm 10mm;
      }

      html, body {
        background: #ffffff !important;
        margin: 0 !important;
        padding: 0 !important;
        color: #0f172a !important;
      }

      .no-print, .top-toolbar {
        display: none !important;
      }

      .page-wrapper {
        padding: 0 !important;
        margin: 0 !important;
        display: block !important;
      }

      .a4-container {
        width: 100% !important;
        min-height: auto !important;
        padding: 0 !important;
        box-shadow: none !important;
        border-radius: 0 !important;
        display: block !important;
      }

      .page-break-inside-avoid,
      .card-box,
      .metric-card,
      .content-box,
      .spec-sheet,
      .timeline-table {
        break-inside: avoid !important;
        page-break-inside: avoid !important;
      }

      .specs-toolbar {
        display: none !important;
      }

      .spec-sheet {
        border: 1px solid #cbd5e1 !important;
        border-left: 3px solid #0f172a !important;
        background: transparent !important;
        padding: 6px 10px !important;
      }

      .spec-machines-row {
        border-bottom: 1px dashed #64748b !important;
        padding-bottom: 4px !important;
        margin-bottom: 6px !important;
      }

      .spec-machine-chip {
        border: none !important;
        background: transparent !important;
        padding: 0 3px !important;
        font-size: 10px !important;
      }

      .spec-machine-chip.active {
        color: #0f172a !important;
        font-weight: 800 !important;
      }

      .spec-grid-2col {
        display: grid !important;
        grid-template-columns: 1fr 1fr !important;
        gap: 16px !important;
      }

      .spec-row {
        display: flex !important;
        align-items: center !important;
        gap: 4px !important;
        font-size: 10px !important;
        margin-bottom: 2px !important;
      }

      .spec-label {
        width: 130px !important;
        font-size: 10px !important;
        font-weight: 700 !important;
        color: #000000 !important;
      }

      .spec-input {
        border: none !important;
        border-bottom: 1px dotted #475569 !important;
        border-radius: 0 !important;
        background: transparent !important;
        box-shadow: none !important;
        padding: 1px 2px !important;
        font-size: 10.5px !important;
        font-weight: 700 !important;
        color: #000000 !important;
      }

      .spec-input::placeholder {
        color: transparent !important;
      }

      .spec-row-spacer,
      .spec-subgroup {
        border-top: 1px dotted #cbd5e1 !important;
      }

      * {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
        color-adjust: exact !important;
      }
    }
  </style>
</head>
<body>

  <!-- BARRA DE ACCIONES SUPERIOR -->
  <div class="top-toolbar no-print">
    <div class="toolbar-info">
      <div class="toolbar-title">
        <span>🖨️ Orden de Trabajo</span>
        <span class="toolbar-badge">#<?= $ot['id'] ?></span>
      </div>
      <div class="toolbar-client">
        Cliente: <strong><?= htmlspecialchars($ot['cliente_nombre']) ?></strong>
      </div>
    </div>
    <div class="toolbar-actions">
      <button type="button" class="btn btn-print" id="btnTopPrint" onclick="imprimirOrden()">
        <span>🖨️</span> Imprimir / Guardar como PDF
      </button>
      <button type="button" class="btn btn-close" onclick="window.close()">
        <span>✕</span> Cerrar
      </button>
    </div>
  </div>

  <!-- CONTENEDOR DE HOJA A4 -->
  <div class="page-wrapper">
    <div class="a4-container">

      <!-- CABECERA -->
      <header class="doc-header">
        <div class="header-brand">
          <img src="<?= $logoBase64 ?>" alt="Impresos Carnelli Logo" class="brand-logo" />
          <div class="brand-text">
            <p class="subtitle">Imprenta Offset & Serigrafía</p>
            <h1>IMPRESOS CARNELLI</h1>
            <p class="meta">Montevideo, Uruguay • Tel: 099 244 708 • impresoscarnelli.com</p>
          </div>
        </div>

        <div class="header-doc-info">
          <div class="doc-title">ORDEN DE TRABAJO</div>
          <div class="doc-ot-id">#<?= str_pad($ot['id'], 5, '0', STR_PAD_LEFT) ?></div>
          <div class="header-badges">
            <span class="badge badge-estado badge-<?= strtolower($estado) ?>"><?= htmlspecialchars($estado) ?></span>
            <span class="badge badge-<?= strtolower($ot['sector_destino'] ?? '') ?>">
              <?= htmlspecialchars($ot['sector_destino'] ?: 'PRODUCCIÓN') ?>
            </span>
            <?php if ($esRepeticion): ?>
              <span class="badge badge-rep-si">🔁 REPETICIÓN</span>
            <?php endif; ?>
          </div>
        </div>
      </header>

      <!-- MÉTRICAS CLAVE -->
      <div class="metrics-bar page-break-inside-avoid">
        <div class="metric-card urgent">
          <div class="metric-label">📅 Fecha Prometida</div>
          <div class="metric-val"><?= $fechaPrometidaFmt ?></div>
          <div class="metric-sub">Compromiso con cliente</div>
        </div>

        <div class="metric-card">
          <div class="metric-label">📦 Tirada / Cantidad</div>
          <div class="metric-val"><?= number_format($ot['cantidad_impresiones'] ?? 0, 0, '', '.') ?> un.</div>
          <div class="metric-sub">Sector: <?= htmlspecialchars($ot['sector_destino'] ?: '-') ?></div>
        </div>
      </div>

      <!-- GRID CLIENTE Y GESTIÓN -->
      <div class="grid-2col page-break-inside-avoid">
        <!-- DATOS DEL CLIENTE -->
        <div class="card-box">
          <div class="card-box-header">👤 Datos del Cliente</div>
          <dl class="info-list">
            <dt>Nombre:</dt>
            <dd><strong><?= htmlspecialchars($ot['cliente_nombre'] ?? '-') ?></strong></dd>

            <dt>Empresa:</dt>
            <dd><?= htmlspecialchars($ot['cliente_empresa'] ?: ($ot['cliente_razon_social'] ?: '-')) ?></dd>
          </dl>
        </div>

        <!-- GESTIÓN -->
        <div class="card-box">
          <div class="card-box-header">📋 Gestión</div>
          <dl class="info-list">
            <dt>Vendedor:</dt>
            <dd><strong><?= htmlspecialchars($ot['vendedor_nombre'] ?? '-') ?></strong></dd>

            <dt>Fecha:</dt>
            <dd><?= $fechaIngresoFmt ?></dd>
          </dl>
        </div>
      </div>

      <!-- DETALLE DEL TRABAJO -->
      <div class="section-full page-break-inside-avoid">
        <div class="section-title">📝 Detalle del Trabajo</div>
        <div class="content-box">
          <?php if (!empty(trim($ot['detalle_trabajo'] ?? ''))): ?>
            <?= nl2br(htmlspecialchars($ot['detalle_trabajo'])) ?>
          <?php else: ?>
            <span class="content-empty">No se registraron detalles específicos del trabajo.</span>
          <?php endif; ?>
        </div>
      </div>

      <!-- ESPECIFICACIONES TÉCNICAS -->
      <div class="section-full page-break-inside-avoid">
        <div class="section-title-bar">
          <div class="section-title">⚙️ Especificaciones Técnicas (Taller / Impresión)</div>
          <div class="specs-toolbar no-print">
            <span class="save-status" id="saveStatus"></span>
          </div>
        </div>

        <div class="spec-sheet">
          
          <!-- RUTA DE MÁQUINAS -->
          <div class="spec-machines-row">
            <span class="spec-machines-title">Máquinas:</span>
            <div class="spec-machines-list">
              <?php 
                $maquinasDef = [
                  ['id' => 'm_guillotina_1', 'label' => 'Guillotina'],
                  ['id' => 'm_komori',       'label' => 'Komori'],
                  ['id' => 'm_minerva',      'label' => 'Minerva'],
                  ['id' => 'm_plana',        'label' => 'Plana'],
                  ['id' => 'm_muller',       'label' => 'Muller'],
                  ['id' => 'm_guillotina_2', 'label' => 'Guillotina'],
                ];
                foreach ($maquinasDef as $i => $m):
                  $checked = in_array($m['id'], $maquinasSeleccionadas) || in_array($m['label'], $maquinasSeleccionadas);
              ?>
                <label class="spec-machine-chip <?= $checked ? 'active' : '' ?>">
                  <input type="checkbox" name="maquinas[]" value="<?= $m['id'] ?>" class="spec-machine-check" <?= $checked ? 'checked' : '' ?> />
                  <span class="chip-box"><?= $checked ? '☑' : '☐' ?></span>
                  <span class="chip-label"><?= $m['label'] ?></span>
                </label>
                <?php if ($i < count($maquinasDef) - 1): ?>
                  <span class="chip-separator">-</span>
                <?php endif; ?>
              <?php endforeach; ?>
            </div>
          </div>

          <!-- GRID DE ESPECIFICACIONES TÉCNICAS (2 COLUMNAS) -->
          <div class="spec-grid-2col">
            
            <!-- BLOQUE 1: IMPRESIÓN -->
            <div class="spec-col">
              <div class="spec-row">
                <label class="spec-label">Medidas Finales:</label>
                <input type="text" class="spec-input" id="spec_medidas_finales" name="medidas_finales" value="<?= htmlspecialchars($medidasFinalesVal) ?>" placeholder="Completar..." />
              </div>

              <div class="spec-row">
                <label class="spec-label">Cantidad:</label>
                <input type="text" class="spec-input" id="spec_cantidad" name="cantidad" value="<?= htmlspecialchars($cantidadVal) ?>" placeholder="Completar..." />
              </div>

              <div class="spec-row">
                <label class="spec-label">Tipo de Papel:</label>
                <input type="text" class="spec-input" id="spec_tipo_papel" name="tipo_papel" value="<?= htmlspecialchars($tipoPapelVal) ?>" placeholder="Completar..." />
              </div>

              <div class="spec-row">
                <label class="spec-label">Pliegos a Imprimir:</label>
                <input type="text" class="spec-input" id="spec_pliegos_imprimir" name="pliegos_imprimir" value="<?= htmlspecialchars($pliegosImprimirVal) ?>" placeholder="Completar..." />
              </div>

              <div class="spec-row">
                <label class="spec-label">Colores:</label>
                <input type="text" class="spec-input" id="spec_colores" name="colores" value="<?= htmlspecialchars($coloresVal) ?>" placeholder="Completar..." />
              </div>

              <div class="spec-row spec-row-spacer">
                <label class="spec-label">Firma Maquinista:</label>
                <input type="text" class="spec-input" id="spec_firma_1" name="firma_maquinista_1" value="<?= htmlspecialchars($firmaMaquinista1Val) ?>" placeholder="Firma / Nombre" />
              </div>

              <div class="spec-row">
                <label class="spec-label">Fecha:</label>
                <input type="text" class="spec-input" id="spec_fecha_1" name="fecha_1" value="<?= htmlspecialchars($fecha1Val) ?>" placeholder="DD/MM/AAAA" />
              </div>
            </div>

            <!-- BLOQUE 2: TROQUELADO Y EMPAQUETADO -->
            <div class="spec-col">
              <div class="spec-row">
                <label class="spec-label">Troquelado:</label>
                <input type="text" class="spec-input" id="spec_troquelado" name="troquelado" value="<?= htmlspecialchars($troqueladoVal) ?>" placeholder="Completar..." />
              </div>

              <div class="spec-row">
                <label class="spec-label">Número Troquel:</label>
                <input type="text" class="spec-input" id="spec_numero_troquel" name="numero_troquel" value="<?= htmlspecialchars($numeroTroquelVal) ?>" placeholder="Completar..." />
              </div>

              <div class="spec-row">
                <label class="spec-label">Cantidad Golpes:</label>
                <input type="text" class="spec-input" id="spec_cantidad_golpes" name="cantidad_golpes" value="<?= htmlspecialchars($cantidadGolpesVal) ?>" placeholder="Completar..." />
              </div>

              <div class="spec-row spec-row-spacer">
                <label class="spec-label">Firma Maquinista:</label>
                <input type="text" class="spec-input" id="spec_firma_2" name="firma_maquinista_2" value="<?= htmlspecialchars($firmaMaquinista2Val) ?>" placeholder="Firma / Nombre" />
              </div>

              <div class="spec-row">
                <label class="spec-label">Fecha:</label>
                <input type="text" class="spec-input" id="spec_fecha_2" name="fecha_2" value="<?= htmlspecialchars($fecha2Val) ?>" placeholder="DD/MM/AAAA" />
              </div>

              <!-- EMPAQUETADO / ENVÍO -->
              <div class="spec-subgroup">
                <div class="spec-row">
                  <label class="spec-label">Empaquetado:</label>
                  <input type="text" class="spec-input" id="spec_empaquetado" name="empaquetado" value="<?= htmlspecialchars($empaquetadoVal) ?>" placeholder="Completar..." />
                </div>

                <div class="spec-row">
                  <label class="spec-label">Envío:</label>
                  <input type="text" class="spec-input" id="spec_envio" name="envio" value="<?= htmlspecialchars($envioVal) ?>" placeholder="Completar..." />
                </div>

                <div class="spec-row">
                  <label class="spec-label">Fecha:</label>
                  <input type="text" class="spec-input" id="spec_fecha_envio" name="fecha_envio" value="<?= htmlspecialchars($fechaEnvioVal) ?>" placeholder="DD/MM/AAAA" />
                </div>
              </div>

            </div>

          </div>

          <?php if (!empty($rawSpecs) && empty($specsData)): ?>
            <!-- NOTAS ADICIONALES PREVIAS -->
            <div class="spec-prev-notes">
              <strong>Notas previas registradas:</strong>
              <div><?= nl2br(htmlspecialchars($rawSpecs)) ?></div>
            </div>
          <?php endif; ?>

        </div>
      </div>

      <!-- ARCHIVOS ADJUNTOS -->
      <?php if (!empty($archivos)): ?>
        <div class="section-full page-break-inside-avoid">
          <div class="section-title">📎 Archivos y Muestras Visuales (<?= count($archivos) ?>)</div>
          <div class="archivos-grid">
            <?php foreach ($archivos as $arch): ?>
              <div class="archivo-card">
                <?php if ($arch['isImg'] && $arch['thumb']): ?>
                  <img src="<?= $arch['thumb'] ?>" alt="<?= htmlspecialchars($arch['nombre']) ?>" class="archivo-thumb-img" />
                <?php else: ?>
                  <div class="archivo-icon-doc">📄</div>
                <?php endif; ?>
                <span class="archivo-name" title="<?= htmlspecialchars($arch['nombre']) ?>">
                  <?= htmlspecialchars($arch['nombre']) ?>
                </span>
                <span class="archivo-meta">
                  <?= htmlspecialchars($arch['etapa']) ?> • <?= formatearFecha($arch['fecha']) ?>
                </span>
              </div>
            <?php endforeach; ?>
          </div>
        </div>
      <?php endif; ?>

      <!-- TRAZABILIDAD / HISTORIAL DE MOVIMIENTOS -->
      <?php if (!empty($movimientos)): ?>
        <div class="section-full page-break-inside-avoid">
          <div class="section-title">⏱️ Historial de Trazabilidad</div>
          <table class="timeline-table">
            <thead>
              <tr>
                <th style="width: 25%;">Fecha y Hora</th>
                <th style="width: 20%;">Sector</th>
                <th style="width: 25%;">Usuario</th>
                <th style="width: 30%;">Acción Realizada</th>
              </tr>
            </thead>
            <tbody>
              <?php foreach ($movimientos as $mov): ?>
                <tr>
                  <td><?= formatearFechaHora($mov['fecha_hora']) ?></td>
                  <td><strong><?= htmlspecialchars($mov['sector'] ?: '-') ?></strong></td>
                  <td><?= htmlspecialchars($mov['usuario_nombre'] ?: 'Sistema') ?></td>
                  <td><?= htmlspecialchars($mov['accion_realizada'] ?: '-') ?></td>
                </tr>
              <?php endforeach; ?>
            </tbody>
          </table>
        </div>
      <?php endif; ?>

      <footer class="doc-footer" style="margin-top: auto; padding-top: 14px; border-top: 1px solid #e2e8f0;">
        <span>ICSoftware • Impresos Carnelli • Documento interno de producción</span>
      </footer>

    </div>
  </div>

  <script>
    const OT_ID = <?= (int)$ot['id'] ?>;

    // Recolectar datos actuales del formulario de especificaciones técnicas
    function getSpecsPayload() {
      const maquinas = [];
      document.querySelectorAll('.spec-machine-chip input[type="checkbox"]:checked').forEach(cb => {
        maquinas.push(cb.value);
      });

      return {
        maquinas: maquinas,
        medidas_finales: document.getElementById('spec_medidas_finales')?.value.trim() || '',
        cantidad: document.getElementById('spec_cantidad')?.value.trim() || '',
        tipo_papel: document.getElementById('spec_tipo_papel')?.value.trim() || '',
        pliegos_imprimir: document.getElementById('spec_pliegos_imprimir')?.value.trim() || '',
        colores: document.getElementById('spec_colores')?.value.trim() || '',
        firma_maquinista_1: document.getElementById('spec_firma_1')?.value.trim() || '',
        fecha_1: document.getElementById('spec_fecha_1')?.value.trim() || '',

        troquelado: document.getElementById('spec_troquelado')?.value.trim() || '',
        numero_troquel: document.getElementById('spec_numero_troquel')?.value.trim() || '',
        cantidad_golpes: document.getElementById('spec_cantidad_golpes')?.value.trim() || '',
        firma_maquinista_2: document.getElementById('spec_firma_2')?.value.trim() || '',
        fecha_2: document.getElementById('spec_fecha_2')?.value.trim() || '',

        empaquetado: document.getElementById('spec_empaquetado')?.value.trim() || '',
        envio: document.getElementById('spec_envio')?.value.trim() || '',
        fecha_envio: document.getElementById('spec_fecha_envio')?.value.trim() || ''
      };
    }

    // Sincronizar atributo value en el DOM para asegurar compatibilidad de impresión en todos los navegadores
    function syncInputAttributes() {
      document.querySelectorAll('.spec-input').forEach(input => {
        input.setAttribute('value', input.value);
      });
    }

    let saveTimeout = null;

    // Guardar especificaciones vía AJAX en base de datos y localStorage
    async function guardarEspecificaciones(silent = false) {
      syncInputAttributes();
      const statusEl = document.getElementById('saveStatus');
      const payload = getSpecsPayload();

      // Guardado local de respaldo inmediato
      try {
        localStorage.setItem('ot_specs_' + OT_ID, JSON.stringify(payload));
      } catch (e) {}

      if (!silent && statusEl) {
        statusEl.className = 'save-status saving';
        statusEl.textContent = 'Guardando...';
      }

      try {
        const resp = await fetch('/public/api/ordenes_trabajo/guardar_especificaciones.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id_orden: OT_ID,
            especificaciones_tecnicas: payload
          })
        });

        const data = await resp.json();
        if (data && data.success) {
          if (statusEl) {
            statusEl.className = 'save-status saved';
            statusEl.textContent = 'Guardado ✓';
            setTimeout(() => {
              if (statusEl.textContent === 'Guardado ✓') {
                statusEl.textContent = '';
              }
            }, 3000);
          }
          return true;
        } else {
          if (!silent && statusEl) {
            statusEl.className = 'save-status';
            statusEl.style.color = '#dc2626';
            statusEl.textContent = 'Error al guardar';
          }
          return false;
        }
      } catch (err) {
        console.warn('Error guardando especificaciones en servidor:', err);
        if (!silent && statusEl) {
          statusEl.className = 'save-status';
          statusEl.style.color = '#dc2626';
          statusEl.textContent = 'Error de conexión';
        }
        return false;
      }
    }

    // Acción de imprimir: guarda antes de abrir el diálogo de impresión
    async function imprimirOrden() {
      syncInputAttributes();
      const printBtn = document.getElementById('btnTopPrint');
      if (printBtn) {
        printBtn.disabled = true;
        printBtn.innerHTML = '<span>⏳</span> Guardando e imprimiendo...';
      }

      try {
        await guardarEspecificaciones(true);
      } catch (e) {
        console.error(e);
      } finally {
        if (printBtn) {
          printBtn.disabled = false;
          printBtn.innerHTML = '<span>🖨️</span> Imprimir / Guardar como PDF';
        }
        window.print();
      }
    }

    // Configurar interactividad al cargar la página
    document.addEventListener('DOMContentLoaded', () => {
      // Sincronizar inputs al inicio
      syncInputAttributes();

      // Manejo de chips de máquinas
      document.querySelectorAll('.spec-machine-chip').forEach(chip => {
        chip.addEventListener('click', (e) => {
          e.preventDefault();
          const checkbox = chip.querySelector('input[type="checkbox"]');
          const box = chip.querySelector('.chip-box');
          if (!checkbox) return;

          checkbox.checked = !checkbox.checked;
          if (checkbox.checked) {
            chip.classList.add('active');
            if (box) box.textContent = '☑';
          } else {
            chip.classList.remove('active');
            if (box) box.textContent = '☐';
          }

          // Debounce guardado automático
          clearTimeout(saveTimeout);
          saveTimeout = setTimeout(() => guardarEspecificaciones(false), 800);
        });
      });

      // Manejo de cambios en inputs de texto
      document.querySelectorAll('.spec-input').forEach(input => {
        input.addEventListener('input', () => {
          input.setAttribute('value', input.value);
          clearTimeout(saveTimeout);
          saveTimeout = setTimeout(() => guardarEspecificaciones(false), 1200);
        });

        input.addEventListener('blur', () => {
          input.setAttribute('value', input.value);
          clearTimeout(saveTimeout);
          guardarEspecificaciones(false);
        });
      });


      // Asegurar sincronización en atajo de teclado Ctrl+P
      window.addEventListener('beforeprint', () => {
        syncInputAttributes();
      });

      // Autoprint solo si fue expresamente solicitado con ?autoprint=1
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('autoprint') === '1') {
        setTimeout(() => {
          window.print();
        }, 600);
      }
    });
  </script>
</body>
</html>
