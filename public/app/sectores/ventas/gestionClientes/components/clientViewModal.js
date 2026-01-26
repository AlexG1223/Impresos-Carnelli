export function ClientViewModal(client) {
  return `
    <div class="modal-overlay">
      <div class="modal">
        <h2>Detalle del Cliente</h2>

        <div class="grid">
          <div>
            <label>Nombre / Empresa</label>
            <p>${client.nombre}</p>
          </div>
          <div>
            <label>RUT</label>
            <p>${client.rut}</p>
          </div>
        </div>

        <label>Razón Social</label>
        <p>${client.razon_social}</p>

        <label>Dirección</label>
        <p>${client.direccion}</p>

        <div class="grid">
          <div>
            <label>Localidad</label>
            <p>${client.localidad}</p>
          </div>
          <div>
            <label>Teléfono</label>
            <p>${client.telefono}</p>
          </div>
        </div>

        <label>Observaciones</label>
        <textarea disabled>${client.observaciones ?? ""}</textarea>

        <div class="modal-actions">
          <button id="closeModal">Cerrar</button>
        </div>
      </div>
    </div>
  `;
}
