export function TablaOTs(ots) {
  return `
    <div class="tabla-ots">
      <table>
        <thead>
          <tr>
            <th>ID OT</th>
            <th>Cliente</th>
            <th>Vendedor</th>
            <th>Fecha Ingreso</th>
            <th>Fecha Prometida</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          ${ots.map(ot => `
            <tr>
              <td>${ot.id_ot}</td>
              <td>${ot.cliente}</td>
              <td>${ot.vendedor}</td>
              <td>${ot.fecha_ingreso}</td>
              <td>${ot.fecha_prometida ?? '-'}</td>
              <td>
                <span class="badge ${getEstadoClass(ot.estado)}">
                  ${ot.estado}
                </span>
              </td>
              <td class="acciones">
                <button class="btn-ver" data-id="${ot.id_ot}">
                  👁️
                </button>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

/* ===== Helpers ===== */
function getEstadoClass(estado) {
  switch (estado) {
    case 'DISEÑO':
      return 'badge-diseno';
    case 'OFFSET':
      return 'badge-offset';
    case 'SERIGRAFIA':
      return 'badge-serigrafia';
    case 'EXPEDICION':
      return 'badge-expedicion';
    case 'ENTREGADO':
      return 'badge-entregado';
    default:
      return 'badge-default';
  }
}
