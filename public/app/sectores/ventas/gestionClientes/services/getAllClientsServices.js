export async function getAllClientsService() {
  const res = await fetch("http://trumanuy.com/ICSoftware/public/api/clients/getAll.php");
  return await res.json();
}