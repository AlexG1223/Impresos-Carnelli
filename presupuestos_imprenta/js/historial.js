document.addEventListener('DOMContentLoaded', () => {
    cargarHistorial();

    const buscador = document.getElementById('buscador-historial');
    if (buscador) {
        buscador.addEventListener('input', (e) => {
            filtrarHistorial(e.target.value);
        });
    }
});

function filtrarHistorial(query) {
    const q = query.toLowerCase();
    const filtered = window.presupuestosData.filter(p => {
        const desc = (p.descripcion || '').toLowerCase();
        const cliente = (p.cliente || '').toLowerCase();
        return desc.includes(q) || cliente.includes(q);
    });
    renderizarTablaHistorial(filtered);
}

function renderizarTablaHistorial(data) {
    const tbody = document.querySelector('#tabla-historial tbody');
    tbody.innerHTML = '';

    if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; color: #a1a1aa;">No se encontraron presupuestos.</td></tr>';
        return;
    }

    const formatter = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' });

    data.forEach(p => {
        const tr = document.createElement('tr');

        // Format date manually as simple d/m/y 
        let fechaObj = new Date(p.creado_en);
        let fechaFormatted = fechaObj.toLocaleDateString() + ' ' + (fechaObj.getHours().toString().padStart(2, '0')) + ':' + (fechaObj.getMinutes().toString().padStart(2, '0'));

        const precio = parseFloat(p.precio_final);
        const desc = p.descripcion || 'Sin nombre';
        let clienteHtml = p.cliente || '';
        if (clienteHtml.includes('[REVENDEDOR]')) {
            clienteHtml = clienteHtml.replace('[REVENDEDOR]', '<span style="background: rgba(16, 185, 129, 0.2); color: #34d399; padding: 2px 6px; border-radius: 4px; font-size: 0.7rem; font-weight: bold; margin-left: 5px; border: 1px solid rgba(16,185,129,0.3); letter-spacing: 0.5px;">REVENDEDOR</span>');
        }
        const clienteDisplay = p.cliente ? `<br><span style="font-size: 0.8rem; color: #94a3b8; font-weight: normal; display: inline-flex; align-items: center; margin-top: 4px;">👤 <span style="margin-left: 4px;">${clienteHtml}</span></span>` : '';
        const cant = p.cantidad || '-';
        const arch = p.archivo_final_str || '-';

        let numColores = 1;
        if (p.datos_json) {
            try {
                const jb = JSON.parse(p.datos_json);
                numColores = (jb.colores !== undefined && jb.colores !== null) ? jb.colores : 1;
            } catch (e) { }
        }

        tr.innerHTML = `
            <td style="text-align: center;"><input type="checkbox" class="chk-unificar" value="${p.id}" data-cliente="${p.cliente || ''}"></td>
            <td style="color: #94a3b8; font-size: 0.9rem;">${fechaFormatted}</td>
            <td style="font-weight: bold; color: white;">${desc}${clienteDisplay}</td>
            <td>${cant}</td>
            <td>${arch}</td>
            <td style="color: var(--primary-color); font-size: 0.9rem; text-align: center;">${numColores}</td>
            <td style="color: #6366f1; font-weight: bold;">${formatter.format(precio)}</td>
            <td style="display: flex; gap: 8px;">
                <button class="btn btn-secondary" onclick="descargarPDFLoco(${p.id})" title="Descargar PDF" style="padding: 6px; width: auto; height: auto; background: #3b82f6; border-color: #3b82f6; color: white;">
                    <i data-feather="file-text"></i>
                </button>
                <button class="btn btn-primary" onclick="clonarPresupuesto(${p.id})" title="Clonar / Recalcular" style="padding: 6px; width: auto; height: auto; background: #10b981; border-color: #10b981; color: white;">
                    <i data-feather="copy"></i>
                </button>
                <button class="btn btn-secondary" onclick="verDesglose(${p.id})" title="Ver detalles internos" style="padding: 6px; width: auto; height: auto;">
                    <i data-feather="eye"></i>
                </button>
                <button class="btn btn-danger" onclick="eliminarPresupuesto(${p.id})" title="Eliminar" style="padding: 6px; width: auto; height: auto;">
                    <i data-feather="trash-2"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
    if (window.feather) feather.replace();
}

async function cargarHistorial() {
    try {
        const res = await fetch('api/presupuestos.php');
        const result = await res.json();

        if (result.success && result.data) {
            window.presupuestosData = result.data;
            const buscador = document.getElementById('buscador-historial');
            if (buscador && buscador.value.trim() !== '') {
                filtrarHistorial(buscador.value);
            } else {
                renderizarTablaHistorial(window.presupuestosData);
            }
        } else {
            document.getElementById('error-box').style.display = 'block';
            document.getElementById('error-box').innerText = result.message || "Error al solicitar datos.";
        }
    } catch (e) {
        console.error("Error cargando historial", e);
        document.getElementById('error-box').style.display = 'block';
        document.getElementById('error-box').innerText = "Error de conexión con el servidor.";
    }
}

async function eliminarPresupuesto(id) {
    if (!confirm("¿Seguro que deseas eliminar este presupuesto? Esta acción no se puede deshacer.")) return;

    try {
        const res = await fetch(`api/presupuestos.php?id=${id}`, { method: 'DELETE' });
        const result = await res.json();

        if (result.success) {
            cargarHistorial(); // refresh
        } else {
            alert("Error al eliminar: " + (result.message || ""));
        }
    } catch (e) {
        alert("Ocurrió un error al eliminar.");
    }
}

// Window global object for opening technical details payload
window.presupuestosData = [];

function clonarPresupuesto(id) {
    const p = window.presupuestosData.find(x => x.id == id);
    if (!p) return alert("Registro no encontrado.");
    sessionStorage.setItem('clonarPresupuestoData', JSON.stringify(p));
    window.location.href = "index.html";
}

function descargarPDFLoco(id) {
    const p = window.presupuestosData.find(x => x.id == id);
    if (!p) return alert("Error encontrando registro.");
    let jsonObj = {};
    if (p.datos_json) {
        try { jsonObj = JSON.parse(p.datos_json); } catch (e) { }
    }
    
    // Inject root level fields
    const packet = Object.assign({}, jsonObj, {
        descripcion: p.descripcion,
        cliente: p.cliente,
        cantidad: p.cantidad,
        precio_final: p.precio_final,
        id: p.id,
        fecha_emision: new Date(p.creado_en).toLocaleDateString('es-AR')
    });
    
    if (typeof generarPDFCliente === 'function') {
        generarPDFCliente(packet);
    } else {
        alert("Librería PDF no cargada.");
    }
}

function toggleAllCheckboxes(source) {
    const checkboxes = document.querySelectorAll('.chk-unificar');
    checkboxes.forEach(cb => cb.checked = source.checked);
}

function generarPDFUnificadoSeleccionados() {
    const checkboxes = document.querySelectorAll('.chk-unificar:checked');
    if (checkboxes.length === 0) {
        alert("Por favor, selecciona al menos un presupuesto para unificar.");
        return;
    }

    const seleccionados = [];
    let clientePrincipal = null;

    for (let i = 0; i < checkboxes.length; i++) {
        const id = checkboxes[i].value;
        const p = window.presupuestosData.find(x => x.id == id);
        if (p) {
            // Verificar que sean del mismo cliente (opcional pero recomendado)
            if (clientePrincipal === null) {
                clientePrincipal = p.cliente;
            } else if (clientePrincipal !== p.cliente && p.cliente !== '') {
                // Solo alertamos, pero permitimos continuar si el usuario quiere
                console.warn("Los presupuestos seleccionados tienen diferentes clientes.");
            }

            let jsonObj = {};
            if (p.datos_json) {
                try { jsonObj = JSON.parse(p.datos_json); } catch (e) { }
            }
            
            const packet = Object.assign({}, jsonObj, {
                descripcion: p.descripcion,
                cliente: p.cliente,
                cantidad: p.cantidad,
                precio_final: p.precio_final,
                id: p.id,
                fecha_emision: new Date(p.creado_en).toLocaleDateString('es-AR')
            });

            seleccionados.push(packet);
        }
    }

    if (typeof generarPDFUnificado === 'function') {
        generarPDFUnificado(seleccionados);
    } else {
        alert("Librería PDF o función unificadora no encontrada.");
    }
}

async function verDesglose(id) {
    // We could fetch again or find it. For now, fetch from GET if not local, but we don't have it locally attached.
    // Let's refetch from the API just to get the JSON payload easily without saving all arrays locally.
    // Wait, the prior fetch returned ALL json. We can store it briefly.

    try {
        const res = await fetch('api/presupuestos.php');
        const result = await res.json();
        if (result.success && result.data) {
            const p = result.data.find(x => x.id == id);
            if (p && p.datos_json) {
                const jsonObj = JSON.parse(p.datos_json);
                renderizarDesgloseHumano(jsonObj);
                document.getElementById('json-modal').style.display = 'flex';
            } else {
                alert("No hay detalles técnicos para este presupuesto.");
            }
        }
    } catch (e) {
        alert("Error rescatando detalles.");
    }
}

function renderizarDesgloseHumano(data) {
    const container = document.getElementById('json-content');
    const formatter = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' });

    let html = '';

    // Bloque: Producción
    html += `
        <div style="background: rgba(0,0,0,0.3); padding: 1rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05);">
            <h4 style="color: var(--primary-color); margin-bottom: 0.5rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.5rem;"><i data-feather="settings" style="width: 16px; height: 16px;"></i> Datos de Producción</h4>
            <ul style="list-style: none; padding: 0; color: #cbd5e1; font-size: 0.95rem; line-height: 1.6;">
                <li><b>Ruta/Máquina:</b> ${data.maquina_nombre || (data.ruta_analizada || '-')}</li>
                <li><b>Tipo de Papel:</b> ${(data.papel_nombre || '-').replace(/\s*\(\d+(?:\.\d+)?x\d+(?:\.\d+)?cm\)/i, '').replace(/\s*\(Bobina.*?\)/i, '')}</li>
                <li><b>Colores Impresos:</b> ${data.colores || 1} (${data.frente_dorso === 'si' ? 'Frente y Dorso' : 'Frente Solo'})</li>
                <li><b>Cantidad Solicitada:</b> ${data.cantidad || '-'}</li>
                <li><b>Pliegos en Máquina:</b> ${data.pliegos_necesarios || 0}</li>
                <li><b>Poses por Pliego:</b> ${data.poses_por_pliego || 0}</li>
                <li><b>Horas Estimadas:</b> ${data.horas_estimadas ? parseFloat(data.horas_estimadas).toFixed(2) + ' hr' : '-'}</li>
            </ul>
            
            <div style="margin-top: 1rem; text-align: center;">
                <h5 style="color: #94a3b8; font-size: 0.8rem; text-transform: uppercase;">Diagrama de Corte (Pliego Máquina)</h5>
                <canvas id="h-canvas-poses" width="300" height="300" style="background: #1e293b; border-radius: 8px; max-width: 100%; border: 1px solid rgba(255,255,255,0.1);"></canvas>
            </div>
        </div>
    `;

    // Bloque: Costos
    html += `
        <div style="background: rgba(0,0,0,0.3); padding: 1rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05);">
            <h4 style="color: #10b981; margin-bottom: 0.5rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.5rem;"><i data-feather="dollar-sign" style="width: 16px; height: 16px;"></i> Desglose Económico</h4>
            <ul style="list-style: none; padding: 0; color: #cbd5e1; font-size: 0.95rem; line-height: 1.6;">
                <li><b>Costo de Papel:</b> ${formatter.format(data.costo_papel || 0)}</li>
                <li><b>Costo de Impresión:</b> ${formatter.format(data.costo_impresion || 0)}</li>
                <li style="border-top: 1px solid rgba(255,255,255,0.1); margin-top: 5px; padding-top: 5px;"><b>Costo Base Total:</b> ${formatter.format((data.costo_base_produccion || data.costo_estimado) || 0)}</li>
                <li><b>Ganancia Comercial:</b> ${formatter.format(data.ganancia_valor || 0)}</li>
                <li><b>Comisiones:</b> ${formatter.format(data.comision_valor || 0)}</li>
                <li><b>Subtotal (Sin IVA):</b> ${formatter.format(data.subtotal_venta || 0)}</li>
                <li><b>IVA:</b> ${formatter.format(data.iva_valor || 0)}</li>
                <li style="font-size: 1.1rem; color: white; border-top: 1px solid rgba(255,255,255,0.1); margin-top: 5px; padding-top: 5px;"><b>Precio Final:</b> <span style="color: #a3e635;">${formatter.format((data.precio_final_con_iva || data.precio_final) || 0)}</span></li>
            </ul>
        </div>
    `;

    container.innerHTML = html;
    if (window.feather) feather.replace();

    if (data.diagrama_datos) {
        const dd = data.diagrama_datos;
        dibujarDiagramaDeCorteHistorial(
            'h-canvas-poses',
            dd.pliego_maquina.ancho, dd.pliego_maquina.largo,
            dd.poses_pliego.ancho_pieza, dd.poses_pliego.largo_pieza,
            dd.poses_pliego.filas, dd.poses_pliego.columnas,
            "Pliego Máquina"
        );
    }
}

function dibujarDiagramaDeCorteHistorial(canvasId, contAncho, contLargo, piezaAncho, piezaLargo, filas, columnas, tipo) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const maxRealDim = Math.max(contAncho, contLargo);
    if (maxRealDim === 0) return;

    const canvasAncho = canvas.width;
    const canvasLargo = canvas.height;
    const padding = 20;

    const factorEscalaX = (canvasAncho - padding * 2) / contAncho;
    const factorEscalaY = (canvasLargo - padding * 2) / contLargo;
    const escala = Math.min(factorEscalaX, factorEscalaY);

    const W = contAncho * escala;
    const H = contLargo * escala;
    const offsetX = (canvasAncho - W) / 2;
    const offsetY = (canvasLargo - H) / 2;

    ctx.clearRect(0, 0, canvasAncho, canvasLargo);

    ctx.fillStyle = "rgba(220, 38, 38, 0.2)";
    ctx.fillRect(offsetX, offsetY, W, H);
    ctx.strokeStyle = "#94a3b8";
    ctx.lineWidth = 1;
    ctx.strokeRect(offsetX, offsetY, W, H);

    ctx.fillStyle = "#cbd5e1";
    ctx.font = "12px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(`${contAncho}cm`, offsetX + W / 2, offsetY - 5);
    ctx.save();
    ctx.translate(offsetX - 5, offsetY + H / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(`${contLargo}cm`, 0, 0);
    ctx.restore();

    const pW = piezaAncho * escala;
    const pH = piezaLargo * escala;

    ctx.fillStyle = "rgba(99, 102, 241, 0.4)";
    ctx.strokeStyle = "#818cf8";
    ctx.lineWidth = 1;

    const total = filas * columnas;

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
            if ((x - offsetX) + pW <= W + 1 && (y - offsetY) + pH <= H + 1) {
                ctx.fillRect(x, y, pW, pH);
                ctx.strokeRect(x, y, pW, pH);
            }
        }
    }

    if (total > 0 && pW > 10 && pH > 10) {
        ctx.fillStyle = "white";
        ctx.font = "bold 14px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(`Total: ${total}`, canvasAncho / 2, canvasLargo / 2);
    }
}
