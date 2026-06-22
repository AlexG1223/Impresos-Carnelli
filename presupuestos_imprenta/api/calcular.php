<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method !== 'POST') {
    sendJsonResponse(false, null, "Método no soportado");
}

$data = json_decode(file_get_contents("php://input"), true);
if (!$data)
    sendJsonResponse(false, null, "Datos inválidos");

function calcularPresupuesto($pdo, $data, $cantidad_pedida) {
    $demasia_porcentaje    = floatval($data['demasia'] ?? 0);
    $papel_id              = intval($data['papel_id'] ?? 0);
    $colores               = max(0, intval($data['colores'] ?? 1));
    $frente_dorso          = $data['frente_dorso'] ?? 'no';
    $ruta_maquinas_ids     = $data['ruta_maquinas'] ?? [];
    $papel_cliente         = isset($data['papel_cliente']) && $data['papel_cliente'];

    $base_demasia = min($cantidad_pedida, 1000);
    $cantidad_produccion = ceil($cantidad_pedida + ($base_demasia * ($demasia_porcentaje / 100)));

    $usa_troquel = isset($data['usa_troquel']) ? $data['usa_troquel'] : false;

    if ($usa_troquel) {
        $ancho_final    = floatval($data['troquel_ancho'] ?? 0);
        $largo_final    = floatval($data['troquel_largo'] ?? 0);
        $troquel_bocas  = intval($data['troquel_bocas'] ?? 1);
        if ($troquel_bocas <= 0) $troquel_bocas = 1;
        $cantidad_elementos = ceil($cantidad_produccion / $troquel_bocas);
        $cantidad_elementos_pedida = ceil($cantidad_pedida / $troquel_bocas);
    } else {
        $ancho_final        = floatval($data['ancho'] ?? 0);
        $largo_final        = floatval($data['largo'] ?? 0);
        $cantidad_elementos = $cantidad_produccion;
        $cantidad_elementos_pedida = $cantidad_pedida;
    }

    // ── 0. INSUMO BASE (Sustrato / Papel) ──────────────────────────────────────
    $stmtPapel = $pdo->prepare("SELECT * FROM insumos WHERE id = ?");
    $stmtPapel->execute([$papel_id]);
    $papel = $stmtPapel->fetch();

    if (!$papel) {
        throw new Exception("Insumo base (Sustrato) no encontrado en la base de datos.");
    }

    $es_prenda = ($papel['tipo'] === 'prenda' || $papel['tipo'] === 'otro');

    if (!$es_prenda && ($ancho_final <= 0 || $largo_final <= 0)) {
        throw new Exception("Datos insuficientes (medidas faltantes para el esquema de corte).");
    }
    if ($cantidad_pedida <= 0 || $papel_id <= 0) {
        throw new Exception("Datos insuficientes (cantidad o sustrato faltante).");
    }
    if (empty($ruta_maquinas_ids) || !is_array($ruta_maquinas_ids)) {
        throw new Exception("Debe especificar una ruta de producción con al menos una máquina.");
    }

    $es_bobina       = ($papel['tipo'] === 'bobina');
    $bobina_engranaje = isset($data['bobina_engranaje']) && $data['bobina_engranaje'] ? intval($data['bobina_engranaje']) : 12;

    if ($es_bobina) {
        $p_ancho          = 41;
        $p_largo          = $bobina_engranaje * 2.54;
        $unidades_pqte    = 1;
        $costo_hoja_compra = 0;
    } else {
        $p_ancho           = floatval($papel['formato_ancho']);
        $p_largo           = floatval($papel['formato_largo']);
        $unidades_pqte     = max(1, intval($papel['unidades_por_paquete']));
        $costo_hoja_compra = floatval($papel['costo_unidad']) / $unidades_pqte;
    }

    // ── 1. MÁQUINAS EN RUTA ─────────────────────────────────────────────────────
    $ids_string  = implode(',', array_map('intval', $ruta_maquinas_ids));
    $stmtMaquinas = $pdo->query("SELECT * FROM maquinas WHERE id IN ($ids_string)");
    $maquinas_db = [];
    while ($row = $stmtMaquinas->fetch()) {
        $maquinas_db[$row['id']] = $row;
    }

    $ruta_nodos = [];
    foreach ($ruta_maquinas_ids as $id) {
        if (!isset($maquinas_db[$id])) {
            throw new Exception("La máquina con ID $id ya no existe o es inválida.");
        }
        $ruta_nodos[] = $maquinas_db[$id];
    }

    $maquina_principal = $ruta_nodos[0];
    $m_ancho = floatval($maquina_principal['formato_max_ancho']);
    $m_largo = floatval($maquina_principal['formato_max_largo']);
    $m_pinza = floatval($maquina_principal['medida_pinza']);

    if ($maquina_principal['tipo_calculo'] === 'rotativa') {
        $m_largo = 99999;
        if (!$es_bobina) {
            throw new Exception("Error: La máquina seleccionada es una Rotativa, por lo que debes seleccionar un sustrato de tipo Bobina.");
        }
    } else {
        if ($es_bobina) {
            throw new Exception("Error: Has seleccionado un sustrato de tipo Bobina, pero la máquina seleccionada no es Rotativa.");
        }
    }

    // ── 2. ALGORITMO OPTIMIZADO DE NESTING ────────────────────────────────────
    if ($es_prenda) {
        $mejor_opcion = [
            'cortes_por_hoja' => 1,
            'poses_pliego'    => 1,
            'util_ancho'      => $ancho_final,
            'util_largo'      => $largo_final,
            'pieza_w_real'    => $ancho_final,
            'pieza_h_real'    => $largo_final,
            'piezas_w'        => 1,
            'piezas_h'        => 1
        ];
        $corte_papel_metadata = ['ancho_pieza' => $ancho_final, 'largo_pieza' => $largo_final, 'columnas' => 1, 'filas' => 1];
    } else {
        $max_madre_opc1  = floor($p_ancho / $ancho_final) * floor($p_largo / $largo_final);
        $max_madre_opc2  = floor($p_ancho / $largo_final) * floor($p_largo / $ancho_final);
        $rotado_en_madre = ($max_madre_opc2 > $max_madre_opc1);

        $corte_papel_metadata = [
            'ancho_pieza' => $rotado_en_madre ? $largo_final : $ancho_final,
            'largo_pieza' => $rotado_en_madre ? $ancho_final : $largo_final,
            'columnas'    => $rotado_en_madre ? floor($p_ancho / $largo_final) : floor($p_ancho / $ancho_final),
            'filas'       => $rotado_en_madre ? floor($p_largo / $ancho_final) : floor($p_largo / $largo_final)
        ];

        if ($corte_papel_metadata['columnas'] <= 0 || $corte_papel_metadata['filas'] <= 0) {
            throw new Exception("La pieza solicitada es físicamente más grande que la hoja madre.");
        }

        $mejor_opcion      = null;
        $min_costo_temporal = PHP_INT_MAX;
        $max_cols_madre    = $corte_papel_metadata['columnas'];
        $max_filas_madre   = $corte_papel_metadata['filas'];
        $velocidad_maq     = max(1, floatval($maquina_principal['velocidad_por_hora'] ?? 5000));
        $costo_hr_maq      = floatval($maquina_principal['costo_hora'] ?? 0);

        for ($tile_w = 1; $tile_w <= $max_cols_madre; $tile_w++) {
            for ($tile_h = 1; $tile_h <= $max_filas_madre; $tile_h++) {
                $pliego_w = $tile_w * $corte_papel_metadata['ancho_pieza'];
                $pliego_h = $tile_h * $corte_papel_metadata['largo_pieza'];

                $m_largo_util  = $m_largo - $m_pinza;
                $entra_normal  = ($pliego_w <= $m_ancho && $pliego_h <= $m_largo_util);
                $entra_torcido = ($pliego_h <= $m_ancho && $pliego_w <= $m_largo_util);

                if ($entra_normal || $entra_torcido) {
                    $poses_en_pliego        = $tile_w * $tile_h;
                    $pliegos_necesarios     = ceil($cantidad_elementos / $poses_en_pliego);
                    $pliegos_por_hoja_rectos  = floor($max_cols_madre / $tile_w) * floor($max_filas_madre / $tile_h);
                    $pliegos_por_hoja_girados = floor($p_ancho / $pliego_h) * floor($p_largo / $pliego_w);
                    $pliegos_por_hoja       = max($pliegos_por_hoja_rectos, $pliegos_por_hoja_girados);

                    if ($pliegos_por_hoja > 0) {
                        $hojas_necesarias_test = ceil($pliegos_necesarios / $pliegos_por_hoja);
                        $costo_papel_test      = $hojas_necesarias_test * $costo_hoja_compra;
                        $horas_test            = $pliegos_necesarios / $velocidad_maq;
                        $costo_imp_test        = ($pliegos_necesarios / 1000) * $costo_hr_maq;
                        $costo_total_test      = $costo_papel_test + $costo_imp_test;

                        if ($costo_total_test < $min_costo_temporal) {
                            $min_costo_temporal = $costo_total_test;
                            $rotar_en_maq = !$entra_normal && $entra_torcido;
                            $mejor_opcion = [
                                'pliego_w'      => $rotar_en_maq ? $pliego_h : $pliego_w,
                                'pliego_h'      => $rotar_en_maq ? $pliego_w : $pliego_h,
                                'poses_pliego'  => $poses_en_pliego,
                                'piezas_w'      => $rotar_en_maq ? $tile_h : $tile_w,
                                'piezas_h'      => $rotar_en_maq ? $tile_w : $tile_h,
                                'pieza_w_real'  => $rotar_en_maq ? $corte_papel_metadata['largo_pieza'] : $corte_papel_metadata['ancho_pieza'],
                                'pieza_h_real'  => $rotar_en_maq ? $corte_papel_metadata['ancho_pieza'] : $corte_papel_metadata['largo_pieza'],
                                'cortes_por_hoja' => $pliegos_por_hoja,
                                'util_ancho'    => $rotar_en_maq ? $pliego_h : $pliego_w,
                                'util_largo'    => $rotar_en_maq ? $pliego_w : $pliego_h
                            ];
                        }
                    }
                }
            }
        }

        if (!$mejor_opcion) {
            throw new Exception("Error matemático: El trabajo de $ancho_final x $largo_final compuesto no entra en los límites de la máquina ($m_ancho x $m_largo).");
        }
    }

    $cortes_por_hoja = $mejor_opcion['cortes_por_hoja'];
    $poses           = $mejor_opcion['poses_pliego'];
    $util_ancho      = $mejor_opcion['util_ancho'];
    $util_largo      = $mejor_opcion['util_largo'];

    $poses_metadata = [
        'ancho_pieza' => $mejor_opcion['pieza_w_real'],
        'largo_pieza' => $mejor_opcion['pieza_h_real'],
        'columnas'    => $mejor_opcion['piezas_w'],
        'filas'       => $mejor_opcion['piezas_h']
    ];

    // ── 3. COSTO DE PAPEL / SUSTRATO ────────────────────────────────────────────
    $pliegos_necesarios_offset = ceil($cantidad_elementos / $poses);
    $pliegos_necesarios_offset_pedida = ceil($cantidad_elementos_pedida / $poses);

    $kilos_gastados = 0;
    $kilos_gastados_pedida = 0;
    if ($es_bobina) {
        $hojas_necesarias = $pliegos_necesarios_offset;
        $kilos_gastados   = ($hojas_necesarias / 1000) * ($bobina_engranaje / 12) * floatval($papel['kg_1000']);
        
        $hojas_necesarias_pedida = $pliegos_necesarios_offset_pedida;
        $kilos_gastados_pedida   = ($hojas_necesarias_pedida / 1000) * ($bobina_engranaje / 12) * floatval($papel['kg_1000']);
        $costo_papel      = $kilos_gastados_pedida * floatval($papel['costo_unidad']);
    } else if ($es_prenda) {
        $hojas_necesarias = ceil($pliegos_necesarios_offset / $cortes_por_hoja);
        
        $hojas_necesarias_pedida = ceil($pliegos_necesarios_offset_pedida / $cortes_por_hoja);
        $costo_papel      = $hojas_necesarias_pedida * $costo_hoja_compra;
    } else {
        // Cargar formatos de todas las máquinas para evaluar sobrantes
        $stmtTodasMaquinas = $pdo->query("SELECT nombre, formato_min_ancho, formato_min_largo FROM maquinas");
        $todas_maquinas = $stmtTodasMaquinas->fetchAll();

        // Obtener dimensiones reales del pliego
        $pliego_w = floatval($mejor_opcion['pliego_w'] ?? $util_ancho);
        $pliego_h = floatval($mejor_opcion['pliego_h'] ?? $util_largo);

        // Guardas de seguridad para evitar división por cero
        if ($pliego_w <= 0) $pliego_w = $p_ancho;
        if ($pliego_h <= 0) $pliego_h = $p_largo;

        // 1. Verificar si el pliego es reutilizable
        $pliego_reutilizable = false;
        foreach ($todas_maquinas as $maq) {
            if (stripos($maq['nombre'], 'guillotina') !== false) continue;
            $min_w = floatval($maq['formato_min_ancho']);
            $min_h = floatval($maq['formato_min_largo']);
            if (($pliego_w >= $min_w && $pliego_h >= $min_h) || ($pliego_w >= $min_h && $pliego_h >= $min_w)) {
                $pliego_reutilizable = true;
                break;
            }
        }

        // 2. Calcular tiras sobrantes verticales y horizontales
        $cols_rectos = floor($p_ancho / $pliego_w);
        $rows_rectos = floor($p_largo / $pliego_h);
        $pliegos_rectos = $cols_rectos * $rows_rectos;

        $cols_girados = floor($p_ancho / $pliego_h);
        $rows_girados = floor($p_largo / $pliego_w);
        $pliegos_girados = $cols_girados * $rows_girados;

        if ($pliegos_girados > $pliegos_rectos) {
            $cols = $cols_girados;
            $rows = $rows_girados;
            $w_sob = $p_ancho - ($cols * $pliego_h);
            $h_sob = $p_largo - ($rows * $pliego_w);
        } else {
            $cols = $cols_rectos;
            $rows = $rows_rectos;
            $w_sob = $p_ancho - ($cols * $pliego_w);
            $h_sob = $p_largo - ($rows * $pliego_h);
        }

        // Tira 1 (vertical) y Tira 2 (horizontal)
        $tiras_reutilizables = false;
        foreach ($todas_maquinas as $maq) {
            if (stripos($maq['nombre'], 'guillotina') !== false) continue;
            $min_w = floatval($maq['formato_min_ancho']);
            $min_h = floatval($maq['formato_min_largo']);
            
            $tira1_ok = ($w_sob >= $min_w && $p_largo >= $min_h) || ($w_sob >= $min_h && $p_largo >= $min_w);
            $tira2_ok = ($p_ancho >= $min_w && $h_sob >= $min_h) || ($p_ancho >= $min_h && $h_sob >= $min_w);
            
            if (($w_sob > 0 && $tira1_ok) || ($h_sob > 0 && $tira2_ok)) {
                $tiras_reutilizables = true;
                break;
            }
        }

        $hojas_necesarias = ceil($pliegos_necesarios_offset / $cortes_por_hoja);
        $hojas_necesarias_pedida = ceil($pliegos_necesarios_offset_pedida / $cortes_por_hoja);

        // 3. Aplicar cobro según reutilización
        if ($pliego_reutilizable && $tiras_reutilizables) {
            // Caso A: Cobro por área exacta
            $area_hoja = $p_ancho * $p_largo;
            $area_pliego = $pliego_w * $pliego_h;
            if ($area_hoja > 0) {
                $costo_papel = $pliegos_necesarios_offset_pedida * ($area_pliego / $area_hoja) * $costo_hoja_compra;
            } else {
                $costo_papel = $hojas_necesarias_pedida * $costo_hoja_compra;
            }
        } else if ($pliego_reutilizable) {
            // Caso B: Cobro por pliegos exactos
            if ($cortes_por_hoja > 0) {
                $costo_papel = $pliegos_necesarios_offset_pedida * ($costo_hoja_compra / $cortes_por_hoja);
            } else {
                $costo_papel = $hojas_necesarias_pedida * $costo_hoja_compra;
            }
        } else {
            // Caso C: Cobro de hoja madre completa
            $costo_papel = $hojas_necesarias_pedida * $costo_hoja_compra;
        }
    }

    // Sobrescribir si el papel es aportado por el cliente
    if ($papel_cliente) {
        $costo_papel = 0;
    }

    // ── 4. ALERTA DE STOCK ──────────────────────────────────────────────────────
    $stock_warning = null;
    $stock_actual  = isset($papel['stock_actual']) ? floatval($papel['stock_actual']) : 0;

    if (!$papel_cliente) {
        if ($es_bobina) {
            if ($kilos_gastados > $stock_actual) {
                $stock_warning = "¡Stock insuficiente! Tienes " . number_format($stock_actual, 2) . " Kg de {$papel['nombre']}, pero el trabajo requiere " . number_format($kilos_gastados, 2) . " Kg. Debes encargar más material.";
            }
        } else {
            if ($hojas_necesarias > $stock_actual) {
                $unidad        = $es_prenda ? "unidades" : "hojas";
                $stock_warning = "¡Stock insuficiente! Tienes $stock_actual $unidad de {$papel['nombre']}, pero el trabajo requiere $hojas_necesarias $unidad. Debes encargar más material.";
            }
        }
    }

    // ── 5. COSTO DE PRODUCCIÓN (Ruta de Máquinas) ───────────────────────────────
    $costo_produccion_total = 0;
    $costo_puesta_total     = 0;
    $costo_impresion_variable = 0;
    $horas_totales          = 0;
    $nombres_secuencia      = [];

    foreach ($ruta_nodos as $idx => $maq) {
        $velocidad     = floatval($maq['velocidad_por_hora'] ?? 5000);
        if ($velocidad <= 0) $velocidad = 5000;

        $costo_millar  = floatval($maq['costo_hora']);     // Campo "costo_hora" = costo x millar
        $costo_puesta  = floatval($maq['costo_puesta'] ?? 0);
        $tipo_calculo  = $maq['tipo_calculo'] ?? 'millares';

        if ($idx === 0 && $colores > 0) {
            // ── MÁQUINA PRINCIPAL (Impresora) ───────────────────────────────
            $cantidad_base_prod = $pliegos_necesarios_offset;
            $cantidad_base_ped  = ceil($cantidad_elementos_pedida / $poses);

            if ($tipo_calculo === 'unidades') {
                if ($frente_dorso === 'si' && !$es_bobina) {
                    $pasadas_total    = $colores * 2;                // colores × 2 caras
                    $cantidad_cobro_prod = $cantidad_base_prod * 2;
                    $cantidad_cobro_ped  = $cantidad_base_ped * 2;
                } else {
                    $pasadas_total    = $colores;
                    $cantidad_cobro_prod = $cantidad_base_prod;
                    $cantidad_cobro_ped  = $cantidad_base_ped;
                }
                $tiempo_hr     = ($cantidad_cobro_prod / $velocidad) * $pasadas_total;
                $costo_fijo    = $costo_puesta * $pasadas_total;    // Puesta por cada pasada de color/cara
                $costo_variable = $cantidad_cobro_ped * $costo_millar * $pasadas_total;

            } else {
                if ($frente_dorso === 'si' && !$es_bobina) {
                    $cantidad_cobro_prod  = $cantidad_base_prod * 2;   // Doble de pliegos (2 pasadas)
                    $cantidad_cobro_ped   = $cantidad_base_ped * 2;
                    $costo_fijo      = $costo_puesta * $colores * 2;   // Borde cara/color
                } else {
                    $cantidad_cobro_prod  = $cantidad_base_prod;
                    $cantidad_cobro_ped   = $cantidad_base_ped;
                    $costo_fijo      = $costo_puesta * $colores;       // Puesta por color
                }
                $tiempo_hr      = $cantidad_cobro_prod / $velocidad;
                $costo_variable = ($cantidad_cobro_ped / 1000) * $costo_millar * $colores;
            }

        } else {
            // ── MÁQUINAS POST-PROCESO ───────────────────────────────────────
            $cantidad_cobro_prod  = $cantidad_elementos;
            $cantidad_cobro_ped   = $cantidad_elementos_pedida;
            $tiempo_hr       = $cantidad_cobro_prod / $velocidad;
            $costo_fijo      = $costo_puesta;
            if ($tipo_calculo === 'unidades') {
                $costo_variable  = $cantidad_cobro_ped * $costo_millar;
            } else {
                $costo_variable  = ($cantidad_cobro_ped / 1000) * $costo_millar;
            }
        }

        $costo_paso = $costo_variable + $costo_fijo;

        $horas_totales            += $tiempo_hr;
        $costo_produccion_total   += $costo_paso;
        $costo_puesta_total       += $costo_fijo;
        $costo_impresion_variable += $costo_variable;
        $nombres_secuencia[]       = $maq['nombre'];
    }

    // ── 6. COSTO TOTAL BASE ──────────────────────────────────────────────────────
    if ($es_prenda) {
        $costo_total = $costo_produccion_total;
    } else {
        $costo_total = $costo_produccion_total + $costo_papel;
    }

    // ── 7. LÓGICA COMERCIAL ──────────────────────────────────────────────────────
    $p_ganancia = floatval($data['ganancia'] ?? 0);
    $p_comision = floatval($data['comision'] ?? 0);
    $p_iva      = floatval($data['iva'] ?? 0);

    $costo_puesta_r    = round($costo_puesta_total);
    $costo_impresion_r = round($costo_impresion_variable);
    $costo_papel_r     = round($costo_papel);

    if ($es_prenda) {
        $costo_base_calculo = $costo_puesta_r + $costo_impresion_r;
    } else {
        $costo_base_calculo = $costo_puesta_r + $costo_impresion_r + $costo_papel_r;
    }

    $ganancia_valor = round($costo_base_calculo * ($p_ganancia / 100));
    $venta_base     = $costo_base_calculo + $ganancia_valor;

    $es_revendedor = isset($data['es_revendedor']) && $data['es_revendedor'];
    $descuento_revendedor = 0;

    if ($es_revendedor) {
        $descuento_revendedor = round($venta_base * 0.10);
        $comision_valor = round($venta_base * ($p_comision / 100) * 0.5);
        $subtotal_venta = $venta_base - $descuento_revendedor + $comision_valor;
    } else {
        $comision_valor = round($venta_base * ($p_comision / 100));
        $subtotal_venta = $venta_base + $comision_valor;
    }

    if ($es_prenda) {
        $subtotal_venta += $costo_papel_r;
    }

    $precio_final = round($subtotal_venta * (1 + $p_iva / 100));
    $iva_valor    = $precio_final - $subtotal_venta;

    $p_nombre_final = $papel['nombre'] . ($papel['gramaje'] ? ' ' . $papel['gramaje'] . 'g' : '');

    return [
        'maquina_nombre'           => implode(' ➔ ', $nombres_secuencia),
        'papel_nombre'             => $p_nombre_final,
        'colores'                  => $colores,
        'frente_dorso'             => $frente_dorso,
        'poses_por_pliego'         => $poses,
        'pliegos_necesarios'       => $pliegos_necesarios_offset,
        'horas_estimadas'          => round($horas_totales, 2),
        'costo_papel'              => $costo_papel_r,
        'costo_impresion'          => $costo_puesta_r + $costo_impresion_r,
        'costo_puesta_total'       => $costo_puesta_r,
        'costo_impresion_variable' => $costo_impresion_r,
        'costo_estimado'           => $costo_puesta_r + $costo_impresion_r + $costo_papel_r,
        'ganancia_valor'           => $ganancia_valor,
        'comision_valor'           => $comision_valor,
        'descuento_revendedor'     => $descuento_revendedor,
        'subtotal_venta'           => $subtotal_venta,
        'iva_valor'                => $iva_valor,
        'precio_final'             => $precio_final,
        'stock_warning'            => $stock_warning,
        'es_bobina'                => $es_bobina,
        'kilos_gastados'           => $es_bobina ? $kilos_gastados_pedida : 0,
        'diagrama_datos'           => [
            'papel_madre'    => ['ancho' => $p_ancho,    'largo' => $p_largo],
            'corte_madre'    => $corte_papel_metadata,
            'pliego_maquina' => ['ancho' => $util_ancho, 'largo' => $util_largo, 'pinza' => $m_pinza],
            'poses_pliego'   => $poses_metadata,
            'final'          => ['ancho' => $ancho_final, 'largo' => $largo_final]
        ]
    ];
}

try {
    $cantidad_pedida = intval($data['cantidad'] ?? 0);

    if (isset($data['cantidades']) && is_array($data['cantidades'])) {
        $respuestas = [];
        foreach ($data['cantidades'] as $qty) {
            try {
                $calc = calcularPresupuesto($pdo, $data, intval($qty));
                $respuestas[$qty] = [
                    'success' => true,
                    'data' => $calc
                ];
            } catch (Exception $e) {
                $respuestas[$qty] = [
                    'success' => false,
                    'message' => $e->getMessage()
                ];
            }
        }

        // Calcular principal
        $principal = calcularPresupuesto($pdo, $data, $cantidad_pedida);

        sendJsonResponse(true, [
            'principal' => $principal,
            'alternativas' => $respuestas
        ], "Cálculos por lote completados");
    } else {
        $principal = calcularPresupuesto($pdo, $data, $cantidad_pedida);
        
        // Mantener comportamiento legacy de enviar respuesta directa
        sendJsonResponse(true, $principal, "Cálculo multinodo realizado exitosamente");
    }
} catch (Exception $e) {
    sendJsonResponse(false, null, $e->getMessage());
}
?>