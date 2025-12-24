export async function getOffsetDetalleService(id) {
  const res = await fetch(
    `http://trumanuy.com/ICSoftware/public/api/offset/getOffsetDetalle.php?id=${id}`
  );
  return await res.json();
}
