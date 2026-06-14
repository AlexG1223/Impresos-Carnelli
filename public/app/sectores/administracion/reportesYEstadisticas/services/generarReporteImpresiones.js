export async function generarReporteImpresiones(fechaInicio, fechaFin) {
  const res = await fetch("/public/api/administracion/reportes/reporteImpresiones.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ fechaInicio, fechaFin }) 
  });
  return await res.json();
}
