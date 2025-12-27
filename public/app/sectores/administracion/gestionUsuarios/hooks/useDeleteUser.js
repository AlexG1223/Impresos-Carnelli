import { DeleteUserService } from "../services/DeleteUserService.js";
import { renderUsers } from "../components/renderUsers.js";

export async function useDeleteUser(user_id) {
  const form = document.getElementById("deleteUserForm");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
 if (user_id === 1) {
      alert("No se puede eliminar este usuario ");
      document.getElementById("modalContainer").innerHTML = ""; 
      return;  
    }
    try {
      const result = await DeleteUserService(user_id);  

      if (result.success) {
        alert("Usuario eliminado correctamente ✅");
        document.getElementById("modalContainer").innerHTML = ""; 
        renderUsers(); 
      } else {
        alert(result.message || "Error al eliminar el usuario");
      }
    } catch (err) {
      console.error(err);
      alert("Error en el servidor");
    }
  });
}