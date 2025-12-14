export async function getAllClientsService() {
  const res = await fetch("/ICSoftware/public/api/clients/getAll.php");
  return await res.json();
}