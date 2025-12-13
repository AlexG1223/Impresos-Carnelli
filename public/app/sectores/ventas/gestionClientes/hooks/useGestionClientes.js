//import { FormCreateUser } from "../components/formCreateUser.js";
import { createClientService } from "../services/createClientService.js";

//import { renderUsers } from "../components/renderUsers.js";
import { bindCloseModal } from "../../../administracion/gestionUsuarios/hooks/useCloseModal.js";
import { FormCreateClient } from "../components/formCreateClient.js";
import { useClients } from "../hooks/useClients.js";


export function gestionClientes() {
  const root = document.getElementById("section-sh");
root.innerHTML ='';
  root.innerHTML = `
    <div class="users-header">
      <div>
        <h1>Gestión de Clientes</h1>
      </div>

      <button id="btnNewClient" class="btn-primary">
        + Crear Nuevo Cliente
      </button>
    </div>

    <div id="clientTable"></div>

    <div id="modalContainer"></div>
  `;

  bindCreateClient();
    useClients();
}

export function bindCreateClientForm() {
  const form = document.getElementById("createClientForm");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fd = new FormData(form);

    const client = {
      nombre: fd.get("nombre").trim(),
      rut: fd.get("rut").trim(),
      razon_social: fd.get("razon_social").trim(),
      direccion: fd.get("direccion").trim(),
      departamento: fd.get("departamento").trim(),
      localidad: fd.get("localidad").trim(),
      telefono: fd.get("telefono").trim(),
      observaciones: fd.get("observaciones")?.trim() || ""
    };

    try {
      const result = await createClientService(client);

      if (result.success) {
        alert("Cliente creado correctamente ✅");

        document.getElementById("modalContainer").innerHTML = "";
        
     useClients()

      } else {
        alert(result.message || "Error al crear el cliente");
      }

    } catch (err) {
      console.error(err);
      alert("Error en el servidor");
    }
  });
}



function bindCreateClient() {
  const btn = document.getElementById("btnNewClient");
  const modal = document.getElementById("modalContainer");

  btn.addEventListener("click", () => {
    modal.innerHTML = FormCreateClient();
    bindCloseModal();
bindCreateClientForm(); 
  });
}