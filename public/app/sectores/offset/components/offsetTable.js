function tieneHoraInicio(fecha) {
  if (!fecha) return false;
  return !fecha.includes("00:00:00");
}

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
          ${data.map(ot => {
            const iniciada = tieneHoraInicio(ot.fecha_inicio_trabajo);

            return `
              <tr>
                <td>${ot.id}</td>
                <td>${ot.cliente}</td>
                <td>${ot.fecha_inicio_trabajo ?? "-"}</td>
                <td>${ot.fecha_fin_trabajo ?? "-"}</td>
                <td class="acciones">

                  ${
                    !iniciada
                      ? `<button class="btn-iniciar" data-id="${ot.id}" title="Comenzar">▶</button>`
                      : `<button class="btn-finalizar" data-id="${ot.id}" title="Finalizar">✔</button>`
                  }

                </td>
              </tr>
            `;
          }).join("")}
        </tbody>
      </table>

      <div id="modal-ot" class="modal hidden">
        <div class="modal-content"></div>
      </div>
    </div>
  `;
}
