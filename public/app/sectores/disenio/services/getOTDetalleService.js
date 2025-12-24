export async function getOTDetalleService(id) {
  const res = await fetch(`/ICSoftware/public/api/ordenes_trabajo/getOTDetalle.php?id=${id}`);
  return await res.json();
}
