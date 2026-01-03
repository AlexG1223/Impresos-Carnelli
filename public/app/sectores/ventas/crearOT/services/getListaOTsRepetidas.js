export async function getListaOTsRepetidas() {
try {
    const res = await fetch(
      "https://impresoscarnelli.com/public/api/ordenes_trabajo/getOTs.php",
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
    console.log("getListaOTsRepetidas data:", data);
    return data;

  } catch (error) {
    console.error("Error getListaOTsRepetidas:", error);
    return {
      success: false,
      message: "Error al obtener la getListaOTsRepetidas"
    };
  }
}
