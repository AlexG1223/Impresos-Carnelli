
export async function getDataUsers() {
    try {
        const response = await fetch('/ICSoftware/public/api/administracion/.php', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
           // body: JSON.stringify({ username, password })
        });

        return await response.json();

    } catch (error) {
        console.error("Error:", error);
        return { success: false, message: "Error de conexión" };
    }
}
