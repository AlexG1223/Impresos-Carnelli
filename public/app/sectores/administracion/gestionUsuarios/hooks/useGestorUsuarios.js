import { FormCreateUser } from "../components/formCreateUser.js";
import { createUserService } from "../services/setUserService.js";
import { renderUsers } from "../components/renderUsers.js";
import { bindCloseModal } from "../hooks/useCloseModal.js";
import { loadViewCSS } from "https://impresoscarnelli.com/public/app/utils/viewCssManager.js";


export function gestionUsuarios() {
  loadViewCSS("sectores/administracion/gestionUsuarios/styles/gestionUsuarios.css");
  const root = document.getElementById("section-sh");
root.innerHTML ='';
  root.innerHTML = `
    <div class="users-header">
      <div>
        <h1>Gestión de Usuarios</h1>
      </div>

      <button id="btnNewUser" class="btn-primary">
        + Crear Nuevo Empleado
      </button>
    </div>

    <div id="usersTable"></div>

    <div id="modalContainer"></div>
  `;

renderUsers();
  bindCreateUser();
  //bindSearch();
}

function bindCreateUserForm() {
  const form = document.getElementById("createUserForm");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    const user = {
      nombre: formData.get("nombre").trim(),
      password: formData.get("password"),
      rol: formData.get("rol"),
    };

    try {
      const result = await createUserService(user);

      if (result.success) {
        alert("Usuario creado correctamente ✅");
        document.getElementById("modalContainer").innerHTML = "";
         renderUsers();   
      } else {
        alert(result.message || "Error al crear el usuario");
      }
    } catch (err) {
      console.error(err);
      alert("Error en el servidor");
    }
  });
}


function bindCreateUser() {
  const btn = document.getElementById("btnNewUser");
  const modal = document.getElementById("modalContainer");

  btn.addEventListener("click", () => {
    modal.innerHTML = FormCreateUser();
    bindCloseModal();
    bindCreateUserForm(); 
  });
}




