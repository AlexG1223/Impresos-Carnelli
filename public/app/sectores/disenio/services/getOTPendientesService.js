export async function getOTPendientesService() {
  const res = await fetch("http://impresoscarnelli.com/public/api/ordenes_trabajo/read_disenio_ot.php");
  return await res.json();
}
