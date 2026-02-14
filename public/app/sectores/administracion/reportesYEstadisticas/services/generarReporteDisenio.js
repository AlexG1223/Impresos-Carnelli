

export async function generarReporteDisenio(fechaInicio, fechaFin) {
 const res = await fetch("/ICSoftware/public/api/administracion/reportes/reporteDisenio.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
     body: JSON.stringify({ fechaInicio, fechaFin }) 
  });
  return await res.json();

}