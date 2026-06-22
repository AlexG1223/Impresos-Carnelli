let maquinasList = [];
let troquelesList = [];
let editMaquinaId = null;
let editTroquelId = null;

document.addEventListener('DOMContentLoaded', () => {
    cargarMaquinas();
    cargarTroqueles();
    cargarParametros();

    document.getElementById('form-parametros').addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = {
            ganancia: document.getElementById('p_ganancia').value,
            comision: document.getElementById('p_comision').value,
            iva: document.getElementById('p_iva').value
        };

        const res = await fetch('api/parametros.php', {
            method: 'POST',
            body: JSON.stringify(data)
        });
        const result = await res.json();
        if (result.success) {
            alert('¡Parámetros actualizados correctamente!');
            cargarParametros();
        } else {
            alert(result.message);
        }
    });

    document.getElementById('form-maquina').addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = {
            id: editMaquinaId,
            nombre: document.getElementById('m_nombre').value,
            formato_max_ancho: document.getElementById('m_fmax_ancho').value,
            formato_max_largo: document.getElementById('m_fmax_largo').value,
            formato_min_ancho: document.getElementById('m_fmin_ancho').value,
            formato_min_largo: document.getElementById('m_fmin_largo').value,
            medida_pinza: document.getElementById('m_pinza').value,
            costo_hora: document.getElementById('m_costo').value,
            costo_puesta: document.getElementById('m_costo_puesta').value,
            velocidad_por_hora: document.getElementById('m_velocidad').value,
            tipo_calculo: document.getElementById('m_tipo_calculo').value,
            costo_tinta: document.getElementById('m_costo_tinta').value || 0
        };

        const res = await fetch('api/maquinas.php', {
            method: 'POST',
            body: JSON.stringify(data)
        });
        const result = await res.json();
        if (result.success) {
            e.target.reset();
            editMaquinaId = null;
            document.querySelector('#form-maquina button[type="submit"]').innerText = 'Guardar Máquina';
            cargarMaquinas();
        } else {
            alert(result.message);
        }
    });



    document.getElementById('form-troquel').addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = {
            id: editTroquelId,
            nombre: document.getElementById('t_nombre').value,
            ancho: document.getElementById('t_ancho').value,
            largo: document.getElementById('t_largo').value,
            bocas: document.getElementById('t_bocas').value
        };

        const res = await fetch('api/troqueles.php', {
            method: 'POST',
            body: JSON.stringify(data)
        });
        const result = await res.json();
        if (result.success) {
            e.target.reset();
            editTroquelId = null;
            document.querySelector('#form-troquel button[type="submit"]').innerText = 'Guardar Troquel';
            cargarTroqueles();
        } else {
            alert(result.message);
        }
    });
});

async function cargarParametros() {
    const res = await fetch('api/parametros.php');
    const result = await res.json();
    if (result.success && result.data) {
        document.getElementById('p_ganancia').value = result.data.ganancia;
        document.getElementById('p_comision').value = result.data.comision;
        document.getElementById('p_iva').value = result.data.iva;
    }
}

async function cargarMaquinas() {
    const res = await fetch('api/maquinas.php');
    const result = await res.json();
    const tbody = document.querySelector('#tabla-maquinas tbody');
    tbody.innerHTML = '';

    if (result.success && result.data) {
        maquinasList = result.data;
        result.data.forEach(m => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${m.nombre}</td>
                <td>${m.formato_max_ancho} x ${m.formato_max_largo} cm</td>
                <td>$${m.costo_hora}</td>
                <td>$${m.costo_puesta ?? 0}</td>
                <td>${m.velocidad_por_hora ?? 5000}</td>
                <td style="display: flex; gap: 0.5rem;">
                    <button onclick="editarMaquina(${m.id})" class="btn btn-primary" style="padding: 0.2rem 0.5rem; font-size: 0.8rem; height: auto;">Editar</button>
                    <button onclick="eliminarMaquina(${m.id})" class="btn btn-danger" style="padding: 0.2rem 0.5rem; font-size: 0.8rem; height: auto;">Eliminar</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }
}



async function cargarTroqueles() {
    const res = await fetch('api/troqueles.php');
    const result = await res.json();
    const tbody = document.querySelector('#tabla-troqueles tbody');
    tbody.innerHTML = '';

    if (result.success && result.data) {
        troquelesList = result.data;
        result.data.forEach(t => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${t.nombre}</td>
                <td>${t.ancho} cm</td>
                <td>${t.largo} cm</td>
                <td>${t.bocas}</td>
                <td style="display: flex; gap: 0.5rem;">
                    <button onclick="editarTroquel(${t.id})" class="btn btn-primary" style="padding: 0.2rem 0.5rem; font-size: 0.8rem; height: auto;">Editar</button>
                    <button onclick="eliminarTroquel(${t.id})" class="btn btn-danger" style="padding: 0.2rem 0.5rem; font-size: 0.8rem; height: auto;">Eliminar</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }
}

function editarMaquina(id) {
    const m = maquinasList.find(x => parseInt(x.id) === parseInt(id));
    if (!m) return;
    editMaquinaId = m.id;
    document.getElementById('m_nombre').value = m.nombre;
    document.getElementById('m_fmax_ancho').value = m.formato_max_ancho;
    document.getElementById('m_fmax_largo').value = m.formato_max_largo;
    document.getElementById('m_fmin_ancho').value = m.formato_min_ancho;
    document.getElementById('m_fmin_largo').value = m.formato_min_largo;
    document.getElementById('m_pinza').value = m.medida_pinza;
    document.getElementById('m_costo').value = m.costo_hora;
    document.getElementById('m_costo_puesta').value = m.costo_puesta ?? 0;
    document.getElementById('m_velocidad').value = m.velocidad_por_hora ?? 5000;
    
    const tipoCalculoEl = document.getElementById('m_tipo_calculo');
    tipoCalculoEl.value = m.tipo_calculo || 'millares';
    document.getElementById('m_costo_tinta').value = m.costo_tinta ?? 0;
    document.getElementById('m_tinta_container').style.display = (tipoCalculoEl.value === 'unidades') ? 'block' : 'none';

    document.querySelector('#form-maquina button[type="submit"]').innerText = 'Actualizar Máquina';
    document.getElementById('m_nombre').focus();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}



function editarTroquel(id) {
    const t = troquelesList.find(x => parseInt(x.id) === parseInt(id));
    if (!t) return;
    editTroquelId = t.id;
    document.getElementById('t_nombre').value = t.nombre;
    document.getElementById('t_ancho').value = t.ancho;
    document.getElementById('t_largo').value = t.largo;
    document.getElementById('t_bocas').value = t.bocas;

    document.querySelector('#form-troquel button[type="submit"]').innerText = 'Actualizar Troquel';
    document.getElementById('t_nombre').focus();
    const formTop = document.getElementById('form-troquel').getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: formTop - 100, behavior: 'smooth' });
}

async function eliminarMaquina(id) {
    if (!confirm("¿Seguro que deseas eliminar esta máquina?")) return;
    const res = await fetch('api/maquinas.php?id=' + id, { method: 'DELETE' });
    const result = await res.json();
    if (result.success) cargarMaquinas();
}



async function eliminarTroquel(id) {
    if (!confirm("¿Seguro que deseas eliminar este troquel?")) return;
    const res = await fetch('api/troqueles.php', { method: 'DELETE', body: JSON.stringify({id: id}) });
    const result = await res.json();
    if (result.success) cargarTroqueles();
}
