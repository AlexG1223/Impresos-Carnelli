export async function getOffsetService() {
  try {
    const res = await fetch("http://impresoscarnelli.com/public/api/offset/getOffset.php");

    if (!res.ok) {
      throw new Error("Error al obtener OTs de offset");
    }

    const data = await res.json();
    return data;

  } catch (error) {
    console.error("getOffsetService:", error);
    return {
      success: false,
      message: "No se pudo cargar Offset"
    };
  }
}
