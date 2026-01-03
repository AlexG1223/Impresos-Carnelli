export async function editarOTService(formData) {
  try {
    console.log('Enviando datos de OT para editar:', Array.from(formData.entries()));
    const response = await fetch('https://impresoscarnelli.com/public/api/ordenes_trabajo/edit.php', {
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
