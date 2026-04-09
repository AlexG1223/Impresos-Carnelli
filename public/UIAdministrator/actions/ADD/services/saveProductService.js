// /ICSoftware/public/UIAdministrator/actions/ADD/services/saveProductService.js

export async function saveProduct(formData) {
    try {
        const response = await fetch('http://localhost/eCommerce/public_html/api/actions/saveProduct.php', {
            method: 'POST',
            body: formData // No enviar headers de Content-Type aquí
        });

        if (!response.ok) {
            throw new Error(`Error en el servidor: ${response.status}`);
        }

        return await response.json();

    } catch (error) {
        console.error("Error al guardar producto:", error);
        return { success: false, message: "Error de conexión con el servidor" };
    }
}