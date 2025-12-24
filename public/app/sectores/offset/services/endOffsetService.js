export async function endOffsetService(id_ot) {
  const res = await fetch("http://trumanuy.com/ICSoftware/public/api/offset/finalizar_ot.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id_ot })
  });

  return res.json();
}
