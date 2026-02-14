export function reporteDisenioComponent(fechaInicio, fechaFin, data, precioHora) {
  const container = document.getElementById("reporteResultado");
  if (!container) return;

  const filas = data.sesiones.length > 0 
    ? data.sesiones.map(s => {
        const horas = (s.minutos / 60).toFixed(2);
        const costo = (horas * precioHora).toFixed(2);
        
        return `
          <tr class="${s.pago_realizado ? 'paga' : 'no-paga'}" 
              data-busqueda="${s.diseniador.toLowerCase()} ${s.cliente.toLowerCase()} #${s.id_orden}">
            <td>#${s.id_orden}</td>
            <td><strong>${s.diseniador}</strong></td>
            <td>${s.cliente}</td>
            <td>${s.inicio}</td>
            <td>${s.minutos} min <small>(${horas} hs)</small></td>
            <td><strong>$ ${costo}</strong></td>
          </tr>
        `;
      }).join("")
    : `<tr><td colspan="6" class="sin-datos">No hay trabajos de diseño en este periodo</td></tr>`;

  const resumenTable = Object.entries(data.resumen).map(([nombre, stats]) => {
    const horasTotales = (stats.totalMinutos / 60).toFixed(2);
    return `
      <tr>
        <td>${nombre}</td>
        <td>${stats.totalTrabajos}</td>
        <td>${horasTotales} hs</td>
        <td class="texto-enfasis">$ ${(horasTotales * precioHora).toFixed(2)}</td>
      </tr>
    `;
  }).join("");

  container.innerHTML = `
    <div class="reporte-disenio animar-entrada">
      <div class="reporte-header">
        <h3>Reporte de Tiempos de Diseño</h3>
        <p>Desde <strong>${fechaInicio}</strong> hasta <strong>${fechaFin}</strong> | Tarifa: <strong>$${precioHora}/hs</strong></p>
      </div>
      
      <div class="reporte-resumen-cuadros">
          <div class="resumen-card">
              <span>Total Trabajos</span>
              <strong>${data.sesiones.length}</strong>
          </div>
          <div class="resumen-card">
              <span>Tiempo Acumulado</span>
              <strong>${(data.sesiones.reduce((acc, s) => acc + s.minutos, 0) / 60).toFixed(1)} hs</strong>
          </div>
      </div>

      <div class="reporte-tabla">
        <h4>Resumen por Diseñador</h4>
        <table>
          <thead>
            <tr>
              <th>Diseñador</th>
              <th>Cant. Trabajos</th>
              <th>Tiempo Total</th>
              <th>Total Estimado</th>
            </tr>
          </thead>
          <tbody>${resumenTable}</tbody>
        </table>
      </div>

      <div class="reporte-tabla">
        <div class="reporte-header-flex">
            <h4>Detalle de Trabajos</h4>
            <input type="text" id="buscar-disenio" placeholder="Filtrar por diseñador, cliente u OT..." class="input-busqueda">
        </div>
        <table id="tabla-disenio-detalle">
          <thead>
            <tr>
              <th>OT</th>
              <th>Diseñador</th>
              <th>Cliente</th>
              <th>Fecha Inicio</th>
              <th>Duración</th>
              <th>Costo</th>
            </tr>
          </thead>
          <tbody>${filas}</tbody>
        </table>
      </div>
    </div>
  `;

  const inputBusca = document.getElementById("buscar-disenio");
  inputBusca?.addEventListener("input", (e) => {
      const term = e.target.value.toLowerCase();
      document.querySelectorAll("#tabla-disenio-detalle tbody tr").forEach(tr => {
          if(!tr.dataset.busqueda) return;
          tr.style.display = tr.dataset.busqueda.includes(term) ? "" : "none";
      });
  });
}