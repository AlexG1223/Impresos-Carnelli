export async function cambiarEstadoComisionService(idOrden) {
  try {
    const res = await fetch("/ICSoftware/public/api/administracion/reportes/cambiar_estado_comision.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idOrden })
    });

    return await res.json();
  } catch (e) {
    return { success: false, message: "Error de conexión" };
  }
}
