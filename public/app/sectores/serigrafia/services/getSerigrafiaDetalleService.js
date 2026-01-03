export async function getSerigrafiaDetalleService(id) {
  const res = await fetch(
    `http://impresoscarnelli.com/public/api/serigrafia/getSerigrafiaDetalle.php?id=${id}`
  );
  return await res.json();
}
