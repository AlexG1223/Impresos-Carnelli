export async function enviarADetalleProduccionService(data) {
  const res = await fetch(
    "http://impresoscarnelli.com/public/api/detalle_produccion/create.php",
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
