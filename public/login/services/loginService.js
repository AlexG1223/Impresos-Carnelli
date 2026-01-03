export async function loguear(username, password) {
    try {
        const response = await fetch('http://impresoscarnelli.com/public/api/login/login.php', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        return await response.json();

    } catch (error) {
        console.error("Error:", error);
        return { success: false, message: "Error de conexión" };
    }
}
