
export function UsersPermissList(users = []) {
  return `
    <div class="roles-users-wrapper">
      <h2 class="roles-users-title">Empleados</h2>

      <ul class="roles-users-list" id="roles-users-list">
        ${users.map(u => `
          <li class="roles-users-item" data-user-id="${u.id}">
            <div class="roles-users-info">
              <span class="roles-users-name">${u.nombre}</span>
              <span class="roles-users-role">${u.rol ?? "Sin rol"}</span>
            </div>

            <div class="roles-users-icon">
              <i class="ri-shield-check-line"></i>
            </div>
          </li>
        `).join("")}
      </ul>
    </div>
  `;
}
