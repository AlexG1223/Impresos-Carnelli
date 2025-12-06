export function FormCreateClient() {
  return `
  <div class="modal-overlay">
    <div class="modal-card">

      <div class="modal-header">
        <h2>Nuevo Cliente</h2>
      </div>

      <form id="createClientForm" class="form">

        <div class="form-grid-2">
          <div class="field">
            <label>Nombre / Empresa *</label>
            <input name="nombre" type="text" required>
          </div>

          <div class="field">
            <label>RUT *</label>
            <input name="rut" type="text" required>
          </div>
        </div>

        <div class="field">
          <label>Razón Social *</label>
          <input name="razon_social" type="text" required>
        </div>

        <div class="field">
          <label>Dirección *</label>
          <input name="direccion" type="text" required>
        </div>

        <div class="form-grid-2">
          <div class="field">
            <label>Localidad *</label>
            <input name="localidad" type="text" required>
          </div>

          <div class="field">
            <label>Teléfono *</label>
            <input name="telefono" type="text" required>
          </div>
        </div>

        <div class="field">
          <label>Observaciones Internas</label>
          <textarea 
            name="observaciones" 
            placeholder="Notas adicionales sobre el cliente..."
          ></textarea>
        </div>

        <div class="actions">
          <button type="submit" class="btn-primary">Crear Cliente</button>
          <button type="button" id="btnCancel" class="btn-secondary">Cancelar</button>
        </div>

      </form>

    </div>
  </div>
  `;
}
