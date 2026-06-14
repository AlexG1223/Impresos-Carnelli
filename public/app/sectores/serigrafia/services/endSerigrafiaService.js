export async function endSerigrafiaService(id_ot) {
  const res = await fetch("/public/api/serigrafia/finalizar_ot.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id_ot })
  });

  return res.json();
}
