export async function createClientService(client) {
  const res = await fetch("http://impresoscarnelli.com/public/api/clients/create.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(client)
  });

  return await res.json();
}
