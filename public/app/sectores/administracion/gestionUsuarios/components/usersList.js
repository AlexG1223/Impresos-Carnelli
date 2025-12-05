export function UsersList(users = []) {
  return `
    <div class="user-list">
      <div class="top-bar">
        <input type="text" id="searchUser" placeholder="Buscar por nombre o usuario..." />
        <button id="btnNewUser">+ Crear Nuevo Empleado</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Usuario</th>
            <th>Rol</th>
            <th>Sectores</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          ${users.map(u => `
            <tr>
              <td>${u.nombre}</td>
              <td>${u.usuario}</td>
              <td><span class="badge">${u.rol}</span></td>
              <td>${u.sectores.join(", ")}</td>
              <td class="${u.estado === "activo" ? "ok" : "off"}">✔ ${u.estado}</td>
              <td>
                <button data-id="${u.id}" data-action="edit">✏️</button>
                <button data-id="${u.id}" data-action="delete">🗑</button>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}
