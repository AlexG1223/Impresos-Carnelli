export async function otSeleccionadaService(otId) { 
try {
    console.log("otSeleccionada otId:", otId);
    const res = await fetch(
      "/ICSoftware/public/api/ordenes_trabajo/getOTseleccionada.php",
 {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(otId)
      }
    );

    if (!res.ok) {
      throw new Error("Error en la petición");
    }
    const data = await res.json();
    console.log("otSeleccionadaService data:", data);
    return data;

  } catch (error) {
    console.error("Error otSeleccionadaService:", error);
    return {
      success: false,
      message: "Error al obtener la otSeleccionadaService"
    };
  }

}