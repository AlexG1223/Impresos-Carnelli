import { renderMiniLineChart } from "../charts/miniLineChartComponent.js";

export function graficasVendedoresListComponent(vendedores) {
  const cont = document.getElementById("reporteResultado");
  if (!cont) return;

  const headerHtml = `<h4 style="margin-top: 30px; border-bottom: 2px solid #eee; padding-bottom: 10px;">Ventas por Vendedor</h4>
                      <div id="vendedores-grid" class="operarios-grid"></div>`;
  cont.insertAdjacentHTML("beforeend", headerHtml);

  const grid = document.getElementById("vendedores-grid");

  Object.entries(vendedores).forEach(([nombre, stats]) => {
    const idChart = `chart-vendedor-${nombre.replace(/\s+/g, '-')}`;

    const html = `
      <div class="operario-card">
        <h4>${nombre}</h4>
        <div class="mini-chart">
          <span>Ventas Totales ($${Number(stats.total).toFixed(2)})</span>
          <canvas id="${idChart}"></canvas>
        </div>
      </div>
    `;

    grid.insertAdjacentHTML("beforeend", html);
    renderMiniLineChart(idChart, stats.porFecha);
  });
}
