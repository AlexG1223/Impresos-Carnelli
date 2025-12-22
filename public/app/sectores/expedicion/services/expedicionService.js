export async function getExpedicionService() {
  try {
    const res = await fetch("/ICSoftware/public/api/expedicion/getExpedicion.php");

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
