
export async function getDataUsers() {
    try {
        const response = await fetch('/ICSoftware/public/api/users/read.php', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
        });

        return await response.json();

    } catch (error) {
        console.error("Error:", error);
        return { success: false, message: "Error de conexión" };
    }
}
