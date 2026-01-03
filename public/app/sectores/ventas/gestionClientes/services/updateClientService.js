

export async function updateClientService(client) {
  const res = await fetch("http://impresoscarnelli.com/public/api/clients/update.php", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(client)
  });

  return await res.json();
}
