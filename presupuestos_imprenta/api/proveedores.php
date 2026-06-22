<?php
require_once 'config.php';

// ─── Asegurar tabla proveedores ────────────────────────────────────────────
$pdo->exec("CREATE TABLE IF NOT EXISTS proveedores (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    nombre      VARCHAR(100) NOT NULL,
    url         VARCHAR(255) NOT NULL,
    logo_url    VARCHAR(255) DEFAULT NULL,
    metodo      VARCHAR(50)  NOT NULL DEFAULT 'manual',
    activo      TINYINT(1)   NOT NULL DEFAULT 1,
    notas       TEXT         DEFAULT NULL,
    creado_en   TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
)");

// Insertar Sammel como proveedor predeterminado si la tabla está vacía
$count = $pdo->query("SELECT COUNT(*) FROM proveedores")->fetchColumn();
if ($count == 0) {
    $pdo->exec("INSERT INTO proveedores (nombre, url, logo_url, metodo, notas) VALUES
        ('Sammel', 'https://www.sammel.com.uy', 'https://www.sammel.com.uy/images/svg/sammel.svg', 'sammel', 'Importador mayorista de papel e insumos gráficos. +20 años en el mercado.'),
        ('Barley', 'https://barley.com.uy', NULL, 'manual', 'Boutique del Papel. Lista de precios en PDF. Contacto: ventas@barley.com.uy / +598 95 571 879'),
        ('PaperPlus', 'https://paperplus.com.uy', NULL, 'manual', 'Papel, rodillos, tintas y más. Contacto directo por WhatsApp.'),
        ('TodoPapel', 'https://todopapel.com.uy', NULL, 'manual', 'Distribuidora de papeles y productos gráficos.'),
        ('Urupaper', 'https://urupaper.com.uy', NULL, 'manual', 'Papel & celulosa. Tienda WooCommerce.')
    ");
}

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? 'list';

switch ($method) {

    // ─── LISTAR PROVEEDORES ──────────────────────────────────────────────────
    case 'GET':
        if ($action === 'list') {
            $stmt = $pdo->query("SELECT * FROM proveedores ORDER BY activo DESC, nombre ASC");
            sendJsonResponse(true, $stmt->fetchAll());
        }

        // ─── BUSCAR EN CATÁLOGO DE UN PROVEEDOR ───────────────────────────
        elseif ($action === 'buscar') {
            $idProveedor = intval($_GET['id'] ?? 0);
            $query       = trim($_GET['q'] ?? '');

            if (!$idProveedor) sendJsonResponse(false, null, 'ID de proveedor requerido');

            $prov = $pdo->prepare("SELECT * FROM proveedores WHERE id = ?");
            $prov->execute([$idProveedor]);
            $proveedor = $prov->fetch();

            if (!$proveedor) sendJsonResponse(false, null, 'Proveedor no encontrado');
            if (!$proveedor['activo']) sendJsonResponse(false, null, 'Proveedor inactivo');

            // Despachar al adaptador correspondiente
            switch ($proveedor['metodo']) {
                case 'sammel':
                    $results = buscarEnSammel($query);
                    foreach ($results as &$r) {
                        $r['proveedor'] = $proveedor['nombre'];
                    }
                    unset($r);
                    sendJsonResponse(true, $results);
                    break;

                default:
                    sendJsonResponse(false, null, 'Este proveedor no tiene búsqueda automática configurada. Contactalo directamente para obtener su lista de precios.');
            }
        }
        break;

    // ─── CREAR / ACTUALIZAR PROVEEDOR ────────────────────────────────────────
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        if (!$data) sendJsonResponse(false, null, 'Datos inválidos');

        if (!empty($data['id'])) {
            // UPDATE
            $stmt = $pdo->prepare("UPDATE proveedores SET nombre=?, url=?, logo_url=?, metodo=?, activo=?, notas=? WHERE id=?");
            $stmt->execute([
                $data['nombre'],
                $data['url'],
                $data['logo_url'] ?? null,
                $data['metodo'] ?? 'manual',
                isset($data['activo']) ? intval($data['activo']) : 1,
                $data['notas'] ?? null,
                $data['id']
            ]);
            sendJsonResponse(true, ['id' => $data['id']], 'Proveedor actualizado correctamente');
        } else {
            // INSERT
            if (empty($data['nombre']) || empty($data['url'])) {
                sendJsonResponse(false, null, 'Nombre y URL son requeridos');
            }
            $stmt = $pdo->prepare("INSERT INTO proveedores (nombre, url, logo_url, metodo, activo, notas) VALUES (?,?,?,?,?,?)");
            $stmt->execute([
                $data['nombre'],
                $data['url'],
                $data['logo_url'] ?? null,
                $data['metodo'] ?? 'manual',
                1,
                $data['notas'] ?? null
            ]);
            sendJsonResponse(true, ['id' => $pdo->lastInsertId()], 'Proveedor agregado correctamente');
        }
        break;

    // ─── ELIMINAR PROVEEDOR ───────────────────────────────────────────────────
    case 'DELETE':
        $id = intval($_GET['id'] ?? 0);
        if (!$id) sendJsonResponse(false, null, 'ID requerido');
        $pdo->prepare("DELETE FROM proveedores WHERE id=?")->execute([$id]);
        sendJsonResponse(true, null, 'Proveedor eliminado');
        break;

    default:
        sendJsonResponse(false, null, 'Método no soportado');
}

// ════════════════════════════════════════════════════════════════════════════
//  ADAPTADORES DE BÚSQUEDA POR PROVEEDOR
// ════════════════════════════════════════════════════════════════════════════

/**
 * Adaptador Sammel
 * Sammel embebe todos sus productos como JSON en el atributo :products="[...]"
 * del componente Vue <product-list> dentro del HTML estático de /products
 */
function buscarEnSammel(string $query): array
{
    $url = 'https://www.sammel.com.uy/products';
    if ($query !== '') {
        $url .= '?' . http_build_query(['q' => $query]);
    }

    $ctx = stream_context_create([
        'http' => [
            'timeout' => 15,
            'user_agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'header' => "Accept: text/html\r\n"
        ],
        'ssl' => [
            'verify_peer' => false,
            'verify_peer_name' => false
        ]
    ]);

    $html = @file_get_contents($url, false, $ctx);
    if ($html === false) {
        return [];
    }

    // Extraer el JSON del atributo :products="[...]"
    if (!preg_match('/:products="(\[.*?\])"/s', $html, $matches)) {
        return [];
    }

    $jsonRaw = html_entity_decode($matches[1], ENT_QUOTES | ENT_HTML5, 'UTF-8');
    $products = json_decode($jsonRaw, true);
    if (!is_array($products)) return [];

    // Normalizar al formato que necesita el frontend
    $results = [];
    foreach ($products as $p) {
        // Parsear medidas del formato "72X102" → ancho=72, largo=102
        $ancho = null;
        $largo = null;
        $sizeName = $p['size']['name'] ?? '';
        if (preg_match('/^([\d.]+)X([\d.]+)$/i', $sizeName, $sm)) {
            $ancho = floatval($sm[1]);
            $largo = floatval($sm[2]);
        }

        // Parsear gramaje "120 grs" → 120
        $gramaje = null;
        $weightName = $p['weight']['name'] ?? '';
        if (preg_match('/(\d+(?:\.\d+)?)/', $weightName, $wm)) {
            $gramaje = intval($wm[1]);
        }

        $results[] = [
            'codigo'      => $p['code'] ?? '',
            'nombre'      => ucwords(strtolower($p['title'] ?? '')),
            'descripcion' => $p['description'] ?? '',
            'tipo'        => normalizarTipo($p['type']['name'] ?? 'otro'),
            'tipo_label'  => $p['type']['name'] ?? '',
            'gramaje'     => $gramaje,
            'formato_str' => $sizeName,
            'ancho'       => $ancho,
            'largo'       => $largo,
            'marca'       => $p['brand']['name'] ?? '',
            'imagen'      => $p['image'] ? 'https://www.sammel.com.uy/' . $p['image'] : null,
            'stock'       => intval($p['stock'] ?? 0),
            'presentacion'=> $p['presentation'] ?? '',
            'proveedor'   => 'Sammel',
            'precio'      => floatval($p['price'] ?? 0),
        ];
    }

    return $results;
}

/**
 * Mapear tipo de Sammel al ENUM de insumos
 */
function normalizarTipo(string $tipo): string
{
    $tipo = strtolower($tipo);
    $mapa = [
        'offset'      => 'papel',
        'offset blanco' => 'papel',
        'offset color' => 'papel',
        'coteado'     => 'papel',
        'cartulina'   => 'papel',
        'adhesivo'    => 'papel',
        'packaging'   => 'papel',
        'papel kraft' => 'papel',
        'papel termico' => 'papel',
        'autocopiante' => 'papel',
        'plotter'     => 'papel',
        'opalina'     => 'papel',
        'carton'      => 'papel',
        'diario'      => 'papel',
        'papel editorial' => 'papel',
        'papeles especiales' => 'papel',
        'sobres'      => 'otro',
        'hot stamping' => 'otro',
        'fotopolimeros'=> 'chapa',
        'descartables' => 'otro',
    ];
    return $mapa[$tipo] ?? 'papel';
}
?>
