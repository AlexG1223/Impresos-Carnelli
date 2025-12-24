export async function enviarADetalleProduccionService(data) {
  const res = await fetch(
    "http://trumanuy.com/ICSoftware/public/api/detalle_produccion/create.php",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }
  );

  return await res.json();
}
