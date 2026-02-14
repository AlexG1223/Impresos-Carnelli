export async function toggleTiempoDisenioService(id_orden) {
  try {
    const res = await fetch(
      "https://impresoscarnelli.com/public/api/disenio/toggle_tiempo.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id_orden })
      }
    );

    if (!res.ok) throw new Error("Error en la red");
    return await res.json();
  } catch (error) {
    console.error("Error en toggleTiempoDisenioService:", error);
    return { success: false, message: "Error de conexión" };
  }
}