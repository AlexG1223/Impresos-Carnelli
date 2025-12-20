export function offsetTable(data) {

  if (!data || data.length === 0) {
    return `
      <div class="card">
        <h3>Trabajos en Proceso</h3>
        <p>No hay trabajos en producción.</p>
      </div>
    `;
  }

  return `
    <div class="card">
      <h3>Trabajos en Proceso</h3>

      <table class="table">
        <thead>
          <tr>
            <th>OT</th>
            <th>Cliente</th>
            <th>Hora Inicio</th>
            <th>Hora Finalización</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          ${data.map(ot => `
            <tr>
              <td>${ot.id}</td>
              <td>${ot.cliente}</td>
              <td>${ot.fecha_inicio_trabajo ?? "-"}</td>
              <td>${ot.fecha_fin_trabajo ?? "-"}</td>
              <td class="acciones">

                <button 
                  class="btn-iniciar"
                  data-id="${ot.id}"
                  title="Iniciar OT">
                  ▶
                </button>

                <button 
                  class="btn-finalizar"
                  data-id="${ot.id}"
                  title="Finalizar OT">
                  ✔
                </button>

                <button 
                  class="btn-detalle"
                  data-id="${ot.id}"
                  title="Ver detalle">
                  ℹ
                </button>

              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>

      <!-- Modal OT -->
      <div id="modal-ot" class="modal hidden">
        <div class="modal-content"></div>
      </div>
    </div>
  `;
}
