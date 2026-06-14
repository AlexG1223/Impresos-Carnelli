// public/UIAdministrator/services/updateProductService.js

export async function updateProduct(data) {
    try {
        const isFormData = data instanceof FormData;
        const options = {
            method: 'POST',
            body: isFormData ? data : JSON.stringify(data)
        };

        if (!isFormData) {
            options.headers = { 'Content-Type': 'application/json' };
        }

        const response = await fetch('/public/tienda/api/actions/updateProduct.php', options);

        if (!response.ok) {
            throw new Error(`Error en el servidor: ${response.status}`);
        }

        return await response.json();

    } catch (error) {
        console.error("Error al actualizar producto:", error);
        return { status: 'error', message: 'Error de conexión con el servidor.' };
    }
}
