export async function crearOTService(data) {
  const res = await fetch("/ICSoftware/public/api/ordenes_trabajo/create.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  return await res.json();
}
