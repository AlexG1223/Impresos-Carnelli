
export function TablaOTsVendedor(ots) {
  return `
    <div class="tabla-ots">

      <div class="tabla-header">
        <input
          type="text"
          id="buscadorOTsVendedor"
          placeholder="Buscar OT, cliente, estado..."
          class="buscador-ots"
        />
          <button id="toggleFinalizadas" class="btn-toggle-finalizadas">
    Ocultar finalizadas
  </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID OT</th>
            <th>Cliente</th>
            <th>Fecha Ingreso</th>
            <th>Fecha Prometida</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody id="tablaOTsVendedorBody">
          ${ots.map(ot => `
            <tr data-id="${ot.id_ot}">
              <td>${ot.id_ot}</td>
              <td>${ot.cliente}</td>
              <td>${ot.fecha_ingreso}</td>
              <td>${ot.fecha_prometida ?? '-'}</td>
              <td>
                <span class="badge ${getEstadoClass(ot.estado)}">
                  ${ot.estado}
                </span>
              </td>
              <td class="acciones">
                <button class="btn-ver" data-action="view">👁️</button>
                <button class="btn-editar" data-action="edit">✏️</button>
                <button class="btn-borrar" data-action="delete">🗑️</button>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
    <div id="modalEditarOT" "></div>
  `;
}

/* ===== Helpers ===== */
function getEstadoClass(estado) {
  switch (estado) {
    case 'DISEÑO': return 'badge-diseno';
    case 'OFFSET': return 'badge-offset';
    case 'SERIGRAFIA': return 'badge-serigrafia';
    case 'EXPEDICION': return 'badge-expedicion';
    case 'ENTREGADO': return 'badge-entregado';
    case 'FINALIZADA': return 'badge-finalizada';
    default: return 'badge-default';
  }
}

export function activarBuscadorOTsVendedor() {
  const input = document.getElementById("buscadorOTsVendedor");
  if (!input) return;

  input.addEventListener("keyup", () => {
    const texto = input.value.toLowerCase();
    const filas = document.querySelectorAll("#tablaOTsVendedorBody tr");

    filas.forEach(fila => {
      fila.style.display = fila.innerText.toLowerCase().includes(texto)
        ? ""
        : "none";
    });
  });
}

export function activarToggleFinalizadas() {
  const btn = document.getElementById('toggleFinalizadas');
  if (!btn) return;

  let ocultas = false;

  btn.addEventListener('click', () => {
    const filas = document.querySelectorAll('#tablaOTsVendedorBody tr');

    filas.forEach(fila => {
      const badge = fila.querySelector('.badge-finalizada');

      if (badge) {
        fila.style.display = ocultas ? '' : 'none';
      }
    });

    ocultas = !ocultas;
    btn.textContent = ocultas
      ? 'Mostrar finalizadas'
      : 'Ocultar finalizadas';
  });
}
