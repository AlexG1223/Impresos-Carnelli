import { useGetLoginDataValidation } from './hooks/useGetLoginDataValidation.js';
import { loguear } from './services/loginService.js';



import { loadViewCSS } from "/ICSoftware/public/app/utils/viewCssManager.js";

loadViewCSS("styles/login.css");
const btn = document.getElementById('loginBtn');

btn.addEventListener('click', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    const valido = useGetLoginDataValidation(username, password);
    if (!valido) return alert("Por favor, complete todos los campos.");

    const result = await loguear(username, password);

    if (!result.success) return alert(result.message);

    window.location.href = "http://localhost/ICSoftware/public/app/";

});
