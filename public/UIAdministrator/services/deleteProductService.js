// /ICSoftware/public/UIAdministrator/services/deleteProductService.js

export async function deleteProduct(id) {
    try {
        const response = await fetch('http://localhost/eCommerce/public_html/api/actions/deleteProduct.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id })
        });

        if (!response.ok) {
            throw new Error(`Error en el servidor: ${response.status}`);
        }

        return await response.json();

    } catch (error) {
        console.error("Error al eliminar producto:", error);
        return { status: 'error', message: 'Error de conexión con el servidor.' };
    }
}