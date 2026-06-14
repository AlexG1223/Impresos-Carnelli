export function expedicionTable(trabajos) {
  return `
    <div class="expedicion-container">
      <h2>Trabajos en Expedición</h2>

      <div class="buscador-container">
        <input
          type="text"
          id="buscadorExpedicion"
          placeholder="Buscar OT, cliente, vendedor..."
          class="buscador-input"
        />
      </div>

      <table class="expedicion-table">
        <thead>
          <tr>
            <th># OT</th>
            <th>Cliente</th>
            <th>Vendedor</th>
            <th>Estado</th>
            <th></th>
          </tr>
        </thead>

        <tbody id="expedicionTableBody">
          ${
            trabajos.map(ot => {
              const estado = ot.estado_expedicion || "PENDIENTE";

              return `
                <tr class="${estado === 'LISTO' ? 'row-listo' : ''}">
                  <td>${ot.id}</td>
                  <td>${ot.cliente}</td>
                  <td>${ot.vendedor || '-'}</td>
                  <td>
                    <span class="estado ${estado.toLowerCase()}">
                      ${estado}
                    </span>
                  </td>
                  <td class="acciones">
                    <button
                      class="btn-ver-expedicion"
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

export function activarBuscadorExpedicion() {
  const input = document.getElementById("buscadorExpedicion");
  if (!input) return;

  input.addEventListener("keyup", () => {
    const texto = input.value.toLowerCase();
    const filas = document.querySelectorAll("#expedicionTableBody tr");

    filas.forEach(fila => {
      const contenido = fila.innerText.toLowerCase();
      fila.style.display = contenido.includes(texto) ? "" : "none";
    });
  });
}

