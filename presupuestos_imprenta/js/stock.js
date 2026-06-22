let insumosList = [];
let editInsumoId = null;

document.addEventListener('DOMContentLoaded', () => {
    cargarStock();

    document.getElementById('form-stock').addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = {
            id: editInsumoId,
            tipo: document.getElementById('i_tipo').value,
            nombre: document.getElementById('i_nombre').value,
            gramaje: document.getElementById('i_gramaje').value,
            formato_ancho: document.getElementById('i_ancho').value,
            formato_largo: document.getElementById('i_largo').value,
            color: document.getElementById('i_color').value,
            talle: document.getElementById('i_talle').value,
            material: document.getElementById('i_material').value,
            costo_unidad: document.getElementById('i_costo').value,
            unidades_por_paquete: document.getElementById('i_unidades').value,
            stock_actual: document.getElementById('i_stock_actual').value,
            stock_minimo: document.getElementById('i_stock_minimo').value,
            kg_1000: document.getElementById('i_kg_1000').value
        };

        const res = await fetch('api/insumos.php', {
            method: 'POST',
            body: JSON.stringify(data)
        });
        const result = await res.json();
        if (result.success) {
            e.target.reset();
            editInsumoId = null;
            document.querySelector('#form-stock button[type="submit"]').innerHTML = '<i data-feather="save"></i> Guardar Material';
            feather.replace();
            toggleStockFields('papel'); // reset view
            cargarStock();
            if (typeof cargarPapeles === 'function') cargarPapeles();
        } else {
            alert(result.message);
        }
    });
});

function toggleStockFields(tipo) {
    const isPapel = (tipo === 'papel');
    const isBobina = (tipo === 'bobina');
    const isPrendaOtro = (tipo === 'prenda' || tipo === 'otro');
    
    document.getElementById('fg_gramaje').style.display = (isPapel || isBobina) ? 'block' : 'none';
    document.getElementById('fg_ancho').style.display = isPapel ? 'block' : 'none';
    document.getElementById('fg_largo').style.display = isPapel ? 'block' : 'none';
    
    document.getElementById('fg_kg_1000').style.display = isBobina ? 'block' : 'none';
    
    document.getElementById('fg_color').style.display = isPrendaOtro ? 'block' : 'none';
    document.getElementById('fg_talle').style.display = isPrendaOtro ? 'block' : 'none';
    document.getElementById('fg_material').style.display = isPrendaOtro ? 'block' : 'none';

    document.getElementById('fg_unidades').style.display = isBobina ? 'none' : 'block';

    if (isBobina) {
        document.getElementById('lbl_i_costo').innerText = "Costo por Kg ($)";
        document.getElementById('lbl_i_stock_actual').innerText = "Stock Actual (Kg)";
        document.getElementById('lbl_i_stock_minimo').innerText = "Stock Mínimo (Kg)";
        document.getElementById('i_unidades').value = 1;
    } else {
        document.getElementById('lbl_i_costo').innerText = "Costo del Paquete ($)";
        document.getElementById('lbl_i_stock_actual').innerText = "Stock Actual (unids/hojas)";
        document.getElementById('lbl_i_stock_minimo').innerText = "Stock Mínimo (Alerta)";
    }

    if (tipo === 'tinta' || tipo === 'chapa') {
        document.getElementById('fg_ancho').style.display = 'none';
        document.getElementById('fg_largo').style.display = 'none';
    }
}

async function cargarStock() {
    const res = await fetch('api/insumos.php');
    const result = await res.json();
    const tbody = document.querySelector('#tabla-stock tbody');
    tbody.innerHTML = '';

    if (result.success && result.data) {
        // Sort by tipo
        result.data.sort((a, b) => {
            if (a.tipo < b.tipo) return -1;
            if (a.tipo > b.tipo) return 1;
            return 0;
        });
        insumosList = result.data;
        result.data.forEach(i => {
            let extraInfo = '';
            if (i.tipo === 'papel') {
                extraInfo = `${i.formato_ancho}x${i.formato_largo}cm ${i.gramaje}g`;
            } else if (i.tipo === 'bobina') {
                extraInfo = `Rotativa 42cm ${i.gramaje}g | ${i.kg_1000}Kg x1000`;
            } else if (i.tipo === 'tinta' || i.tipo === 'chapa') {
                extraInfo = '-';
            } else {
                extraInfo = `Color: ${i.color || '-'}, Talle: ${i.talle || '-'}, Mat: ${i.material || '-'}`;
            }

            let atributos = [];
            if (i.color) atributos.push(`<span style="background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px; font-size: 0.8rem;">Color: ${i.color}</span>`);
            if (i.talle) atributos.push(`<span style="background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px; font-size: 0.8rem;">Talle: ${i.talle}</span>`);
            if (i.material) atributos.push(`<span style="background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px; font-size: 0.8rem;">Mat: ${i.material}</span>`);
            
            const attrHtml = atributos.length > 0 ? `<div style="display: flex; gap: 4px; flex-wrap: wrap;">${atributos.join('')}</div>` : '-';
            const costoUnit = i.tipo === 'bobina' ? i.costo_unidad : (i.costo_unidad / i.unidades_por_paquete).toFixed(2);
            
            let stockHtml = i.tipo === 'bobina' ? `${i.stock_actual} Kg` : i.stock_actual;
            if (parseFloat(i.stock_actual) <= parseFloat(i.stock_minimo)) {
                stockHtml = `<span style="color: #ef4444; font-weight: bold;"><i data-feather="alert-circle" style="width:14px; height:14px;"></i> ${stockHtml}</span>`;
            }

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td style="text-transform: capitalize;">${i.tipo}</td>
                <td><strong>${i.nombre}</strong></td>
                <td>${attrHtml}</td>
                <td>${i.tipo === 'papel' ? `${i.formato_ancho}x${i.formato_largo}cm ${i.gramaje}g` : (i.tipo === 'bobina' ? `Ancho 42cm ${i.gramaje}g` : '-')}</td>
                <td>${stockHtml}</td>
                <td>$${costoUnit}${i.tipo === 'bobina' ? '/Kg' : ''}</td>
                <td style="display: flex; gap: 0.5rem;">
                    <button onclick="editarStock(${i.id})" class="btn btn-primary" style="padding: 0.2rem 0.5rem; font-size: 0.8rem; height: auto;">Editar</button>
                    <button onclick="eliminarStock(${i.id})" class="btn btn-danger" style="padding: 0.2rem 0.5rem; font-size: 0.8rem; height: auto;">Eliminar</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
        if(typeof feather !== 'undefined') feather.replace();
    }
}

function editarStock(id) {
    const i = insumosList.find(x => parseInt(x.id) === parseInt(id));
    if (!i) return;
    editInsumoId = i.id;
    document.getElementById('i_tipo').value = i.tipo;
    toggleStockFields(i.tipo);

    document.getElementById('i_nombre').value = i.nombre;
    document.getElementById('i_gramaje').value = i.gramaje ?? '';
    document.getElementById('i_ancho').value = i.formato_ancho ?? '';
    document.getElementById('i_largo').value = i.formato_largo ?? '';
    document.getElementById('i_color').value = i.color ?? '';
    document.getElementById('i_talle').value = i.talle ?? '';
    document.getElementById('i_material').value = i.material ?? '';
    document.getElementById('i_costo').value = i.costo_unidad;
    document.getElementById('i_unidades').value = i.unidades_por_paquete;
    document.getElementById('i_stock_actual').value = i.stock_actual ?? 0;
    document.getElementById('i_stock_minimo').value = i.stock_minimo ?? 0;
    document.getElementById('i_kg_1000').value = i.kg_1000 ?? '';

    document.querySelector('#form-stock button[type="submit"]').innerHTML = '<i data-feather="edit-2"></i> Actualizar Material';
    if(typeof feather !== 'undefined') feather.replace();
    
    document.getElementById('i_nombre').focus();
    const ismForm = document.getElementById('form-stock').getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: ismForm - 100, behavior: 'smooth' });
}

async function eliminarStock(id) {
    if (!confirm("¿Seguro que deseas eliminar este material/insumo?")) return;
    const res = await fetch('api/insumos.php?id=' + id, { method: 'DELETE' });
    const result = await res.json();
    if (result.success) {
        cargarStock();
        if (typeof cargarPapeles === 'function') cargarPapeles();
    }
}


