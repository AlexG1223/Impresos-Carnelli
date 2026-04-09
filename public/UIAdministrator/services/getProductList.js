export async function getSessionData() {
    try {
        const response = await fetch('http://localhost/eCommerce/public_html/api/actions/getProductList.php', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
        });

   
        if (!response.ok) {
            throw new Error(`Error en el servidor: ${response.status}`);
        }

        return await response.json();

    } catch (error) {
        console.error("Error detectado:", error);
        return { success: false, message: "Error de conexión o de servidor" };
    }
}

