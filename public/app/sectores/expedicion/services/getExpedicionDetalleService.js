

export async function getExpedicionDetalleService(id) {
  try {
    const res = await fetch(`http://trumanuy.com/ICSoftware/public/api/expedicion/getExpedicionDetalle.php?id=${id}`);

    if (!res.ok) {
      throw new Error("Error al obtener OTs de expedición");
    }

    const data = await res.json();
    return data;

  } catch (error) {
    console.error("getExpedicionService:", error);
    return {
      success: false,
      message: "No se pudo cargar Expedición"
    };
  }
}
