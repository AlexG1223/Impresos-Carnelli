export async function startOffsetService(id_ot) {
  const res = await fetch("/public/api/offset/iniciar_ot.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id_ot, sector: "OFFSET" })
  });

  return res.json();
}
