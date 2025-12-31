// components/otRepetidaModal.js
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
            <tbody>
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
}
