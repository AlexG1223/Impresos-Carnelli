export async function getSerigrafiaService() {
  try {
    const res = await fetch("http://impresoscarnelli.com/public/api/serigrafia/getSerigrafia.php");

    if (!res.ok) {
      throw new Error("Error al obtener OTs de serigrafia");
    }

    const data = await res.json();
    return data;

  } catch (error) {
    console.error("getSerigrafiaService:", error);
    return {
      success: false,
      message: "No se pudo cargar Serigrafia"
    };
  }
}
