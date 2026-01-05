export async function editarOTService(formData) {
  try {
    const response = await fetch('/ICSoftware/public/api/ordenes_trabajo/edit.php', {
      method: 'POST',
      body: formData
    });
    if (!response.ok) {
      return { success: false, message: 'Error al contactar el servidor' };
    }

    const data = await response.json();

    if (data.success) {
      return { success: true };
    } else {
      return { success: false, message: data.message };
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
    return { success: false, message: 'Error de conexión o servidor' };
  }
}
