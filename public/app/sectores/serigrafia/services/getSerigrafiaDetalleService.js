export async function getSerigrafiaDetalleService(id) {
  const res = await fetch(
    `/ICSoftware/public/api/serigrafia/getSerigrafiaDetalle.php?id=${id}`
  );
  return await res.json();
}
