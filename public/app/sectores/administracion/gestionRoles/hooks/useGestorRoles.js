import { renderUsersRoles } from "../components/renderUsersRoles.js";

export function gestionRoles() {
  const root = document.getElementById("section-sh");
root.innerHTML ='';
  root.innerHTML = `
    <div class="users-header">
      <div>
        <h1>Asignación de Roles y Permisos</h1>
        <p>Define qué sectores son accesibles para cada usuario</p>
      </div>
    </div>

    <div class="users-content">
          <div id="usersTable"></div>
          <div id="userPermiss"></div>
    </div>


    <div id="modalContainer"></div>
  `;

renderUsersRoles();
}
