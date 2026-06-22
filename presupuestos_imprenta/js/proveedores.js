// ══════════════════════════════════════════════════════════════════════════════
//  MÓDULO PROVEEDORES — js/proveedores.js
//  Gestión de proveedores + búsqueda de catálogo + importación a insumos
// ══════════════════════════════════════════════════════════════════════════════

let proveedoresList  = [];
let catalogoResultados = [];
let proveedorActivoId  = null;

// ─── INICIALIZACIÓN ──────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    // Formulario nuevo proveedor
    const formProv = document.getElementById('form-proveedor');
    if (formProv) {
        formProv.addEventListener('submit', async (e) => {
            e.preventDefault();
            await guardarProveedor();
        });
    }

    // Búsqueda en todos los catálogos
    const btnBuscarTodos = document.getElementById('btn-buscar-todos-proveedores');
    if (btnBuscarTodos) {
        btnBuscarTodos.addEventListener('click', () => buscarEnTodosLosProveedores());
    }

    const inputBuscarTodos = document.getElementById('input-buscar-todos-proveedores');
    if (inputBuscarTodos) {
        inputBuscarTodos.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') buscarEnTodosLosProveedores();
        });
    }
});

// ─── CARGAR LISTA DE PROVEEDORES ─────────────────────────────────────────────
async function cargarProveedores() {
    const res    = await fetch('api/proveedores.php?action=list');
    const result = await res.json();
    if (!result.success) return;

    proveedoresList = result.data;
    renderizarProveedores();
    renderizarSelectoresProveedor();
}

function renderizarProveedores() {
    const grid = document.getElementById('grid-proveedores');
    if (!grid) return;
    grid.innerHTML = '';

    proveedoresList.forEach(p => {
        const tieneAuto = p.metodo !== 'manual';
        const card = document.createElement('div');
        card.className = `proveedor-card ${p.activo == 1 ? '' : 'inactivo'}`;
        card.dataset.id = p.id;
        card.innerHTML = `
            <div class="prov-header">
                <div class="prov-logo-wrap">
                    ${p.logo_url
                        ? `<img src="${p.logo_url}" alt="${p.nombre}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
                        : ''}
                    <span class="prov-initials" ${p.logo_url ? 'style="display:none"' : ''}>${p.nombre.charAt(0)}</span>
                </div>
                <div class="prov-info">
                    <h4>${p.nombre}</h4>
                    <a href="${p.url}" target="_blank" class="prov-url">${p.url.replace('https://','').replace('http://','')}</a>
                </div>
                <span class="prov-badge ${tieneAuto ? 'badge-auto' : 'badge-manual'}">
                    ${tieneAuto ? '⚡ Auto' : '📋 Manual'}
                </span>
            </div>
            ${p.notas ? `<p class="prov-notas">${p.notas}</p>` : ''}
            <div class="prov-actions">
                ${tieneAuto
                    ? `<button class="btn btn-primary btn-sm" onclick="activarBusqueda(${p.id})">
                          <i data-feather="search"></i> Buscar Insumos
                       </button>`
                    : `<a href="${p.url}" target="_blank" class="btn btn-secondary btn-sm">
                          <i data-feather="external-link"></i> Ir al sitio
                       </a>`
                }
                <button class="btn btn-secondary btn-sm" onclick="editarProveedor(${p.id})">
                    <i data-feather="edit-2"></i> Editar
                </button>
                <button class="btn btn-danger btn-sm" onclick="eliminarProveedor(${p.id})">
                    <i data-feather="trash-2"></i>
                </button>
            </div>
        `;
        grid.appendChild(card);
    });

    if (typeof feather !== 'undefined') feather.replace();
}

// Poblar el select del panel de búsqueda con solo los proveedores con método automático
function renderizarSelectoresProveedor() {
    const sel = document.getElementById('select-proveedor-busqueda');
    if (!sel) return;
    sel.innerHTML = '<option value="">— Elegí un proveedor —</option>';
    proveedoresList
        .filter(p => p.metodo !== 'manual' && p.activo == 1)
        .forEach(p => {
            const opt = document.createElement('option');
            opt.value = p.id;
            opt.textContent = p.nombre;
            sel.appendChild(opt);
        });
}

// ─── BÚSQUEDA EN CATÁLOGO ─────────────────────────────────────────────────────
// ─── BÚSQUEDA EN CATÁLOGO ─────────────────────────────────────────────────────
function activarBusqueda(idProveedor) {
    const inputBuscar = document.getElementById('input-buscar-todos-proveedores');
    if (inputBuscar) {
        inputBuscar.focus();
        inputBuscar.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Si ya hay un término buscado, podemos resaltar ese proveedor haciéndole scroll
        const provSection = document.getElementById(`grid-catalogo-${idProveedor}`);
        if (provSection) {
            provSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
}

async function buscarEnTodosLosProveedores() {
    const q = (document.getElementById('input-buscar-todos-proveedores')?.value || '').trim();
    
    // Obtener proveedores automáticos activos
    const autoProviders = proveedoresList.filter(p => p.metodo !== 'manual' && p.activo == 1);
    
    if (autoProviders.length === 0) {
        mostrarToast('No hay proveedores automáticos configurados o activos', 'warn');
        return;
    }

    // UX: mostrar skeleton global
    mostrarSkeletonGlobal(autoProviders);

    try {
        // Ejecutar búsquedas en paralelo
        const promesas = autoProviders.map(p => {
            return fetch(`api/proveedores.php?action=buscar&id=${p.id}&q=${encodeURIComponent(q)}`)
                .then(res => res.json())
                .then(resJson => ({
                    provider: p,
                    success: resJson.success,
                    data: resJson.data || [],
                    message: resJson.message || ''
                }))
                .catch(err => ({
                    provider: p,
                    success: false,
                    data: [],
                    message: 'Error de comunicación con el catálogo'
                }));
        });

        const resultados = await Promise.all(promesas);

        renderizarResultadosGlobales(resultados);
    } catch (error) {
        console.error('Error al realizar búsqueda global:', error);
        mostrarToast('Error al procesar la búsqueda', 'error');
    }
}

function mostrarSkeletonGlobal(providers) {
    const container = document.getElementById('resultados-busqueda-global');
    if (!container) return;
    
    container.style.display = 'block';
    container.innerHTML = providers.map(p => `
        <div class="glass-panel" style="margin-bottom: 1.5rem;">
            <h3 style="border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.5rem; margin-top: 0; margin-bottom: 1rem; color: #fcd34d; display: flex; align-items: center; justify-content: space-between;">
                <span>Catálogo de ${p.nombre}</span>
                <span style="font-size: 0.85rem; color: #cbd5e1;">Buscando...</span>
            </h3>
            <div class="grid-catalogo">
                ${Array(3).fill(0).map(() => `
                    <div class="catalogo-card skeleton-card">
                        <div class="skeleton skeleton-img"></div>
                        <div class="skeleton skeleton-line w80"></div>
                        <div class="skeleton skeleton-line w60"></div>
                        <div class="skeleton skeleton-line w40"></div>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

function renderizarResultadosGlobales(resultados) {
    const container = document.getElementById('resultados-busqueda-global');
    if (!container) return;

    container.innerHTML = '';
    catalogoResultados = []; // Resetear resultados globales para importación
    let globalIdx = 0;

    resultados.forEach(({ provider, success, data, message }) => {
        const section = document.createElement('div');
        section.className = 'glass-panel';
        section.style.marginBottom = '1.5rem';
        
        let productsHtml = '';
        let countText = '0 resultados';

        if (success && data && data.length > 0) {
            countText = `${data.length} producto${data.length !== 1 ? 's' : ''} encontrado${data.length !== 1 ? 's' : ''}`;
            
            let rowsHtml = '';
            data.forEach(prod => {
                catalogoResultados.push(prod);
                const idx = globalIdx;
                globalIdx++;
                
                const precioTxt = prod.precio > 0 
                    ? `$ ${prod.precio.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                    : '<span style="color: #94a3b8; font-style: italic;">Consultar</span>';
                
                const medidasTxt = [
                    prod.gramaje ? `${prod.gramaje}g` : null,
                    prod.formato_str ? `${prod.formato_str} cm` : null,
                    prod.presentacion ? `(${prod.presentacion})` : null
                ].filter(Boolean).join(' - ');

                rowsHtml += `
                    <tr style="border-bottom: 1px solid rgba(255,255,255,0.05); transition: background 0.2s ease;">
                        <td style="padding: 12px 10px; vertical-align: middle;">
                            <div style="display: flex; align-items: center; gap: 12px;">
                                ${prod.imagen
                                    ? `<img src="${prod.imagen}" alt="${prod.nombre}" style="width: 40px; height: 40px; object-fit: contain; background: rgba(255,255,255,0.03); border-radius: 4px; padding: 2px;" onerror="this.style.display='none'">`
                                    : `<div style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.03); border-radius: 4px; color: #94a3b8;"><i data-feather="file" style="width: 18px; height: 18px;"></i></div>`
                                }
                                <div>
                                    <div style="font-weight: 600; color: white; font-size: 0.92rem; line-height: 1.3;">${prod.nombre}</div>
                                    <div style="font-size: 0.78rem; color: #94a3b8; margin-top: 2px;">
                                        <span style="color: #818cf8; font-weight: 500;">${prod.marca || 'Sin Marca'}</span> • 
                                        <span class="tipo-badge-text" style="color: #cbd5e1;">${prod.tipo_label || prod.tipo}</span>
                                    </div>
                                    ${prod.descripcion && prod.descripcion !== prod.nombre ? `<div style="font-size: 0.72rem; color: #64748b; margin-top: 1px; max-width: 350px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${prod.descripcion}</div>` : ''}
                                </div>
                            </div>
                        </td>
                        <td style="padding: 12px 10px; color: #cbd5e1; font-weight: 500; font-size: 0.9rem; vertical-align: middle;">
                            ${medidasTxt || 'Variable'}
                        </td>
                        <td style="padding: 12px 10px; color: #fbbf24; font-weight: 600; font-size: 0.95rem; vertical-align: middle;">
                            ${precioTxt}
                        </td>
                        <td style="padding: 12px 10px; text-align: right; vertical-align: middle;">
                            <button class="btn btn-primary btn-sm" onclick="abrirModalImportar(${idx})" style="padding: 6px 12px; height: auto; font-size: 0.82rem; font-weight: 600; border-radius: 6px;">
                                <i data-feather="download" style="width: 14px; height: 14px;"></i> Importar
                            </button>
                        </td>
                    </tr>
                `;
            });

            productsHtml = `
                <div class="table-container" style="margin-top: 0.5rem; background: rgba(15, 23, 42, 0.4); border-radius: 10px; border: 1px solid rgba(255,255,255,0.06); padding: 0.25rem; overflow-x: auto;">
                    <table style="width: 100%; border-collapse: collapse; min-width: 600px;">
                        <thead>
                            <tr style="border-bottom: 1px solid rgba(255,255,255,0.08); text-align: left;">
                                <th style="padding: 10px; font-size: 0.78rem; color: #94a3b8; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Producto</th>
                                <th style="padding: 10px; font-size: 0.78rem; color: #94a3b8; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Medidas / Gramaje</th>
                                <th style="padding: 10px; font-size: 0.78rem; color: #94a3b8; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Precio Catálogo</th>
                                <th style="padding: 10px; text-align: right; font-size: 0.78rem; color: #94a3b8; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Acción</th>
                            </tr>
                        </thead>
                        <tbody id="grid-catalogo-${provider.id}">
                            ${rowsHtml}
                        </tbody>
                    </table>
                </div>
            `;
        } else {
            const errorMsg = message || 'No se encontraron productos. Probá con otros términos.';
            productsHtml = `
                <div class="catalogo-vacio">
                    <i data-feather="search" style="width:48px;height:48px;opacity:0.3"></i>
                    <p>${errorMsg}</p>
                </div>
            `;
        }

        section.innerHTML = `
            <h3 style="border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.5rem; margin-top: 0; margin-bottom: 1rem; color: #fcd34d; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
                <span style="display: flex; align-items: center; gap: 8px;">
                    <i data-feather="shopping-bag" style="width: 18px; height: 18px; color: #fcd34d;"></i>
                    Catálogo de ${provider.nombre}
                </span>
                <span style="font-size: 0.85rem; color: #cbd5e1; font-weight: 500;">${countText}</span>
            </h3>
            ${productsHtml}
        `;
        container.appendChild(section);
    });

    if (container.innerHTML === '') {
        container.style.display = 'none';
    } else {
        container.style.display = 'block';
    }

    if (typeof feather !== 'undefined') feather.replace();
}

// ─── MODAL DE IMPORTACIÓN ─────────────────────────────────────────────────────
function abrirModalImportar(idx) {
    const prod = catalogoResultados[idx];
    if (!prod) return;

    document.getElementById('imp-nombre').value  = prod.nombre;
    document.getElementById('imp-tipo').value    = prod.tipo;
    document.getElementById('imp-gramaje').value = prod.gramaje || '';
    document.getElementById('imp-ancho').value   = prod.ancho  || '';
    document.getElementById('imp-largo').value   = prod.largo  || '';
    document.getElementById('imp-material').value= prod.marca  || '';
    document.getElementById('imp-precio').value  = '';
    document.getElementById('imp-precio').focus();

    // Guardamos el idx en el botón de confirmar
    document.getElementById('btn-confirmar-importar').dataset.idx = idx;

    const modal = document.getElementById('modal-importar');
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('visible'), 10);
}

function cerrarModalImportar() {
    const modal = document.getElementById('modal-importar');
    modal.classList.remove('visible');
    setTimeout(() => modal.style.display = 'none', 200);
}

async function confirmarImportar() {
    const idx   = parseInt(document.getElementById('btn-confirmar-importar').dataset.idx);
    const prod  = catalogoResultados[idx];
    const precio = parseFloat(document.getElementById('imp-precio').value);

    if (!precio || precio <= 0) {
        mostrarToast('Ingresá un precio válido', 'warn');
        document.getElementById('imp-precio').focus();
        return;
    }

    const payload = {
        tipo:              document.getElementById('imp-tipo').value,
        nombre:            document.getElementById('imp-nombre').value,
        gramaje:           document.getElementById('imp-gramaje').value || null,
        formato_ancho:     document.getElementById('imp-ancho').value   || null,
        formato_largo:     document.getElementById('imp-largo').value   || null,
        material:          document.getElementById('imp-material').value || null,
        costo_unidad:      precio,
        unidades_por_paquete: 1,
        stock_actual:      0,
        stock_minimo:      0,
    };

    const btn = document.getElementById('btn-confirmar-importar');
    btn.disabled = true;
    btn.textContent = 'Guardando...';

    try {
        const res    = await fetch('api/insumos.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const result = await res.json();

        if (result.success) {
            cerrarModalImportar();
            mostrarToast(`✅ "${payload.nombre}" importado correctamente`, 'success');
            // Refrescar insumos si la función existe
            if (typeof cargarStock === 'function') cargarStock();
        } else {
            mostrarToast('Error: ' + result.message, 'error');
        }
    } catch (err) {
        mostrarToast('Error de conexión', 'error');
    } finally {
        btn.disabled = false;
        btn.textContent = 'Importar Insumo';
    }
}

// ─── CRUD PROVEEDORES ─────────────────────────────────────────────────────────
let editProveedorId = null;

async function guardarProveedor() {
    const data = {
        id:       editProveedorId,
        nombre:   document.getElementById('prov-nombre').value.trim(),
        url:      document.getElementById('prov-url').value.trim(),
        logo_url: document.getElementById('prov-logo').value.trim() || null,
        metodo:   document.getElementById('prov-metodo').value,
        notas:    document.getElementById('prov-notas').value.trim() || null,
        activo:   1
    };

    if (!data.nombre || !data.url) {
        mostrarToast('Nombre y URL son obligatorios', 'warn');
        return;
    }

    const res    = await fetch('api/proveedores.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    const result = await res.json();

    if (result.success) {
        mostrarToast(result.message, 'success');
        resetFormProveedor();
        await cargarProveedores();
        // Cerrar panel de formulario si está colapsado
        const formPanel = document.getElementById('panel-form-proveedor');
        if (formPanel) formPanel.style.display = 'none';
    } else {
        mostrarToast(result.message, 'error');
    }
}

function editarProveedor(id) {
    const p = proveedoresList.find(x => parseInt(x.id) === parseInt(id));
    if (!p) return;

    editProveedorId = p.id;
    document.getElementById('prov-nombre').value = p.nombre;
    document.getElementById('prov-url').value    = p.url;
    document.getElementById('prov-logo').value   = p.logo_url || '';
    document.getElementById('prov-metodo').value = p.metodo;
    document.getElementById('prov-notas').value  = p.notas || '';

    // Mostrar panel de formulario
    const formPanel = document.getElementById('panel-form-proveedor');
    if (formPanel) formPanel.style.display = 'block';

    document.getElementById('prov-form-titulo').textContent = `Editando: ${p.nombre}`;
    document.getElementById('prov-nombre').focus();
    document.getElementById('panel-form-proveedor').scrollIntoView({ behavior: 'smooth' });
}

function resetFormProveedor() {
    editProveedorId = null;
    const form = document.getElementById('form-proveedor');
    if (form) form.reset();
    const titulo = document.getElementById('prov-form-titulo');
    if (titulo) titulo.textContent = 'Nuevo Proveedor';
}

async function eliminarProveedor(id) {
    const p = proveedoresList.find(x => parseInt(x.id) === parseInt(id));
    if (!confirm(`¿Eliminar el proveedor "${p?.nombre}"? Esta acción no se puede deshacer.`)) return;

    const res    = await fetch(`api/proveedores.php?id=${id}`, { method: 'DELETE' });
    const result = await res.json();
    if (result.success) {
        mostrarToast(result.message, 'success');
        cargarProveedores();
    } else {
        mostrarToast(result.message, 'error');
    }
}

// ─── TOAST NOTIFICATION ───────────────────────────────────────────────────────
function mostrarToast(mensaje, tipo = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${tipo}`;
    toast.textContent = mensaje;
    container.appendChild(toast);

    setTimeout(() => toast.classList.add('toast-show'), 10);
    setTimeout(() => {
        toast.classList.remove('toast-show');
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}
