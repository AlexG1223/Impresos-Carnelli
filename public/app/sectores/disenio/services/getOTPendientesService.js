export async function getOTPendientesService() {
  const res = await fetch("/ICSoftware/public/api/ordenes_trabajo/read_disenio_ot.php");
  return await res.json();
}
