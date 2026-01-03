export async function getAllClientsService() {
  const res = await fetch("http://impresoscarnelli.com/public/api/clients/getAll.php");
  return await res.json();
}