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

import { generarReporteDisenio } from "../services/generarReporteDisenio.js";
import { reporteDisenioComponent } from "../components/reporteDisenioComponent.js";

export async function useReportes() {
  loadViewCSS("sectores/administracion/reportesYEstadisticas/styles/reportes.css");

  renderReportes();

  const btnGenerar = document.querySelector(".btn-generar");
  if (!btnGenerar) return;


      const tipoReporteSelect = document.getElementById("tipoReporte");
const comisionContainer = document.getElementById("comision-container");
const precioDiseñadorContainer = document.getElementById("precio-diseño-container");

tipoReporteSelect.addEventListener("change", () => {
  comisionContainer.style.display =
    tipoReporteSelect.value === "ventas" ? "block" : "none";
  precioDiseñadorContainer.style.display =
    tipoReporteSelect.value === "diseño" ? "block" : "none";
});

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
   const porcentajeComision =
  Number(document.getElementById("porcentajeComision")?.value || 0);
console.log(res.data)

reporteVentasComponent(fechaInicio, fechaFin, res.data, porcentajeComision);


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


    if (tipoReporte === "diseño") {
  const res =  await generarReporteDisenio(fechaInicio, fechaFin);

      if (!res.success) {
        alert(res.message || "Error al generar el reporte de diseño");
        document.getElementById("reporteResultado").innerHTML = "<p>Error al generar el reporte.</p>";
        return;
      }
      const precioDiseño = Number(document.getElementById("precioDiseño")?.value || 0);
reporteDisenioComponent(fechaInicio, fechaFin, res.data, precioDiseño);
    }
  });
}
