export async function getSessionData() {
    try {
        const response = await fetch('/ICSoftware/public/api/administracion/session/getSessionData.php', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
        });

        // Verifica si la respuesta del servidor es exitosa (status 200-299)
        if (!response.ok) {
            throw new Error(`Error en el servidor: ${response.status}`);
        }

        return await response.json();

    } catch (error) {
        console.error("Error detectado:", error);
        return { success: false, message: "Error de conexión o de servidor" };
    }
}

