import { UsersList } from "../components/usersList.js";
import { getDataUsers } from "../services/getDataUsersService.js";
import { FormModifyUser } from "../components/formModifyUser.js";
import { useModifyUser } from "../hooks/useModifyUser.js";
import { bindCloseModal } from "../hooks/useCloseModal.js";
export async function renderUsers() {
  const container = document.getElementById("usersTable");
  container.innerHTML = '';
  try {
    const result = await getDataUsers();

    if (result.success) {
      container.innerHTML = UsersList(result.users);
     setupEventListeners(result.users);
    } else {
      container.innerHTML = `<p>Error cargando usuarios</p>`;
    }

  } catch (err) {
    console.error(err);
    container.innerHTML = `<p>Error del servidor</p>`;
  }
}



function setupEventListeners(users) {
  const table = document.querySelector(".user-list table");

  if (!table) return;

  table.addEventListener("click", (e) => {
    const button = e.target.closest('button');
    if (!button) return; 

    const action = button.getAttribute('data-action');
    const userId = button.getAttribute('data-id');

    if (action === "edit") {
      openEditModal(userId, users);
    }
  });
}


function openEditModal(userId, users) {
  const user = users.find(u => u.id == userId);

  if (user) {
    const modalContainer = document.getElementById("modalContainer");
    modalContainer.innerHTML = FormModifyUser(user); 
  bindCloseModal();
  useModifyUser(user.id); 

  }
}
