export function UsersList(users = []) {
  return `
<div class="user-list-container">
      <div class="table-responsive">
        <table class="user-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Rol</th>
              <th>Sectores</th>
              <th>Acciones</th>
            </tr>
          </thead>

        <tbody>
          ${users.map(u => `
            <tr>
              <td class="user-name">${u.nombre}</td>
              <td><span class="badge-rol">${u.rol}</span></td>
              <td class="user-sectors">${u.sectores.length ? u.sectores.join(", ") : "Sin sectores asignados"}</td>
              <td>
                <button data-id="${u.id}" data-action="edit">✏️</button>
                <button data-id="${u.id}" data-action="delete">🗑</button>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
</div>
  `;
}
