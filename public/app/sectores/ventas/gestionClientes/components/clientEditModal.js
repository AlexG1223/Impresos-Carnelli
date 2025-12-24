export function ClientEditModal(client) {
  return `
    <div class="modal-overlay">
      <div class="modal">
        <h2>Editar Cliente</h2>

        <form id="editClientForm">
          <input type="hidden" name="id" value="${client.id}" />

          <label>Nombre / Empresa *</label>
          <input name="nombre_empresa" value="${client.nombre_empresa}" required />

          <label>RUT *</label>
          <input name="rut" value="${client.rut}" required />

          <label>Razón Social *</label>
          <input name="razon_social" value="${client.razon_social}" required />

          <label>Dirección *</label>
          <input name="direccion" value="${client.direccion}" required />

          <div class="grid">
            <div>
              <label>Localidad *</label>
              <input name="localidad" value="${client.localidad}" required />
            </div>
            <div>
              <label>Teléfono *</label>
              <input name="telefono" value="${client.telefono}" required />
            </div>
          </div>

          <label>Observaciones</label>
          <textarea name="observaciones">${client.observaciones ?? ""}</textarea>

          <div class="modal-actions">
            <button type="submit">Actualizar Cliente</button>
            <button type="button" id="closeModal">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  `;
}
