import { ModifyUserService } from "../services/modifyUserService.js";
import { renderUsers } from "../components/renderUsers.js";
export async function useModifyUser(user_id) 
{
const form = document.getElementById("modifyUserForm");
if (!form) return;
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const updatedUser = {
      id: user_id,
      nombre: formData.get("nombre").trim(),
      password: formData.get("password"),
      rol: formData.get("rol"),
    };
    try {
      const result = await ModifyUserService(updatedUser);
        if (result.success) {
            alert("Usuario modificado correctamente ✅");
            document.getElementById("modalContainer").innerHTML = "";
            renderUsers();   
        } else {
            alert(result.message || "Error al modificar el usuario");
        }
    } catch (err) {
      console.error(err);
      alert("Error en el servidor");
    }
    }); 
}