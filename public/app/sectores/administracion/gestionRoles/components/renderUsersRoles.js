import { UsersPermissList } from "../components/userPermissList.js";
import { getDataUsers } from "../../gestionUsuarios/services/getDataUsersService.js";
import { loadUserSectors } from "../components/loadUserSectors.js";
export let cachedUsers = [];

export async function renderUsersRoles() {
  const container = document.getElementById("usersTable");
  container.innerHTML = '';

  try {
    const result = await getDataUsers(); // <-- TU BACKEND

    if (result.success) {
      cachedUsers = result.users;  // 👈 guardamos todo acá

      container.innerHTML = UsersPermissList(result.users);
      setupUsersListEvents();       // ← eventos para el click
    } else {
      container.innerHTML = `<p>Error cargando usuarios</p>`;
    }

  } catch (err) {
    console.error(err);
    container.innerHTML = `<p>Error del servidor</p>`;
  }
}



function setupUsersListEvents() {
  const list = document.getElementById("roles-users-list");
  if (!list) return;

  list.addEventListener("click", (e) => {
    const item = e.target.closest(".roles-users-item");
    if (!item) return;

    const userId = item.dataset.userId;

    // activar visual
    document
      .querySelectorAll(".roles-users-item")
      .forEach(el => el.classList.remove("active"));
    item.classList.add("active");

    loadUserSectors(userId); // ← acá cargamos la derecha
  });
}
