import { renderLineChart } from "../charts/lineChartComponent.js";

export function graficasResumenComponent({ ventas, impresiones }) {
  const cont = document.getElementById("reporteResultado");

  const html = `
    <div class="graficas-resumen">
      <div class="grafica-card">
        <h3>Ventas Generales</h3>
        <canvas id="chartVentas"></canvas>
        <p>Total: $${ventas.total}</p>
      </div>

      <div class="grafica-card">
        <h3>Impresiones Generales</h3>
        <canvas id="chartImpresiones"></canvas>
        <p>Total: ${impresiones.total}</p>
      </div>
    </div>
  `;

  cont.insertAdjacentHTML("beforeend", html);

  renderLineChart("chartVentas", ventas.porFecha);
  renderLineChart("chartImpresiones", impresiones.porFecha);
}
