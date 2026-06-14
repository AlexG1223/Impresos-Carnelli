export async function getOffsetDetalleService(id) {
  const res = await fetch(
    `/public/api/offset/getOffsetDetalle.php?id=${id}`
  );
  return await res.json();
}
