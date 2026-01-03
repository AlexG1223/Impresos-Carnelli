

export async function generarReporteImpresiones(fechaInicio, fechaFin) {
 const res = await fetch("https://impresoscarnelli.com/public/api/administracion/reportes/reporteImpresiones.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
     body: JSON.stringify({ fechaInicio, fechaFin }) 
  });
  console.log("generarReporteImpresiones res:", res.data);
  return await res.json();

}