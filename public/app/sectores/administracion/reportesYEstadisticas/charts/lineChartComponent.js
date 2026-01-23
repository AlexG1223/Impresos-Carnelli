export function renderLineChart(canvasId, dataPorFecha) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  if (typeof Chart === "undefined") {
    console.error("Chart.js no está cargado");
    return;
  }

  const labels = Object.keys(dataPorFecha);
  const data = Object.values(dataPorFecha);

  new Chart(canvas, {
    type: "line",
    data: {
      labels,
      datasets: [{
        data,
        tension: 0.3,
        borderWidth: 2,
        pointRadius: 3
      }]
    },
    options: {
      plugins: {
        legend: { display: false }
      },
      responsive: true
    }
  });
}
