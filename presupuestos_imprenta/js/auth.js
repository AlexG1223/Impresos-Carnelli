// js/auth.js

// Prevenir mostrar el contenido de la página hasta verificar la sesión.
document.documentElement.style.display = 'none';

document.addEventListener('DOMContentLoaded', async () => {
    if (!window.location.pathname.endsWith('login.html')) {
        try {
            const res = await fetch('api/check_auth.php');
            const data = await res.json();
            if (!data.success) {
                window.location.replace('login.html');
            } else {
                document.documentElement.style.display = '';
            }
        } catch (e) {
            console.error("Error comprobando sesión", e);
            window.location.replace('login.html');
        }
    } else {
        document.documentElement.style.display = '';
    }
});

async function logout() {
    try {
        await fetch('api/logout.php');
        window.location.replace('login.html');
    } catch (e) {
        console.error("Error cerrando sesión", e);
    }
}
