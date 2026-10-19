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
                      type="button"
                      class="btn-imprimir-expedicion"
                      onclick="window.open('/public/api/ordenes_trabajo/imprimir.php?id=${ot.id}', '_blank')"
                      title="Imprimir Orden de Trabajo"
                      style="border:none; background:#ede9fe; color:#5b21b6; border-radius:6px; padding:6px 8px; cursor:pointer; font-size:14px; margin-right:4px;"
                    >
                      🖨️
                    </button>
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

