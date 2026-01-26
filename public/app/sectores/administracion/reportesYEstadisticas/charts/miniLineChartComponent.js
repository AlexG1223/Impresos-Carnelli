export function renderMiniLineChart(canvasId, dataPorFecha) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return;

  const labels = Object.keys(dataPorFecha);
  const data = Object.values(dataPorFecha);

  new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [{
        data,
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.4
      }]
    },
    options: {
      plugins: { legend: false },
      scales: {
        x: { display: false },
        y: { display: false }
      }
    }
  });
}
