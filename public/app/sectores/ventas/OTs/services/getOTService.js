
export async function getOTService(id_ot) {
  try {
    const response = await fetch("https://impresoscarnelli.com/public/api/ordenes_trabajo/getOTData.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id_ot })
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    return data.data;  

  } catch (error) {
    console.error("Error al obtener los datos de la OT:", error);
  }
}

