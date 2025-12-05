export function FormModifyUser(user) {
  return `
  <div class="modal-overlay">
    <div class="modal-card">

      <form id="modifyUserForm" class="form" data-id="${user.id}">

        <div class="field">
          <label>Nombre Completo</label>
          <input name="nombre" type="text" value="${user.nombre}" required>
        </div>

        <div class="field">
          <label>Nueva Contraseña</label>
          <input 
            name="password" 
            type="password"
            placeholder="Dejar vacío para no cambiarla"
          >
        </div>

        <div class="field">
          <label>Rol</label>
          <select name="rol" required>
            <option value="Administrador" ${user.rol === "Administrador" ? "selected" : ""}>Administrador</option>
            <option value="Usuario" ${user.rol === "Usuario" ? "selected" : ""}>Usuario</option>
          </select>
        </div>

        <div class="actions">
          <button type="submit" class="btn-primary">Guardar Cambios</button>
          <button type="button" id="btnCancel" class="btn-secondary">Cancelar</button>
        </div>

      </form>

    </div>
  </div>
  `;
}
