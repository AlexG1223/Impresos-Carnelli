export async function getOffsetDetalleService(id) {
  const res = await fetch(
    `http://impresoscarnelli.com/public/api/offset/getOffsetDetalle.php?id=${id}`
  );
  return await res.json();
}
