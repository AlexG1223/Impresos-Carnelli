// services/editarOTService.js

export async function editarOTService(formData) {
  try {
    const response = await fetch("", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Error al editar la OT");
    }

    return { success: true, message: "OT actualizada correctamente" };
  } catch (error) {
    return { success: false, message: error.message };
  }
}
