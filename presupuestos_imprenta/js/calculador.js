let rutaTrabajo = [];
let todasLasMaquinas = [];
let troquelesDisponibles = [];
let lastCalculatedData = null;

document.addEventListener('DOMContentLoaded', async () => {
    // Cargar dependencias en paralelo
    await Promise.all([
        cargarPapeles(),
        cargarMaquinasList(),
        cargarTroquelesList(),
        cargarParametrosIniciales(),
        cargarEventosComerciales()
    ]);

    // Verificar si se solicitó clonar un presupuesto desde el historial
    intentarClonarPresupuesto();

    // listener for add button removed, replaced by checkbox toggles

    document.getElementById('c_papel').addEventListener('change', (e) => {
        const option = e.target.options[e.target.selectedIndex];
        const isPrenda = option && (option.dataset.tipo === 'prenda' || option.dataset.tipo === 'otro');
        const isBobina = option && option.dataset.tipo === 'bobina';
        const isTroquel = document.getElementById('c_troquel_select').value !== "";

        if (isPrenda) {
            document.getElementById('c_ancho').required = false;
            document.getElementById('c_largo').required = false;
        } else if (!isTroquel) {
            document.getElementById('c_ancho').required = true;
            document.getElementById('c_largo').required = true;
        }

        document.getElementById('grupo_bobina_engranaje').style.display = isBobina ? 'block' : 'none';
        if (isBobina) sugerirEngranajeBobina();
    });

    ['c_ancho', 'c_largo'].forEach(id => {
        document.getElementById(id).addEventListener('input', () => {
            const option = document.getElementById('c_papel').options[document.getElementById('c_papel').selectedIndex];
            if (option && option.dataset.tipo === 'bobina') {
                sugerirEngranajeBobina();
            }
        });
    });

    document.getElementById('c_troquel_select').addEventListener('change', (e) => {
        const val = e.target.value;
        const estandar = document.getElementById('grupo_dimensiones_estandar');
        const troquel = document.getElementById('grupo_dimensiones_troquel');
        
        const isPrenda = (() => {
            const opt = document.getElementById('c_papel').options[document.getElementById('c_papel').selectedIndex];
            return opt && (opt.dataset.tipo === 'prenda' || opt.dataset.tipo === 'otro');
        })();

        if (!val) {
            // "Ninguno" seleccionado
            estandar.style.display = 'flex';
            troquel.style.display = 'none';
            document.getElementById('c_ancho').required = !isPrenda;
            document.getElementById('c_largo').required = !isPrenda;

            document.getElementById('c_troquel_ancho').value = "";
            document.getElementById('c_troquel_largo').value = "";
            document.getElementById('c_troquel_bocas').value = "";
        } else {
            // Un troquel fue seleccionado
            estandar.style.display = 'none';
            troquel.style.display = 'block';
            document.getElementById('c_ancho').required = false;
            document.getElementById('c_largo').required = false;

            const t = troquelesDisponibles.find(x => x.id == val);
            if (t) {
                document.getElementById('c_troquel_ancho').value = t.ancho;
                document.getElementById('c_troquel_largo').value = t.largo;
                document.getElementById('c_troquel_bocas').value = t.bocas;
            }
        }
    });

    document.getElementById('form-calculador').addEventListener('submit', async (e) => {
        e.preventDefault();

        if (rutaTrabajo.length === 0) {
            alert("Debe agregar al menos una máquina a la ruta de producción.");
            return;
        }

        const topBar = document.getElementById('top-loading-bar');
        if (topBar) {
            topBar.style.opacity = '1';
            topBar.style.width = '15%';
        }

        const cantidadesStandard = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 15000, 20000, 30000];

        const data = {
            usa_troquel: document.getElementById('c_troquel_select').value !== "",
            ancho: document.getElementById('c_ancho').value,
            largo: document.getElementById('c_largo').value,
            troquel_ancho: document.getElementById('c_troquel_ancho').value,
            troquel_largo: document.getElementById('c_troquel_largo').value,
            troquel_bocas: document.getElementById('c_troquel_bocas').value,
            cantidad: document.getElementById('c_cantidad').value,
            demasia: document.getElementById('c_demasia').value,
            ganancia: document.getElementById('c_ganancia').value,
            comision: document.getElementById('c_comision').value,
            iva: document.getElementById('c_iva').value,
            papel_id: document.getElementById('c_papel').value,
            colores: document.getElementById('c_colores').value,
            frente_dorso: document.getElementById('c_frente_dorso').value,
            ruta_maquinas: rutaTrabajo.map(m => m.id),
            bobina_engranaje: document.getElementById('grupo_bobina_engranaje').style.display !== 'none' ? document.getElementById('c_bobina_engranaje').value : null,
            es_revendedor: document.getElementById('c_revendedor').checked,
            papel_cliente: document.getElementById('c_papel_cliente').checked,
            cantidades: cantidadesStandard
        };

        try {
            const res = await fetch('api/calcular.php', {
                method: 'POST',
                body: JSON.stringify(data)
            });

            if (topBar) {
                topBar.style.width = '50%';
            }

            const result = await res.json();

            const resultBox = document.getElementById('result-box');
            const errorBox = document.getElementById('error-box');

            if (result.success) {
                errorBox.style.display = 'none';
                resultBox.classList.add('visible');

                // Soporte para formato lote y formato legacy
                const principalData = result.data.principal ? result.data.principal : result.data;
                const alternativasMap = result.data.alternativas ? result.data.alternativas : null;

                const warningBox = document.getElementById('stock-warning-box');
                const warningText = document.getElementById('stock-warning-text');
                if (principalData.stock_warning) {
                    warningText.innerText = principalData.stock_warning;
                    warningBox.style.display = 'block';
                } else {
                    warningBox.style.display = 'none';
                }

                lastCalculatedData = principalData;
                lastCalculatedData.descripcion = document.getElementById('c_desc').value;
                lastCalculatedData.cantidad = document.getElementById('c_cantidad').value;
                const req = principalData;
                
                // Determinar el texto del Formato Final inteligentemente
                let textoFormatoFinal = document.getElementById('c_ancho').value + ' x ' + document.getElementById('c_largo').value + ' cm';
                if (!document.getElementById('c_ancho').value || document.getElementById('c_ancho').value === "") {
                    // Si se usó troquel (o prenda), no hay ancho/largo estándar digitado.
                    // Usaremos el nombre seleccionado del troquel o la descripción del trabajo.
                    const selTroquel = document.getElementById('c_troquel_select');
                    if (selTroquel && selTroquel.value !== "") {
                        textoFormatoFinal = "Troquelado (" + document.getElementById('c_desc').value + ")";
                    } else {
                        textoFormatoFinal = "Variable / Según descripción";
                    }
                }

                // Armar global para PDF
                window.ultimoResultadoCalculo = Object.assign({}, req, {
                    cliente: document.getElementById('c_cliente').value,
                    descripcion: document.getElementById('c_desc').value,
                    cantidad: document.getElementById('c_cantidad').value,
                    detalle_tintas: document.getElementById('c_detalle_tintas').value,
                    formato_final: textoFormatoFinal
                });

                document.getElementById('save-box').style.display = 'flex';
                document.getElementById('btn-guardar-presupuesto').disabled = false;
                document.getElementById('btn-guardar-presupuesto').innerHTML = '<i data-feather="save"></i> Guardar Presupuesto';
                document.getElementById('btn-guardar-presupuesto').style.background = '#10b981';
                if (window.feather) feather.replace();

                document.getElementById('r_maquina').innerText = req.maquina_nombre;
                document.getElementById('r_poses').innerText = req.poses_por_pliego;
                
                if (req.es_bobina) {
                    document.getElementById('lbl_r_pliegos').innerText = "Avances (Planchas)";
                    document.getElementById('r_costo_papel').innerText = `Bobina (${req.kilos_gastados.toFixed(2)} Kg): $` + req.costo_papel.toLocaleString('es-AR', { maximumFractionDigits: 0 });
                } else {
                    document.getElementById('lbl_r_pliegos').innerText = "Pliegos Necesarios";
                    document.getElementById('r_costo_papel').innerText = 'Papel: $' + req.costo_papel.toLocaleString('es-AR', { maximumFractionDigits: 0 });
                }
                
                document.getElementById('r_pliegos').innerText = req.pliegos_necesarios;
                document.getElementById('r_tiempo').innerText = req.horas_estimadas + ' hr';
                document.getElementById('r_costo_imp').innerText = 'Producción: $' + req.costo_impresion.toLocaleString('es-AR', { maximumFractionDigits: 0 });

                // Comercial breakdown
                document.getElementById('r_costo_puestas').innerText = '$' + req.costo_puesta_total.toLocaleString('es-AR', { maximumFractionDigits: 0 });
                document.getElementById('r_costo_impresion').innerText = '$' + req.costo_impresion_variable.toLocaleString('es-AR', { maximumFractionDigits: 0 });
                document.getElementById('r_costo_papel_desglose').innerText = '$' + req.costo_papel.toLocaleString('es-AR', { maximumFractionDigits: 0 });

                const revContainer = document.getElementById('r_revendedor_container');
                if (req.descuento_revendedor > 0) {
                    revContainer.style.display = 'flex';
                    document.getElementById('r_revendedor_descuento').innerText = '-$' + req.descuento_revendedor.toLocaleString('es-AR', { maximumFractionDigits: 0 });
                } else {
                    revContainer.style.display = 'none';
                }

                document.getElementById('r_ganancia_valor').innerText = '$' + req.ganancia_valor.toLocaleString('es-AR', { maximumFractionDigits: 0 });
                document.getElementById('r_comision_valor').innerText = '$' + req.comision_valor.toLocaleString('es-AR', { maximumFractionDigits: 0 });
                document.getElementById('r_subtotal_venta').innerText = '$' + req.subtotal_venta.toLocaleString('es-AR', { maximumFractionDigits: 0 });
                document.getElementById('r_iva_valor').innerText = '$' + req.iva_valor.toLocaleString('es-AR', { maximumFractionDigits: 0 });
                document.getElementById('r_precio_final').innerText = '$' + req.precio_final.toLocaleString('es-AR', { maximumFractionDigits: 0 });

                // Dibujar diagramas
                if (req.diagrama_datos) {
                    document.getElementById('diagramas-container').style.display = 'block';
                    const dd = req.diagrama_datos;

                    dibujarDiagramaDeCorte(
                        'canvas-corte-madre',
                        dd.papel_madre.ancho, dd.papel_madre.largo,
                        dd.corte_madre.ancho_pieza, dd.corte_madre.largo_pieza,
                        dd.corte_madre.filas, dd.corte_madre.columnas,
                        "Hoja Madre"
                    );

                    dibujarDiagramaDeCorte(
                        'canvas-poses-pliego',
                        dd.pliego_maquina.ancho, dd.pliego_maquina.largo,
                        dd.poses_pliego.ancho_pieza, dd.poses_pliego.largo_pieza,
                        dd.poses_pliego.filas, dd.poses_pliego.columnas,
                        "Pliego Máquina"
                    );
                } else {
                    document.getElementById('diagramas-container').style.display = 'none';
                }

                if (typeof feather !== 'undefined') feather.replace();

                // Lógica de Alternativas de Cantidad Automáticas
                const altsContainer = document.getElementById('alternativas-container');
                const altsLista = document.getElementById('alternativas-lista');
                
                if (topBar) {
                    topBar.style.width = '100%';
                    setTimeout(() => {
                        topBar.style.opacity = '0';
                        setTimeout(() => { topBar.style.width = '0%'; }, 300);
                    }, 200);
                }

                if (alternativasMap) {
                    altsLista.innerHTML = '';
                    altsContainer.style.display = 'block';
                    
                    const formatterAlt = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 });
                    const formatterUnit = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    
                    window.alternativasCalculadas = {};
                    
                    Object.keys(alternativasMap).forEach(cant => {
                        const item = alternativasMap[cant];
                        if (item.success) {
                            const rData = item.data;
                            window.alternativasCalculadas[cant] = rData;
                            
                            const unitario = rData.precio_final / cant;
                            
                            const div = document.createElement('div');
                            div.className = 'alt-card';
                            div.dataset.cantidad = cant;
                            div.innerHTML = `
                                <span class="alt-chk-container"></span>
                                <div style="font-size: 0.85rem; color: #cbd5e1; text-transform: uppercase; font-weight: 600;">${cant} u.</div>
                                <div style="font-size: 1.15rem; font-weight: bold; color: white; margin: 4px 0;">${formatterAlt.format(rData.precio_final)}</div>
                                <div style="font-size: 0.8rem; color: #a3e635; font-weight: 500;">${formatterUnit.format(unitario)} c/u</div>
                            `;
                            
                            div.addEventListener('click', () => {
                                div.classList.toggle('selected');
                                actualizarSeleccionAlternativas();
                            });
                            
                            altsLista.appendChild(div);
                        }
                    });
                    
                    actualizarSeleccionAlternativas();
                    
                    if (altsLista.innerHTML === '') altsContainer.style.display = 'none';
                } else {
                    altsContainer.style.display = 'none';
                }

            } else {
                if (topBar) {
                    topBar.style.width = '100%';
                    setTimeout(() => {
                        topBar.style.opacity = '0';
                        setTimeout(() => { topBar.style.width = '0%'; }, 300);
                    }, 200);
                }
                resultBox.classList.remove('visible');
                errorBox.style.display = 'block';
                errorBox.innerText = result.message;
            }
        } catch (e) {
            if (topBar) {
                topBar.style.width = '100%';
                setTimeout(() => {
                    topBar.style.opacity = '0';
                    setTimeout(() => { topBar.style.width = '0%'; }, 300);
                }, 200);
            }
            console.error("Error al procesar el presupuesto:", e);
            document.getElementById('result-box').classList.remove('visible');
            const errorBox = document.getElementById('error-box');
            errorBox.style.display = 'block';
            errorBox.innerText = "Error de comunicación con el servidor. Revisá las medidas o actualizá la página.";
        }
    });

    const btnGuardar = document.getElementById('btn-guardar-presupuesto');
    if (btnGuardar) {
        btnGuardar.addEventListener('click', guardarPresupuesto);
    }

    const btnGuardarSel = document.getElementById('btn-guardar-seleccionados');
    if (btnGuardarSel) {
        btnGuardarSel.addEventListener('click', guardarSeleccionados);
    }

    const btnCompartir = document.getElementById('btn-compartir-whatsapp');
    if (btnCompartir) {
        btnCompartir.addEventListener('click', compartirWhatsApp);
    }
});

function intentarClonarPresupuesto() {
    const dataStr = sessionStorage.getItem('clonarPresupuestoData');
    if (!dataStr) return;
    
    try {
        const p = JSON.parse(dataStr);
        sessionStorage.removeItem('clonarPresupuestoData'); // limpiar la orden
        
        let jd = {};
        if (p.datos_json) {
            try { jd = JSON.parse(p.datos_json); } catch(e){}
        }

        document.getElementById('c_cliente').value = p.cliente || '';
        document.getElementById('c_desc').value = p.descripcion || '';
        document.getElementById('c_cantidad').value = p.cantidad || '';
        document.getElementById('c_colores').value = (jd.colores !== undefined && jd.colores !== null) ? jd.colores : 1;
        document.getElementById('c_frente_dorso').value = jd.frente_dorso || 'no';
        document.getElementById('c_detalle_tintas').value = jd.detalle_tintas || '';
        
        // Recuperar estructura completa y original pre-calculus
        if (jd.original_form) {
            const of = jd.original_form;
            
            document.getElementById('c_papel').value = of.papel_id || '';
            document.getElementById('c_papel').dispatchEvent(new Event('change')); 
            
            document.getElementById('c_papel_cliente').checked = of.papel_cliente || false;
            
            document.getElementById('c_troquel_select').value = of.troquel_id || '';
            document.getElementById('c_troquel_select').dispatchEvent(new Event('change'));
            
            document.getElementById('c_ancho').value = of.ancho || '';
            document.getElementById('c_largo').value = of.largo || '';
            document.getElementById('c_demasia').value = of.demasia || 10;
            
            if (of.ruta_maquinas && Array.isArray(of.ruta_maquinas)) {
                // Restablecer panel visual e identificar IDs reales
                rutaTrabajo = [];
                document.querySelectorAll('#maquinas_checkboxes input[type="checkbox"]').forEach(cb => cb.checked = false);
                
                of.ruta_maquinas.forEach(maq => {
                    const cb = document.querySelector(`#maquinas_checkboxes input[value="${maq.id}"]`);
                    if (cb) {
                        cb.checked = true;
                        rutaTrabajo.push({ id: maq.id, nombre: maq.nombre });
                    }
                });
                renderRuta();
            }
        } else {
             // Fallback minimalista para presupuestos viejos pre-clonador
             if (jd.diagrama_datos && jd.diagrama_datos.final) {
                 document.getElementById('c_ancho').value = jd.diagrama_datos.final.ancho;
                 document.getElementById('c_largo').value = jd.diagrama_datos.final.largo;
             }
        }
        
    } catch(err) {
        console.error("Error procesando solicitud de clonación:", err);
    }
}

window.insumosDisponibles = [];

async function cargarPapeles() {
    try {
        const res = await fetch('api/insumos.php');
        const result = await res.json();
        const select = document.getElementById('c_papel');

        if (result.success && result.data) {
            window.insumosDisponibles = result.data.filter(i => i.tipo === 'papel' || i.tipo === 'prenda' || i.tipo === 'otro' || i.tipo === 'bobina');
            select.innerHTML = '<option value="">Seleccione Sustrato / Material...</option>';
            window.insumosDisponibles.forEach(p => {
                const opt = document.createElement('option');
                opt.value = p.id;
                opt.dataset.tipo = p.tipo;
                
                let extra = '';
                if (p.tipo === 'papel') {
                    extra = `${p.gramaje}g`;
                } else if (p.tipo === 'bobina') {
                    extra = `${p.kg_1000}Kg x 1000`;
                } else {
                    let attrs = [];
                    if(p.color) attrs.push(p.color);
                    if(p.talle) attrs.push(p.talle);
                    if(p.material) attrs.push(p.material);
                    extra = attrs.length > 0 ? attrs.join(' - ') : '(Unitario)';
                }
                
                const stockTxt = ` [Stock: ${p.stock_actual || 0}]`;
                opt.innerText = `${p.nombre} - ${extra}${stockTxt}`;
                select.appendChild(opt);
            });
        }
    } catch (e) {
        console.error("Error cargando papeles", e);
    }
}

async function cargarMaquinasList() {
    try {
        const res = await fetch('api/maquinas.php');
        const result = await res.json();
        const container = document.getElementById('maquinas_checkboxes');

        if (result.success && result.data) {
            container.innerHTML = '';
            result.data.forEach(m => {
                const label = document.createElement('label');
                label.style.cssText = 'display: flex; align-items: center; gap: 5px; cursor: pointer; color: #cbd5e1; user-select: none;';
                label.innerHTML = `<input type="checkbox" value="${m.id}" data-nombre="${m.nombre}" onchange="toggleMaquinaRuta(this)" style="width: 18px; height: 18px; accent-color: var(--primary-color);"> <span>${m.nombre}</span>`;
                container.appendChild(label);
            });
        }
    } catch (e) {
        console.error("Error cargando maquinas", e);
    }
}

window.toggleMaquinaRuta = function (cb) {
    const id = cb.value;
    const nombre = cb.getAttribute('data-nombre');
    if (cb.checked) {
        rutaTrabajo.push({ id, nombre });
    } else {
        rutaTrabajo = rutaTrabajo.filter(m => m.id !== id);
    }
    renderRuta();
}

function renderRuta() {
    const ul = document.getElementById('lista_ruta');
    ul.innerHTML = '';
    rutaTrabajo.forEach((m, index) => {
        const li = document.createElement('li');
        li.style.cssText = 'background: rgba(255,255,255,0.05); padding: 8px 12px; border-radius: 6px; display: flex; justify-content: space-between; align-items: center; border-left: 4px solid var(--primary-color);';
        li.innerHTML = `<span><b style="color:var(--primary-color)">Paso ${index + 1}:</b> ${m.nombre}</span> <button type="button" class="btn btn-danger" style="padding: 4px 10px; font-size: 0.8rem; height: auto;" onclick="eliminarPaso(${index})">Eliminar</button>`;
        ul.appendChild(li);
    });
}

function eliminarPaso(index) {
    const m = rutaTrabajo[index];
    rutaTrabajo.splice(index, 1);
    const cb = document.querySelector(`#maquinas_checkboxes input[value="${m.id}"]`);
    if (cb) cb.checked = false;
    renderRuta();
}

async function cargarTroquelesList() {
    try {
        const res = await fetch('api/troqueles.php');
        const result = await res.json();
        const select = document.getElementById('c_troquel_select');

        if (result.success && result.data) {
            troquelesDisponibles = result.data;
            select.innerHTML = '<option value="">No usar troquel (Corte Recto)</option>';
            result.data.forEach(t => {
                const opt = document.createElement('option');
                opt.value = t.id;
                opt.innerText = `${t.nombre} (${t.ancho}x${t.largo}cm - ${t.bocas} bocas)`;
                select.appendChild(opt);
            });
        }
    } catch (e) {
        console.error("Error cargando troqueles", e);
    }
}

async function cargarParametrosIniciales() {
    try {
        const res = await fetch('api/parametros.php');
        const result = await res.json();
        if (result.success && result.data) {
            document.getElementById('c_ganancia').value = result.data.ganancia;
            document.getElementById('c_comision').value = result.data.comision;
            document.getElementById('c_iva').value = result.data.iva;
        }
    } catch (e) {
        console.error("Error cargando parámetros globales", e);
    }
}

function dibujarDiagramaDeCorte(canvasId, contAncho, contLargo, piezaAncho, piezaLargo, filas, columnas, tipo) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Dimensiones reales del contenedor en la vida real
    const maxRealDim = Math.max(contAncho, contLargo);
    if (maxRealDim === 0) return;

    // Dimensiones disponibles del canvas
    const canvasAncho = canvas.width;
    const canvasLargo = canvas.height;
    const padding = 20;

    // Escala para mapear cm reales a pixeles en canvas (ajustar al lado mas largo para dar margen)
    const factorEscalaX = (canvasAncho - padding * 2) / contAncho;
    const factorEscalaY = (canvasLargo - padding * 2) / contLargo;
    const escala = Math.min(factorEscalaX, factorEscalaY);

    const W = contAncho * escala;
    const H = contLargo * escala;
    const offsetX = (canvasAncho - W) / 2;
    const offsetY = (canvasLargo - H) / 2;

    // Limpiar
    ctx.clearRect(0, 0, canvasAncho, canvasLargo);

    // 1. Dibujar Contenedor Base (Área muerta por defecto en gris rojo, por desperdicio)
    ctx.fillStyle = "rgba(220, 38, 38, 0.2)"; // Rojo tenue para zona de merma
    ctx.fillRect(offsetX, offsetY, W, H);
    ctx.strokeStyle = "#94a3b8"; // Borde contenedor
    ctx.lineWidth = 1;
    ctx.strokeRect(offsetX, offsetY, W, H);

    // Dibujar etiquetas de dimensión del contenedor
    ctx.fillStyle = "#cbd5e1";
    ctx.font = "12px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(`${contAncho}cm`, offsetX + W / 2, offsetY - 5);
    ctx.save();
    ctx.translate(offsetX - 5, offsetY + H / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(`${contLargo}cm`, 0, 0);
    ctx.restore();

    // 2. Dibujar las Piezas que SÍ caben
    const pW = piezaAncho * escala;
    const pH = piezaLargo * escala;

    ctx.fillStyle = "rgba(99, 102, 241, 0.4)"; // Color primario transparente para piezas buenas
    ctx.strokeStyle = "#818cf8";
    ctx.lineWidth = 1;

    // Poner el texto de cuantas piezas caben total en el medio
    const total = filas * columnas;

    // Límite de optimización de dibujado
    if (total > 3000) {
        ctx.fillStyle = "white";
        ctx.font = "bold 14px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(`Previsualización Omitida (${total} piezas)`, canvasAncho / 2, canvasLargo / 2);
        return;
    }

    for (let f = 0; f < filas; f++) {
        for (let c = 0; c < columnas; c++) {
            const x = offsetX + (c * pW);
            const y = offsetY + (f * pH);
            // No dibujar fuera de los limites (por protección de decimales flotantes)
            if ((x - offsetX) + pW <= W + 1 && (y - offsetY) + pH <= H + 1) {
                ctx.fillRect(x, y, pW, pH);
                ctx.strokeRect(x, y, pW, pH);
            }
        }
    }

    // Poner el texto de cuantas piezas caben total en el medio
    if (total > 0 && pW > 10 && pH > 10) {
        ctx.fillStyle = "white";
        ctx.font = "bold 14px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(`Total: ${total}`, canvasAncho / 2, canvasLargo / 2);
    }
}

async function guardarPresupuesto() {
    if (!lastCalculatedData) return;

    document.getElementById('btn-guardar-presupuesto').innerHTML = '<i data-feather="loader"></i> Guardando...';
    document.getElementById('btn-guardar-presupuesto').disabled = true;

    let textoFormatoFinal = document.getElementById('c_ancho').value + ' x ' + document.getElementById('c_largo').value + ' cm';
    if (!document.getElementById('c_ancho').value || document.getElementById('c_ancho').value === "") {
        const selTroquel = document.getElementById('c_troquel_select');
        if (selTroquel && selTroquel.value !== "") {
            textoFormatoFinal = "Troquelado (" + document.getElementById('c_desc').value + ")";
        } else {
            textoFormatoFinal = "Variable / Según descripción";
        }
    }

    const payloadGuardarExtra = Object.assign({}, lastCalculatedData, {
        colores: document.getElementById('c_colores').value,
        frente_dorso: document.getElementById('c_frente_dorso').value,
        detalle_tintas: document.getElementById('c_detalle_tintas').value,
        formato_final: textoFormatoFinal,
        original_form: {
            papel_id: document.getElementById('c_papel').value,
            papel_cliente: document.getElementById('c_papel_cliente').checked,
            troquel_id: document.getElementById('c_troquel_select').value,
            ancho: document.getElementById('c_ancho').value,
            largo: document.getElementById('c_largo').value,
            demasia: document.getElementById('c_demasia').value,
            ruta_maquinas: rutaTrabajo
        }
    });

    const esRev = document.getElementById('c_revendedor').checked;
    const nombreClienteGuardado = document.getElementById('c_cliente').value + (esRev ? ' [REVENDEDOR]' : '');

    const payload = {
        descripcion: lastCalculatedData.descripcion,
        cliente: nombreClienteGuardado,
        cantidad: lastCalculatedData.cantidad,
        archivo_final_str: lastCalculatedData.diagrama_datos ? (lastCalculatedData.diagrama_datos.final.ancho + 'x' + lastCalculatedData.diagrama_datos.final.largo + ' cm') : 'Desconocida',
        maquina_str: lastCalculatedData.maquina_nombre || (rutaTrabajo.map(m => m.nombre).join(" ➔ ")),
        costo_base: lastCalculatedData.costo_estimado,
        ganancia: lastCalculatedData.ganancia_valor,
        comision: lastCalculatedData.comision_valor,
        iva: lastCalculatedData.iva_valor,
        precio_final: lastCalculatedData.precio_final,
        datos_json: payloadGuardarExtra
    };

    try {
        const res = await fetch('api/presupuestos.php', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'application/json' }
        });
        const r = await res.json();

        if (r.success) {
            document.getElementById('btn-guardar-presupuesto').innerHTML = '<i data-feather="check"></i> ¡Guardado exitosamente!';
            document.getElementById('btn-guardar-presupuesto').style.background = '#6366f1';
            feather.replace();
            
            // SPA: Actualizamos la tabla de historial en segundo plano automáticamente
            if (typeof cargarHistorial === 'function') {
                cargarHistorial();
            }
        } else {
            alert("Error: " + r.message);
            document.getElementById('btn-guardar-presupuesto').innerHTML = '<i data-feather="save"></i> Reintentar Guardar';
            document.getElementById('btn-guardar-presupuesto').disabled = false;
            feather.replace();
        }
    } catch (e) {
        alert("Ocurrió un error al guardar al comunicarse con el servidor.");
        document.getElementById('btn-guardar-presupuesto').innerHTML = '<i data-feather="save"></i> Reintentar Guardar';
        document.getElementById('btn-guardar-presupuesto').disabled = false;
        feather.replace();
    }
}


function sugerirEngranajeBobina() {
    const anchoFinal = parseFloat(document.getElementById('c_ancho').value);
    const largoFinal = parseFloat(document.getElementById('c_largo').value);
    if (!anchoFinal || !largoFinal) return;

    const anchoPlancha = 41;
    const engranajes = [8, 9, 10, 12, 13, 14];
    
    let mejorEngranaje = 12;
    let mejorRendimiento = Infinity;

    engranajes.forEach(eng => {
        const largoPlancha = eng * 2.54;
        let poses_orientacion1 = Math.floor(anchoPlancha / anchoFinal) * Math.floor(largoPlancha / largoFinal);
        let poses_orientacion2 = Math.floor(anchoPlancha / largoFinal) * Math.floor(largoPlancha / anchoFinal);
        let poses = Math.max(poses_orientacion1, poses_orientacion2);

        if (poses > 0) {
            let rendimiento = largoPlancha / poses; // cm de bobina por cada pieza final
            if (rendimiento < mejorRendimiento) {
                mejorRendimiento = rendimiento;
                mejorEngranaje = eng;
            }
        }
    });

    const select = document.getElementById('c_bobina_engranaje');
    if(!select) return;
    Array.from(select.options).forEach(opt => {
        let text = opt.text.replace(' (Recomendado)', '');
        if (parseInt(opt.value) === mejorEngranaje) {
            opt.text = text + ' (Recomendado)';
        } else {
            opt.text = text;
        }
    });
    select.value = mejorEngranaje;
}

async function cargarEventosComerciales() {
    try {
        const res = await fetch('api/eventos.php');
        const result = await res.json();
        const lista = document.getElementById('lista-eventos');
        if (!lista) return;

        if (result.success && result.data) {
            lista.innerHTML = '';
            if (result.data.length === 0) {
                lista.innerHTML = '<span style="color: #94a3b8; font-size: 0.9rem;">No hay eventos comerciales próximos.</span>';
                return;
            }

            result.data.forEach(evt => {
                const item = document.createElement('div');
                item.className = 'evento-item';
                
                // Formatear fecha
                const fechaParts = evt.fecha.split('-');
                const fechaObj = new Date(fechaParts[0], fechaParts[1] - 1, fechaParts[2]);
                const dia = fechaObj.getDate();
                const mes = fechaObj.toLocaleString('es-UY', { month: 'short' });

                // Determinar badge de urgencia/dias faltantes
                let colorDias = '#10b981'; // Verde por defecto
                let tagUrgencia = 'Planificar';
                let tagColor = 'rgba(16, 185, 129, 0.15)';
                let tagTextColor = '#10b981';
                let blinkStyle = '';

                const dias = parseInt(evt.dias_faltantes);

                if (dias <= 7) {
                    colorDias = '#ef4444'; // Rojo urgente
                    tagUrgencia = 'Urgente';
                    tagColor = 'rgba(239, 68, 68, 0.2)';
                    tagTextColor = '#ef4444';
                    blinkStyle = 'animation: pulse-glow 1.5s infinite;';
                } else if (dias <= 15) {
                    colorDias = '#f59e0b'; // Amarillo
                    tagUrgencia = 'Producción';
                    tagColor = 'rgba(245, 158, 11, 0.2)';
                    tagTextColor = '#fcd34d';
                } else if (dias <= 30) {
                    colorDias = '#3b82f6'; // Azul
                    tagUrgencia = 'Campaña';
                    tagColor = 'rgba(59, 130, 246, 0.2)';
                    tagTextColor = '#93c5fd';
                }

                item.style.cssText = `background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); padding: 12px; border-radius: 8px; display: flex; flex-direction: column; gap: 6px; transition: all 0.3s ease; ${blinkStyle}`;
                
                // Hover effect setup inline
                item.onmouseenter = () => {
                    item.style.background = 'rgba(255,255,255,0.06)';
                    item.style.borderColor = 'rgba(99, 102, 241, 0.3)';
                };
                item.onmouseleave = () => {
                    item.style.background = 'rgba(255,255,255,0.03)';
                    item.style.borderColor = 'rgba(255,255,255,0.05)';
                };

                const labelFaltantes = dias === 0 ? '¡Es HOY!' : (dias === 1 ? 'Falta 1 día' : `Faltan ${dias} días`);

                item.innerHTML = `
                    <div style="display: flex; justify-content: space-between; align-items: center; gap: 8px;">
                        <span style="font-weight: 600; font-size: 0.95rem; color: #f8fafc; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 170px;" title="${evt.nombre}">${evt.nombre}</span>
                        <span style="font-size: 0.8rem; background: rgba(99, 102, 241, 0.15); color: #818cf8; padding: 2px 8px; border-radius: 12px; font-weight: 600; white-space: nowrap; text-transform: capitalize;">${dia} ${mes}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem;">
                        <span style="color: ${colorDias}; font-weight: 500;">${labelFaltantes}</span>
                        <span style="font-size: 0.72rem; background: ${tagColor}; color: ${tagTextColor}; padding: 1px 6px; border-radius: 4px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">${tagUrgencia}</span>
                    </div>
                `;
                lista.appendChild(item);
            });
        }
    } catch (e) {
        console.error("Error cargando eventos comerciales:", e);
    }
}

function actualizarSeleccionAlternativas() {
    const selectedCards = document.querySelectorAll('.alt-card.selected');
    const actionsPanel = document.getElementById('alternativas-actions');
    const cantSpan = document.getElementById('cant-seleccionados');
    
    if (selectedCards.length > 0) {
        actionsPanel.style.display = 'flex';
        cantSpan.innerText = selectedCards.length;
    } else {
        actionsPanel.style.display = 'none';
        cantSpan.innerText = '0';
    }
}

async function guardarSeleccionados() {
    const selectedCards = document.querySelectorAll('.alt-card.selected');
    if (selectedCards.length === 0) return;

    const btn = document.getElementById('btn-guardar-seleccionados');
    const originalText = btn.innerHTML;
    
    btn.innerHTML = '<i data-feather="loader"></i> Guardando...';
    btn.disabled = true;

    const esRev = document.getElementById('c_revendedor').checked;
    const nombreClienteGuardado = document.getElementById('c_cliente').value + (esRev ? ' [REVENDEDOR]' : '');
    const desc = document.getElementById('c_desc').value;

    let textoFormatoFinal = document.getElementById('c_ancho').value + ' x ' + document.getElementById('c_largo').value + ' cm';
    if (!document.getElementById('c_ancho').value || document.getElementById('c_ancho').value === "") {
        const selTroquel = document.getElementById('c_troquel_select');
        if (selTroquel && selTroquel.value !== "") {
            textoFormatoFinal = "Troquelado (" + document.getElementById('c_desc').value + ")";
        } else {
            textoFormatoFinal = "Variable / Según descripción";
        }
    }

    let guardadosOk = 0;
    let guardadosError = 0;

    for (const card of selectedCards) {
        const cant = card.dataset.cantidad;
        const rData = window.alternativasCalculadas[cant];
        if (!rData) continue;

        const payloadGuardarExtra = Object.assign({}, rData, {
            colores: document.getElementById('c_colores').value,
            frente_dorso: document.getElementById('c_frente_dorso').value,
            detalle_tintas: document.getElementById('c_detalle_tintas').value,
            formato_final: textoFormatoFinal,
            original_form: {
                papel_id: document.getElementById('c_papel').value,
                papel_cliente: document.getElementById('c_papel_cliente').checked,
                troquel_id: document.getElementById('c_troquel_select').value,
                ancho: document.getElementById('c_ancho').value,
                largo: document.getElementById('c_largo').value,
                demasia: document.getElementById('c_demasia').value,
                ruta_maquinas: rutaTrabajo
            }
        });

        const payload = {
            descripcion: desc,
            cliente: nombreClienteGuardado,
            cantidad: cant,
            archivo_final_str: rData.diagrama_datos ? (rData.diagrama_datos.final.ancho + 'x' + rData.diagrama_datos.final.largo + ' cm') : 'Desconocida',
            maquina_str: rData.maquina_nombre || (rutaTrabajo.map(m => m.nombre).join(" ➔ ")),
            costo_base: rData.costo_estimado,
            ganancia: rData.ganancia_valor,
            comision: rData.comision_valor,
            iva: rData.iva_valor,
            precio_final: rData.precio_final,
            datos_json: payloadGuardarExtra
        };

        try {
            const res = await fetch('api/presupuestos.php', {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: { 'Content-Type': 'application/json' }
            });
            const r = await res.json();
            if (r.success) {
                guardadosOk++;
                card.classList.remove('selected');
            } else {
                guardadosError++;
            }
        } catch (e) {
            guardadosError++;
        }
    }

    actualizarSeleccionAlternativas();
    btn.disabled = false;
    btn.innerHTML = originalText;
    if (window.feather) feather.replace();

    if (guardadosOk > 0) {
        if (typeof cargarHistorial === 'function') {
            cargarHistorial();
        }
        alert(`¡Se guardaron ${guardadosOk} presupuestos exitosamente!${guardadosError > 0 ? ` (${guardadosError} fallaron)` : ''}`);
    } else if (guardadosError > 0) {
        alert("Ocurrió un error al intentar guardar los presupuestos.");
    }
}

function compartirWhatsApp() {
    const selectedCards = Array.from(document.querySelectorAll('.alt-card.selected'));
    if (selectedCards.length === 0) return;

    selectedCards.sort((a, b) => parseInt(a.dataset.cantidad) - parseInt(b.dataset.cantidad));

    const cliente = document.getElementById('c_cliente').value;
    const desc = document.getElementById('c_desc').value;
    
    let textoFormatoFinal = document.getElementById('c_ancho').value + ' x ' + document.getElementById('c_largo').value + ' cm';
    if (!document.getElementById('c_ancho').value || document.getElementById('c_ancho').value === "") {
        const selTroquel = document.getElementById('c_troquel_select');
        if (selTroquel && selTroquel.value !== "") {
            textoFormatoFinal = "Troquelado (" + document.getElementById('c_desc').value + ")";
        } else {
            textoFormatoFinal = "Variable / Según descripción";
        }
    }

    const formatterAlt = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 });
    const formatterUnit = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 2, maximumFractionDigits: 2 });

    let msg = `*Presupuesto para:* ${cliente}\n`;
    msg += `*Trabajo:* ${desc}\n`;
    msg += `*Formato:* ${textoFormatoFinal}\n`;
    msg += `-----------------------------------------\n`;
    msg += `*Alternativas de Cantidad:*\n`;

    selectedCards.forEach(card => {
        const cant = card.dataset.cantidad;
        const rData = window.alternativasCalculadas[cant];
        if (rData) {
            const unit = rData.precio_final / cant;
            msg += `• *${cant} u:* ${formatterAlt.format(rData.precio_final)} (${formatterUnit.format(unit)} c/u)\n`;
        }
    });
    
    msg += `-----------------------------------------`;

    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
}

