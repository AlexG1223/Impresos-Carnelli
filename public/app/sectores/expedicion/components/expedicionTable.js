export function expedicionTable(trabajos) {
  return `
    <div class="expedicion-container">
      <h2>Trabajos en Expedición</h2>

      <table class="expedicion-table">
        <thead>
          <tr>
            <th># OT</th>
            <th>Cliente</th>
            <th>Estado</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          ${
            trabajos.map(ot => {
              const estado = ot.estado_expedicion || "PENDIENTE";

              return `
                <tr class="${estado === 'LISTO' ? 'row-listo' : ''}">
                  <td>${ot.id}</td>
                  <td>${ot.cliente}</td>
                  <td>
                    <span class="estado ${estado.toLowerCase()}">
                      ${estado}
                    </span>
                  </td>
                  <td class="acciones">
                    <button
                      class="btn-ver"
                      data-id="${ot.id}"
                      title="Ver detalle"
                    >
                      👁
                    </button>
                  </td>
                </tr>
              `;
            }).join("")
          }
        </tbody>
      </table>
    </div>
  `;
}
