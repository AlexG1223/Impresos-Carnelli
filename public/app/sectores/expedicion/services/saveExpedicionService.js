export async function saveExpedicionService(data) {
  try {
    const res = await fetch(
      "http://impresoscarnelli.com/public/api/expedicion/saveExpedicion.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }
    );

    if (!res.ok) {
      throw new Error("Error HTTP al guardar expedición");
    }

    const result = await res.json();
    return result;

  } catch (error) {
    console.error("saveExpedicionService:", error);
    return {
      success: false,
      message: "No se pudo guardar la información de expedición"
    };
  }
}
