import { renderMiniLineChart } from "../charts/miniLineChartComponent.js";

export function graficasOperariosListComponent(operarios) {
  const cont = document.getElementById("reporteResultado");

  Object.entries(operarios).forEach(([nombre, sectores]) => {
    const idOffset = `chart-${nombre}-offset`;
    const idSeri = `chart-${nombre}-seri`;

    const html = `
      <div class="operario-card">
        <h4>${nombre}</h4>

        <div class="mini-chart">
          <span>OFFSET (${sectores.OFFSET.total})</span>
          <canvas id="${idOffset}"></canvas>
        </div>

        <div class="mini-chart">
          <span>SERIGRAFÍA (${sectores.SERIGRAFIA.total})</span>
          <canvas id="${idSeri}"></canvas>
        </div>
      </div>
    `;

    cont.insertAdjacentHTML("beforeend", html);

    renderMiniLineChart(idOffset, sectores.OFFSET.porFecha);
    renderMiniLineChart(idSeri, sectores.SERIGRAFIA.porFecha);
  });
}
