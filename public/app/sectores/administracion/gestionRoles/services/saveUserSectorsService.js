
export async function saveUserSectorsService(userId, sectores) {
  try {
    const res = await fetch("http://impresoscarnelli.com/public/api/sectores/saveSectors.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: userId,
        sectores: sectores   
      })
    });

    return await res.json();

  } catch (err) {
    console.error("Error en saveUserSectorsService:", err);
    return {
      success: false,
      message: "Error de conexión con el servidor"
    };
  }
}
