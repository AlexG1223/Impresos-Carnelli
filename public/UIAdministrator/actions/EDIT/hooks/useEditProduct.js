import { getSessionData } from "../../../services/getSessionData.js";
import { editFormComponent } from "../components/editFormComponent.js";
import { updateProduct } from "../../../services/updateProductService.js";

export async function useEditProduct() {
    const app = document.getElementById("app");
    const res = await getSessionData();

    if (!res || !res.success || !res.data) {
        app.innerHTML = "<p>No se pudo obtener la sesión. Por favor, inicie sesión nuevamente.</p>";
        return;
    }

    const { rol, sectores } = res.data;
    
    if (rol === "Administrador" || (sectores && sectores.includes("ventas"))) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        
        if (!productId) {
            app.innerHTML = "<p>ID de producto no proporcionado.</p>";
            return;
        }

        renderEditForm(app, productId);
    } else {
        app.innerHTML = "<p>Acceso denegado.</p>";
    }
}

async function renderEditForm(container, productId) {
    container.innerHTML = "<p>Cargando datos del producto...</p>";

    // Obtener datos del producto
    const productRes = await fetch(`/public/tienda/api/products.php?action=detail&id=${productId}`);
    const productData = await productRes.json();

    if (!productData.success) {
        container.innerHTML = `<p>Error: ${productData.message}</p>`;
        return;
    }

    container.innerHTML = editFormComponent(productData.data);

    // 1. Cargar categorías (Simulado - debería ser un servicio)
    const selectCat = document.getElementById("select-categories");
    const categories = [
        {id: 1, name: 'Cafeterías'},
        {id: 2, name: 'Confiterías'},
        {id: 3, name: 'Fakeaway'},
        {id: 4, name: 'Fast food'},
        {id: 5, name: 'Food trucks'},
        {id: 6, name: 'Hamburgueserías'},
        {id: 7, name: 'Panaderías'},
        {id: 8, name: 'Pastelerías'},
        {id: 9, name: 'Pizzerías'},
        {id: 10, name: 'Restaurantes'}
    ];
    selectCat.innerHTML = '<option value="">Seleccione una categoría</option>' + 
        categories.map(c => `<option value="${c.id}" ${c.id == productData.data.category_id ? 'selected' : ''}>${c.name}</option>`).join('');

    // 2. Listener Volver
    document.getElementById("btn-back-main")?.addEventListener("click", () => {
        window.location.href = "/public/UIAdministrator/tienda.php";
    });

    // 3. Manejo del Formulario
    const form = document.getElementById("form-edit-product");
    
    // Delegación para acciones de imágenes
    const imagePreview = document.getElementById("image-preview");
    imagePreview?.addEventListener("click", (e) => {
        const item = e.target.closest(".image-item");
        if (!item) return;

        // Caso: Marcar como Portada
        if (e.target.classList.contains("set-primary")) {
            // Resetear previos
            imagePreview.querySelectorAll(".image-item").forEach(el => {
                el.classList.remove("is-primary");
                el.querySelector(".set-primary").textContent = "☆";
                el.querySelector("input[name='primary_image']").checked = false;
            });
            // Setear actual
            item.classList.add("is-primary");
            e.target.textContent = "⭐";
            item.querySelector("input[name='primary_image']").checked = true;
        }

        // Caso: Eliminar imagen
        if (e.target.classList.contains("delete-image")) {
            item.classList.toggle("to-delete");
            const isDeleting = item.classList.contains("to-delete");
            e.target.textContent = isDeleting ? "♻️" : "❌";
            e.target.title = isDeleting ? "Restaurar imagen" : "Eliminar imagen";
        }
    });

    form?.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        
        // Agregar imágenes marcadas para eliminar
        imagePreview.querySelectorAll(".image-item.to-delete").forEach(item => {
            formData.append("delete_images[]", item.dataset.url);
        });

        console.log("Hook: Actualizando producto e imágenes...");
        const response = await updateProduct(formData);
        
        if(response.status === "success") {
             alert("Producto actualizado con éxito");
             window.location.href = "/public/UIAdministrator/tienda.php";
        } else {
             alert("Error al actualizar producto: " + response.message);
        }
    });

    // 4. Preview de nuevas imágenes
    document.getElementById("product-images")?.addEventListener("change", (e) => {
        const preview = document.getElementById("new-images-preview");
        preview.innerHTML = "";
        Array.from(e.target.files).forEach(file => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const div = document.createElement("div");
                div.className = "image-item";
                div.innerHTML = `<img src="${event.target.result}" style="width: 100%; height: 100%; object-fit: cover;">`;
                preview.appendChild(div);
            };
            reader.readAsDataURL(file);
        });
    });
}

useEditProduct();
