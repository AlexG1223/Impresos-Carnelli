import { getSessionData } from "/ICSoftware/public/UIAdministrator/services/getSessionData.js";
import { ProductList } from "/ICSoftware/public/UIAdministrator/components/ProductList.js";
import { getProductList } from "/ICSoftware/public/UIAdministrator/services/getProductList.js";
import { deleteProduct } from "/ICSoftware/public/UIAdministrator/services/deleteProductService.js";
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
    // 1. Mostrar estado de carga (opcional pero recomendado)
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

    // 4. LISTENERS (Gestionados aquí en el hook una vez el HTML existe)
    
   
       document.getElementById("btn-back-main")?.addEventListener("click", () => {
        window.location.href = " /ICSoftware/public/app";
        // Aquí dispararemos el componente de formulario más adelante
    });
    // Evento Agregar
    document.getElementById("btn-add-main")?.addEventListener("click", () => {
         window.location.href = "/ICSoftware/public/UIAdministrator/actions/ADD/agregarProducto.php";
        // Aquí dispararemos el componente de formulario más adelante
    });

    // Delegación de eventos para la tabla (Editar / Eliminar)
    document.getElementById("product-list-body")?.addEventListener("click", async (e) => {
        const id = e.target.dataset.id;

        // Caso: Eliminar
        if (e.target.classList.contains("action-delete")) {
            if (confirm("¿Deseas eliminar este producto?")) {
                console.log("Hook: Iniciando proceso de eliminación para ID:", id);
                // Aquí llamaremos al servicio de eliminación y luego refrescaremos
                 await deleteProduct(id);
                 renderDashboard(container); 
            }
        }

        // Caso: Editar
        if (e.target.classList.contains("action-edit")) {
            console.log("Hook: Cargando interfaz de edición para ID:", id);
            // lógica para cargar vista de edición...
        }
    });
}

useAdministrator();