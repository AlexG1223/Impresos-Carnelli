import { cachedUsers } from "../components/renderUsersRoles.js"; 
import { saveUserSectorsService } from "../services/saveUserSectorsService.js";

export function loadUserSectors(userId) {
  const container = document.getElementById("userPermiss");
  container.innerHTML = "Cargando...";

  const user = cachedUsers.find(u => u.id == userId);
  if (!user) {
    container.innerHTML = "<p>Error: Usuario no encontrado</p>";
    return;
  }

  const sectores = [
    "Ventas",
    "Diseño",
    "Offset",
    "Serigrafía",
    "Expedición",
  ];

  container.innerHTML = `
    <div class="permissions-wrapper">
      <h2 class="permissions-title">Permisos de ${user.nombre}</h2>

      <label class="permissions-label">Rol Actual</label>
      <div class="permissions-role-box">
        ${user.rol ?? "Sin rol"}
      </div>

      <label class="permissions-label">Sectores Accesibles</label>

      <div class="permissions-sectors-list">
        ${sectores.map(nombre => `
          <label class="permissions-item">
            <input 
              type="checkbox"
              class="permissions-check"
              data-sector-name="${nombre}"
              ${user.sectores.includes(nombre) ? "checked" : ""}
            >
            <span>${nombre}</span>

            ${
              user.sectores.includes(nombre)
              ? '<i class="ri-check-line permissions-check-icon"></i>'
              : ""
            }
          </label>
        `).join("")}
      </div>

      <button class="permissions-save-btn" data-save-id="${userId}">
        Guardar Permisos
      </button>
    </div>
  `;

  setupPermissionEvents(user);
}



function setupPermissionEvents(user) {
  const container = document.getElementById("userPermiss");

  const saveBtn = container.querySelector(".permissions-save-btn");
  saveBtn.addEventListener("click", async () => {

    const selected = [...container.querySelectorAll(".permissions-check:checked")]
      .map(el => el.dataset.sectorName);

    console.log("SECTORES A GUARDAR PARA", user.id, selected);

    // 🔹 Guardar en el backend
    const r = await saveUserSectorsService(user.id, selected);
    console.log("Respuesta del backend:", r);

    if (!r.success) {
      alert("Error al guardar permisos");
      return;
    }

    // 🔹 ACTUALIZAR cachedUsers dinámicamente
    const index = cachedUsers.findIndex(u => u.id == user.id);
    if (index !== -1) {
      cachedUsers[index].sectores = selected;
    }

    // 🔹 Re-renderizar la vista de permisos SIN recargar la página
    loadUserSectors(user.id);

    // 🔹 Feedback opcional
    showSavedFeedback();
  });
}


// --- Feedback visual ---
function showSavedFeedback() {
  const container = document.getElementById("userPermiss");
  const msg = document.createElement("div");

  msg.className = "saved-feedback";
  msg.textContent = "Permisos guardados ✔️";

  container.appendChild(msg);

  setTimeout(() => msg.remove(), 1500);
}
