export async function deleteOT(idOT) {
  try {
    const res = await fetch(
      "https://impresoscarnelli.com/public/api/ordenes_trabajo/delete.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id_ot: idOT })
      }
    );

    return await res.json();
  } catch (error) {
    console.error("Error al eliminar OT:", error);
    return {
      success: false,
      message: "Error de conexión"
    };
  }
}
