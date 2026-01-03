export async function getOTDetalleService(id) {
  const res = await fetch(`http://impresoscarnelli.com/public/api/ordenes_trabajo/getOTDetalle.php?id=${id}`);
  return await res.json();
}
