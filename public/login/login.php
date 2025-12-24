<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Iniciar Sesión</title>
</head>
<body>

    <form id="loginForm">
        <label for="username">Usuario:</label>
        <input type="text" id="username" name="username" required>

        <br>

        <label for="password">Contraseña:</label>
        <input type="password" id="password" name="password" required>

        <br>

        <button id="loginBtn">Iniciar Sesión</button>
    </form>

    <script type="module" src="login.js"></script>
</body>
</html>
