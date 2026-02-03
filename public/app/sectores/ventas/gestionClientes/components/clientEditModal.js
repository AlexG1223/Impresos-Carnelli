export function ClientEditModal(client) {
  return `
    <div class="modal-overlay">
      <div class="modal">
        <h2>Editar Cliente</h2>

        <form id="editClientForm">
          <input type="hidden" name="id" value="${client.id}" />

          <label>Nombre </label>
          <input name="nombre" value="${client.nombre}" required />

          <label>Empresa </label>
          <input name="empresa" value="${client.empresa}"  />

          <label>RUT *</label>
          <input name="rut" value="${client.rut}"  />

          <label>Razón Social *</label>
          <input name="razon_social" value="${client.razon_social}"  />

          <label>Dirección *</label>
          <input name="direccion" value="${client.direccion}"  />

          <div class="grid">
            <div>
              <label>Localidad</label>
              <input name="localidad" value="${client.localidad}"  />
            </div>

            <div>
              <label>Departamento </label>
              <input name="departamento" value="${client.departamento}"  />
            </div>

            <div>
              <label>Teléfono *</label>
              <input name="telefono" value="${client.telefono}"  />
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
