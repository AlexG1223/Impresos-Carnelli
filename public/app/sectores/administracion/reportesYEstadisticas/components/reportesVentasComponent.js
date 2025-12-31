export function reporteVentasComponent(fechaInicio, fechaFin, data) {
  const container = document.getElementById("section-sh");
  if (!container) return;

  const filas = data.ordenes && data.ordenes.length
    ? data.ordenes.map(ot => `
        <tr>
          <td>#${ot.id}</td>
          <td>${ot.fechaIngreso}</td>
          <td>${ot.fechaFinalizacion ?? "-"}</td>
          <td>$ ${Number(ot.presupuesto).toFixed(2)}</td>
        </tr>
      `).join("")
    : `
        <tr>
          <td colspan="4" class="sin-datos">
            No hay órdenes para el período seleccionado
          </td>
        </tr>
      `;

  container.innerHTML = `
    <div class="reporte-ventas">

      <div class="reporte-header">
        <h3>Reporte de Ventas</h3>
        <p>Desde <strong>${fechaInicio}</strong> hasta <strong>${fechaFin}</strong></p>
      </div>

      <div class="reporte-resumen">
        <span>Total de ventas</span>
        <strong>$ ${Number(data.totalVentas).toFixed(2)}</strong>
      </div>

      <div class="reporte-tabla">
        <table>
          <thead>
            <tr>
              <th>ID OT</th>
              <th>Fecha de ingreso</th>
              <th>Fecha de finalización</th>
              <th>Presupuesto</th>
            </tr>
          </thead>
          <tbody>
            ${filas}
          </tbody>
        </table>
      </div>

    </div>
  `;
}
