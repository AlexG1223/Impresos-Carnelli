export async function getSerigrafiaDetalleService(id) {
  const res = await fetch(
    `http://trumanuy.com/ICSoftware/public/api/serigrafia/getSerigrafiaDetalle.php?id=${id}`
  );
  return await res.json();
}
