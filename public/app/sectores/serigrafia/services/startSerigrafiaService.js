export async function startSerigrafiaService(id_ot) {
  const res = await fetch("http://impresoscarnelli.com/public/api/serigrafia/iniciar_ot.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id_ot, sector: "SERIGRAFIA" })
  });

  return res.json();
}
