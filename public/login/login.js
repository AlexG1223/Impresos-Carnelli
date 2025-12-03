import { useGetLoginDataValidation } from './hooks/useGetLoginDataValidation.js';
import { loguear } from './services/loginService.js';

const btn = document.getElementById('loginBtn');

btn.addEventListener('click', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    const valido = useGetLoginDataValidation(username, password);
    if (!valido) return alert("Por favor, complete todos los campos.");

    const result = await loguear(username, password);

    if (!result.success) return alert(result.message);

    alert("Bienvenido " + result.user.nombre);
/*
    switch (result.user.rol) {
        case "administrador":
            window.location.href = "../admin/index.php";
            break;
        case "vendedor":
            window.location.href = "../vendedor/index.php";
            break;
        case "diseñador":
            window.location.href = "../disenio/index.php";
            break;
        case "offset":
            window.location.href = "../offset/index.php";
            break;
        case "serigrafia":
            window.location.href = "../serigrafia/index.php";
            break;
        case "expedicion":
            window.location.href = "../expedicion/index.php";
            break;
    }
            */
});
