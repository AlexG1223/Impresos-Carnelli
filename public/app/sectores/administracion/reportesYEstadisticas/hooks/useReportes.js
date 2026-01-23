import { loadViewCSS } from "/ICSoftware/public/app/utils/viewCssManager.js";
import { renderReportes } from "../components/reportesComponent.js";
import { generarReporteImpresiones } from "../services/generarReporteImpresiones.js";
import { reporteImpresionesComponent } from "../components/reporteImpresionesComponent.js";
import { generarReporteVentas } from "../services/generarReporteVentas.js";
import { reporteVentasComponent } from "../components/reportesVentasComponent.js";

import { normalizarVentas } from "../utils/normalizarVentas.js";
import { normalizarImpresiones } from "../utils/normalizarImpresiones.js";
import { graficasResumenComponent } from "../components/graficasResumenComponent.js";
import { graficasOperariosListComponent } from "../components/graficasOperariosListComponent.js";



export async function useReportes() {
  loadViewCSS("sectores/administracion/reportesYEstadisticas/styles/reportes.css");

  renderReportes();

  const btnGenerar = document.querySelector(".btn-generar");
  if (!btnGenerar) return;

  btnGenerar.addEventListener("click", async () => {
    const tipoReporte = document.getElementById("tipoReporte")?.value;
    const fechaInicio = document.getElementById("fechaInicio")?.value;
    const fechaFin = document.getElementById("fechaFin")?.value;

    if (!tipoReporte || !fechaInicio || !fechaFin) {
      console.warn("⚠️ Debes completar todos los campos");
      alert("Debes completar todos los campos");
      return;
    }

    if (fechaInicio > fechaFin) {
      console.warn("⚠️ La fecha inicio no puede ser mayor a la fecha fin");
      alert("La fecha inicio no puede ser mayor a la fecha fin");
      return;
    }

document.getElementById("reporteResultado").innerHTML = "<p>Generando reporte...</p>";

    if (tipoReporte === "impresiones") {
     const res =  await generarReporteImpresiones(fechaInicio, fechaFin);

      if (!res.success) {
        alert(res.message || "Error al generar el reporte de impresiones");
        document.getElementById("reporteResultado").innerHTML = "<p>Error al generar el reporte.</p>";
        return;
      }
      reporteImpresionesComponent(fechaInicio, fechaFin, res.data);

    }
    if (tipoReporte === "ventas") {
       const res =  await generarReporteVentas(fechaInicio, fechaFin);

      if (!res.success) {
        alert(res.message || "Error al generar el reporte de ventas");
        document.getElementById("reporteResultado").innerHTML = "<p>Error al generar el reporte.</p>";
        return;
      }
      reporteVentasComponent(fechaInicio, fechaFin, res.data);

    }
    if (tipoReporte === "graficar") {
const datosVentas = await generarReporteVentas(fechaInicio, fechaFin);
const datosImpresiones = await generarReporteImpresiones(fechaInicio, fechaFin);

  const ventasNorm = normalizarVentas(datosVentas.data.ordenes);
const impresionesNorm = normalizarImpresiones(datosImpresiones.data.ordenes);

document.getElementById("reporteResultado").innerHTML = "";

graficasResumenComponent({
  ventas: ventasNorm,
  impresiones: impresionesNorm.general
});
graficasOperariosListComponent(impresionesNorm.operarios);
    }
  });
}
