export async function getAllClientsService() {
  const res = await fetch("/public/api/clients/getAll.php");
  return await res.json();
}
