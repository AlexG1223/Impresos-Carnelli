
export async function getTodasOTs() {
  try {
    const res = await fetch("http://impresoscarnelli.com/public/api/administracion/ots/getTodasOTs.php");

    if (!res.ok) {
      throw new Error("Error al obtener OTs de administración");
    }

    const data = await res.json();
    return data;

  } catch (error) {
    console.error("getTodasOTs:", error);
    return {
      success: false,
      message: "No se pudo cargar getTodasOTs"
    };
  }
}
