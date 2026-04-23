import { getSessionData } from "../services/getSessionData.js";
import { ProductList } from "../components/ProductList.js";
import { getProductList } from "../services/getProductList.js";
import { deleteProduct } from "../services/deleteProductService.js";
import { updateProduct } from "../services/updateProductService.js";

export async function useAdministrator() {
    const app = document.getElementById("app");
    const res = await getSessionData();

    if (!res || !res.success || !res.data) {
        app.innerHTML = "<p>No se pudo obtener la sesión. Por favor, inicie sesión nuevamente.</p>";
        return;
    }

    const { rol, sectores } = res.data;
    
    // Validación de permisos para el sector ventas o administrador
    if (rol === "Administrador" || (sectores && sectores.includes("ventas"))) {
        renderDashboard(app);
    } else {
        app.innerHTML = "<p>Acceso denegado.</p>";
    }
}

async function renderDashboard(container) {
    // 1. Mostrar estado de carga
    container.innerHTML = "<p>Cargando productos...</p>";

    // 2. Obtener datos reales desde el servicio
    const response = await getProductList();
    console.log("Hook: Respuesta del servicio getProductList:", response);

    if (!response.success) {
        container.innerHTML = `<p>Error al cargar el listado: ${response.message}</p>`;
        return;
    }

    // 3. Renderizar componentes con la data real
    container.innerHTML = ProductList(response.data);

    // 4. LISTENERS
    
    document.getElementById("btn-back-main")?.addEventListener("click", () => {
        window.location.href = "/public/app";
    });

    document.getElementById("btn-add-main")?.addEventListener("click", () => {
         window.location.href = "/public/UIAdministrator/actions/ADD/agregarProducto.php";
    });

    // Delegación de eventos para la tabla
    const listBody = document.getElementById("product-list-body");
    
    listBody?.addEventListener("click", async (e) => {
        const id = e.target.dataset.id;

        // Caso: Eliminar
        if (e.target.classList.contains("action-delete")) {
            if (confirm("¿Deseas eliminar este producto?")) {
                await deleteProduct(id);
                renderDashboard(container); 
            }
        }

        // Caso: Editar
        if (e.target.classList.contains("action-edit")) {
            window.location.href = `/public/UIAdministrator/actions/EDIT/editarProducto.php?id=${id}`;
        }
    });

    // Evento Toggle Status
    listBody?.querySelectorAll(".toggle-status").forEach(checkbox => {
        checkbox.addEventListener("change", async (e) => {
            const id = e.target.dataset.id;
            const isActive = e.target.checked ? 1 : 0;
            
            console.log(`Cambiando estado de producto ${id} a ${isActive}`);
            const res = await updateProduct({ id, is_active: isActive });
            
            if (res.status !== "success") {
                alert("Error al actualizar el estado: " + res.message);
                e.target.checked = !e.target.checked; // Revertir si falla
            }
        });
    });
}

useAdministrator();