export async function getOTPendientesService() {
  const res = await fetch("http://trumanuy.com/ICSoftware/public/api/ordenes_trabajo/read_disenio_ot.php");
  return await res.json();
}
