export function FormDeleteUser(user) {
  return `
  <div class="modal-overlay">
    <div class="modal-card">

      <div class="modal-header">
        <h2>Eliminar Usuario</h2>
      </div>

      <p>¿Estás seguro de que quieres eliminar al usuario <strong>${user.nombre}</strong>?</p>

      <form id="deleteUserForm">
        <div class="actions">
          <button type="submit" class="btn-danger">Eliminar</button>
          <button type="button" id="btnCancel" class="btn-secondary">Cancelar</button>
        </div>
      </form>

    </div>
  </div>
  `;
}
