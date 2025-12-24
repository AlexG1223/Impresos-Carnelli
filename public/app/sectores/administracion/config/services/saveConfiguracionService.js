export async function saveConfiguracionService(data) {
    
  try {
    const response = await fetch(
      "http://trumanuy.com/ICSoftware/public/api/administracion/saveConfiguracion.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error("Error en la respuesta del servidor");
    }

    const result = await response.json();
    return result;

  } catch (error) {
    console.error("saveConfiguracionService:", error);
    return {
      success: false,
      message: "No se pudo guardar la configuración",
    };
  }
}
