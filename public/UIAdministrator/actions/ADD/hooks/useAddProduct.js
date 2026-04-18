import { getSessionData } from "/ICSoftware/public/UIAdministrator/services/getSessionData.js";
import { formComponent } from "/ICSoftware/public/UIAdministrator/actions/ADD/components/formComponent.js";
// Importarás tus servicios aquí
// import { getCategories } from "../../services/getCategories.js";
import { saveProduct } from "/ICSoftware/public/UIAdministrator/actions/ADD/services/saveProductService.js";

export async function useAddProduct() {
    const app = document.getElementById("app");
    const res = await getSessionData();

    if (!res || !res.success || !res.data) {
        app.innerHTML = "<p>No se pudo obtener la sesión. Por favor, inicie sesión nuevamente.</p>";
        return;
    }

    const { rol, sectores } = res.data;
    
    if (rol === "Administrador" || (sectores && sectores.includes("ventas"))) {
        renderForm(app);
    } else {
        app.innerHTML = "<p>Acceso denegado.</p>";
    }
}

async function renderForm(container) {
    container.innerHTML = formComponent();

    // 1. Cargar categorías en el Select (Simulado)
    const selectCat = document.getElementById("select-categories");
    // const categories = await getCategories(); 
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
        categories.map(c => `<option value="${c.id}">${c.name}</option>`).join('');

    // 2. Listener Volver
    document.getElementById("btn-back-main")?.addEventListener("click", () => {
        window.location.href = "/ICSoftware/public/UIAdministrator/tienda.php";
    });

    // 3. Manejo del Formulario
    const form = document.getElementById("form-add-product");
    form?.addEventListener("submit", async (e) => {
        e.preventDefault();
        

        const formData = new FormData(form);
        
        console.log("Hook: Enviando datos del nuevo producto...");
        

        const response = await saveProduct(formData);
        if(response.status === "success") {
             alert("Producto agregado con éxito");
             window.location.href = "tienda.php";
             window.location.href = "/ICSoftware/public/UIAdministrator/tienda.php";
        } else {
             alert("Error al agregar producto: " + response.message);
        }
   
    });

    // 4. Preview de imágenes (Opcional pero útil)
    document.getElementById("product-images")?.addEventListener("change", (e) => {
        const preview = document.getElementById("image-preview");
        preview.innerHTML = "";
        Array.from(e.target.files).forEach(file => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = document.createElement("img");
                img.src = event.target.result;
                img.style.width = "80px";
                img.style.height = "80px";
                img.style.objectFit = "cover";
                preview.appendChild(img);
            };
            reader.readAsDataURL(file);
        });
    });
}

useAddProduct();