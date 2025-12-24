export function FormCreateUser() {
  return `
  <div class="modal-overlay">
    <div class="modal-card">

      <div class="modal-header">
        <h2>Crear Nuevo Empleado</h2>
      </div>

      <form id="createUserForm" class="form">

        <div class="field">
          <label>Nombre Completo</label>
          <input name="nombre" type="text" required>
        </div>

        <div class="field">
          <label>Contraseña</label>
          <input name="password" type="password" required>
        </div>

        <div class="field">
          <label>Rol</label>
          <select name="rol" required>
            <option value="Administrador">Administrador</option>
            <option value="Usuario">Usuario</option>
          </select>
        </div>

       
        <div class="actions">
          <button type="submit" class="btn-primary">Crear Empleado</button>
          <button type="button" id="btnCancel" class="btn-secondary">Cancelar</button>
        </div>

      </form>

    </div>
  </div>
  `;
}
