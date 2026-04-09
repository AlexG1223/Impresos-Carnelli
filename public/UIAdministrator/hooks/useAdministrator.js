import { getSessionData } from "/ICSoftware/public/UIAdministrator/services/getSessionData.js";
import { ProductList } from "/ICSoftware/public/UIAdministrator/components/ProductList.js";

export async function useAdministrator() {
    const app = document.getElementById("app");
    const res = await getSessionData();

    if (!res || !res.success || !res.data) {
        app.innerHTML = "<p>No se pudo obtener la sesión. Por favor, inicie sesión nuevamente.</p>";
        return;
    }

    const { rol, sectores } = res.data;
    if (rol === "Administrador" || (sectores && sectores.includes("ventas"))) {
        renderDashboard(app);
    } else {
        app.innerHTML = "<p>Acceso denegado.</p>";
    }
}

async function renderDashboard(container) {
    // 1. Obtener datos (Simulado de momento)
    const products = []; 

    // 2. Renderizar componentes en el DOM
    container.innerHTML = ProductList(products);

    // 3. LISTENERS (Gestionados aquí en el hook)
    
    // Evento Agregar
    document.getElementById("btn-add-main")?.addEventListener("click", () => {
        console.log("Hook: Navegando a agregar...");
        // lógica para mostrar formulario...
    });

    // Delegación de eventos para la tabla
    document.getElementById("product-list-body")?.addEventListener("click", (e) => {
        const id = e.target.dataset.id;

        if (e.target.classList.contains("action-delete")) {
            if (confirm("¿Deseas eliminar este producto?")) {
                console.log("Hook: Eliminando ID", id);
                // llamar a service.delete y re-renderizar
            }
        }

        if (e.target.classList.contains("action-edit")) {
            console.log("Hook: Editando ID", id);
            // lógica para cargar edición...
        }
    });
}

useAdministrator();