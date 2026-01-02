

export async function generarReporteVentas(fechaInicio, fechaFin) {
 const res = await fetch("/ICSoftware/public/api/administracion/reportes/reporteVentas.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
     body: JSON.stringify({ fechaInicio, fechaFin }) 
  });
  console.log("generarReporteVentas res:", res.data);
  return await res.json();

}