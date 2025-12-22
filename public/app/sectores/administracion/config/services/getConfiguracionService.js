

export async function getConfiguracionService() {
  try {
    const res = await fetch(
      "/ICSoftware/public/api/administracion/getConfiguracion.php",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    if (!res.ok) {
      throw new Error("Error en la petición");
    }
    const data = await res.json();
    return data;

  } catch (error) {
    console.error("Error getConfiguracionService:", error);
    return {
      success: false,
      message: "Error al obtener la configuración"
    };
  }
}

