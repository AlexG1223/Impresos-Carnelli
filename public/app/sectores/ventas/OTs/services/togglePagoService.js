export async function togglePagoService(id_ot) {
  try {
    const formData = new FormData();
    formData.append("id_ot", id_ot);

    const response = await fetch('/public/api/ordenes_trabajo/toggle_pago.php', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      return { success: false, message: 'Error al contactar el servidor' };
    }

    return await response.json();
  } catch (error) {
    console.error('Error en togglePagoService:', error);
    return { success: false, message: 'Error de conexión' };
  }
}
