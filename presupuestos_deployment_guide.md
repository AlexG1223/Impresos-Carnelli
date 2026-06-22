# Guía de Despliegue en Hostinger: Presupuestos Imprenta

Esta guía detalla los pasos necesarios para desplegar la nueva herramienta **Calculadora de Presupuestos** en tu servidor de Hostinger sin alterar ni romper el funcionamiento del sistema actual.

> [!NOTE]
> La integración del menú en la aplicación principal ya está lista. Se ha configurado un acceso directo en los menús de **Administración** y **Ventas** que abre la calculadora en una pestaña nueva para que no pierdas tu trabajo actual.

---

## 🚀 Despliegue en 5 Pasos

### Paso 1: Subir los Archivos al Servidor
Debes subir la carpeta `presupuestos_imprenta` y actualizar los archivos modificados del menú en tu servidor de Hostinger.

1. Conéctate a tu servidor a través del **Administrador de Archivos de Hostinger** o un cliente FTP (como FileZilla).
2. Sube la carpeta completa **`presupuestos_imprenta`** al directorio raíz de tu sitio web (generalmente dentro de `public_html/`), al mismo nivel que las carpetas `public/` y `private/`.
3. Sube y reemplaza los siguientes dos archivos modificados del sistema principal:
   - `public/app/components/menu.js`
   - `public/app/hooks/useMenuActions.js`

---

### Paso 2: Crear la Base de Datos en Hostinger
La calculadora de presupuestos utiliza su propia base de datos para almacenar el historial de presupuestos, insumos y configuraciones de máquinas de imprenta.

1. Ingresa a tu panel de control de **Hostinger (hPanel)**.
2. Navega a **Bases de datos** ➔ **Bases de datos MySQL**.
3. Crea la base de datos con los datos que ya configuramos en el archivo (los que ingresaste en la interfaz):
   - **Nombre de la Base de Datos**: `u240116336_presupuestos`
   - **Usuario MySQL**: `u240116336_presupuestos`
   - **Contraseña**: `kDALtZ9M`
4. Haz clic en **Crear**.

---

### Paso 3: Importar la Estructura y Datos de Ejemplo
1. Desde el panel de Hostinger, haz clic en **Ingresar a phpMyAdmin** junto a la base de datos recién creada (`u240116336_presupuestos`).
2. Selecciona la pestaña **Importar** en la barra superior.
3. Haz clic en **Seleccionar archivo** y busca el archivo **`database.sql`** que está en la carpeta raíz de `presupuestos_imprenta/`.
4. Deja las opciones por defecto y haz clic en **Importar** (o *Continuar*) al final de la página.

---

### Paso 4: Credenciales y Conexión Automática
¡Buenas noticias! **Ya hemos configurado estas credenciales en tu código**. El archivo `presupuestos_imprenta/api/config.php` cuenta con detección automática de entorno:

* **En tu Localhost**: Usará automáticamente el usuario `root` y la base de datos `imprenta_presupuestos_v2`.
* **En Hostinger (Producción)**: Detectará que está en el servidor web y se conectará automáticamente a la base de datos `u240116336_presupuestos` con el usuario `u240116336_presupuestos` y la contraseña `kDALtZ9M`.

> [!TIP]
> No necesitas editar ninguna línea de conexión para la base de datos al subir el código a Hostinger; se adaptará por sí solo de forma transparente.

---

### Paso 5: Credenciales de Acceso Independiente (Opcional)
Si ingresas directamente a la URL de la calculadora sin iniciar sesión en el sistema principal, esta te pedirá un usuario y contraseña independientes.

Si deseas cambiarlos, puedes hacerlo editando el archivo **`presupuestos_imprenta/api/login.php`**:

```php
// api/login.php - Línea 9
if ($user === 'Usuario' && $pass === 'JorgeMauro12345!') {
```
*Puedes reemplazar `'Usuario'` y `'JorgeMauro12345!'` por el usuario y contraseña que prefieras para el acceso rápido.*

---

## 🔒 Inicio de Sesión Integrado (Single Sign-On)

Hemos programado un puente de sesión entre ambos sistemas. Gracias a esto:
* Si ya iniciaste sesión en el **Sistema de Gestión principal (ICSoftware)**, podrás entrar a la calculadora haciendo clic en el menú lateral y **no necesitarás loguearte de nuevo**.
* Si prefieres usar la calculadora de forma independiente o desde otro dispositivo, podrás acceder directamente a `https://tu-dominio.com/presupuestos_imprenta/login.html` usando las credenciales independientes definidas en el **Paso 5**.
