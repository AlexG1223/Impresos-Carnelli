export function modalSeleccionOTRepetida(otData) {
  const modalContainer = document.getElementById("modal-OTrepetida");
  if (!modalContainer) return;

  let html = `
    <div class="ot-modal-overlay">
      <div class="ot-modal">

        <div class="ot-modal-header">
          <h5>Seleccionar OT Repetida</h5>
          <button class="ot-modal-close" data-close>&times;</button>
        </div>

        <div class="ot-modal-body">

          <input
            type="text"
            id="buscadorOTRepetida"
            class="buscador-ot-repetida"
            placeholder="Buscar por ID, cliente o vendedor..."
          />

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Vendedor</th>
                <th>Ingreso</th>
                <th>Prometida</th>
                <th>Archivos</th>
              </tr>
            </thead>
            <tbody id="tablaOTRepetidaBody">
  `;

  otData.forEach(ot => {
    html += `
      <tr class="ot-row" data-ot-id="${ot.id}">
        <td>${ot.id}</td>
        <td>${ot.cliente_nombre}</td>
        <td>${ot.vendedor_nombre}</td>
        <td>${ot.fecha_ingreso}</td>
        <td>${ot.fecha_prometida}</td>
        <td>${ot.total_archivos}</td>
      </tr>
    `;
  });

  html += `
            </tbody>
          </table>
        </div>

      </div>
    </div>
  `;

  modalContainer.innerHTML = html;

  activarBuscadorOTRepetida();
}
function activarBuscadorOTRepetida() {
  const input = document.getElementById("buscadorOTRepetida");
  if (!input) return;

  input.addEventListener("input", () => {
    const texto = input.value.toLowerCase();
    const filas = document.querySelectorAll("#tablaOTRepetidaBody tr");

    filas.forEach(fila => {
      const contenido = fila.innerText.toLowerCase();
      fila.style.display = contenido.includes(texto) ? "" : "none";
    });
  });
}
