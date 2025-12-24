

export async function updateClientService(client) {
  const res = await fetch("http://trumanuy.com/ICSoftware/public/api/clients/update.php", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(client)
  });

  return await res.json();
}
