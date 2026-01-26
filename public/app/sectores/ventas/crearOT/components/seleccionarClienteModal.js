export function seleccionarClienteModal(clientes = []) {
  return `
    <div class="modal-overlay">
      <div class="modal">
        <h3>Seleccionar Cliente</h3>

        <ul class="client-list">
          ${clientes.map(c => `
            <li 
              data-id="${c.id}" 
              data-nombre="${c.nombre}"
            >
              <strong>${c.nombre || ""}</strong><br/>
              <small>${c.empresa}</small>
            </li>
          `).join("")}
        </ul>

        <button id="cerrarModalCliente">Cerrar</button>
      </div>
    </div>
  `;
}
