export function reporteVentasComponent(fechaInicio, fechaFin, data, porcentajeComision) {
  const container = document.getElementById("reporteResultado");
  if (!container) return;

  const filas = data.ordenes && data.ordenes.length
    ? data.ordenes.map(ot => `
        <tr
          data-id="#${ot.id}"
          data-vendedor="${ot.vendedor.toLowerCase()}"
          data-fecha="${ot.fechaIngreso}"
          data-paga="${ot.comision_paga}"
          class="${ot.comision_paga ? "comision-paga" : "comision-no-paga"}"
        >
          <td>#${ot.id}</td>
          <td>${ot.vendedor}</td>
          <td>${ot.fechaIngreso}</td>
          <td>${ot.fechaFinalizacion ?? "-"}</td>
          <td>$ ${Number(ot.presupuesto).toFixed(2)}</td>
          <td>
            <button
              class="btn-comision ${ot.comision_paga ? "paga" : "no-paga"}"
              data-id="${ot.id}"
              data-estado="${ot.comision_paga}"
            >
              ${ot.comision_paga ? "Paga" : "No paga"}
            </button>
          </td>
        </tr>
      `).join("")
    : `
        <tr>
          <td colspan="6" class="sin-datos">
            No hay órdenes para el período seleccionado
          </td>
        </tr>
      `;

  const ventasPorVendedor = data.ventasPorVendedor && data.ventasPorVendedor.length
    ? data.ventasPorVendedor.map(vendedor => `
        <tr>
          <td>${vendedor.nombre}</td>
          <td>$ ${Number(vendedor.totalVentas).toFixed(2)}</td>
          <td>$ ${(Number(vendedor.totalComision) * porcentajeComision / 100).toFixed(2)}</td>
        </tr>
      `).join("")
    : `
        <tr>
          <td colspan="3" class="sin-datos">
            No hay ventas por vendedor
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
        <span>Total Comisión base</span>
        <strong>$ ${Number(data.totalComision).toFixed(2)}</strong>
      </div>

      <div class="reporte-tabla">
        <h4>Ventas por Vendedor</h4>
        <table>
          <thead>
            <tr>
              <th>Vendedor</th>
              <th>Total Ventas</th>
              <th>Comisión</th>
            </tr>
          </thead>
          <tbody>
            ${ventasPorVendedor}
          </tbody>
        </table>
      </div>

      <div class="reporte-tabla">
        <div class="reporte-buscador">
          <input
            type="text"
            id="buscador-ot"
            placeholder="Buscar por ID, vendedor o fecha..."
          />
        </div>

        <h4>Órdenes de Trabajo</h4>
        <table id="tabla-ordenes">
          <thead>
            <tr>
              <th>ID OT</th>
              <th>Vendedor</th>
              <th>Fecha ingreso</th>
              <th>Fecha finalización</th>
              <th>Presupuesto</th>
              <th>Comisión</th>
            </tr>
          </thead>
          <tbody>
            ${filas}
          </tbody>
        </table>
      </div>

    </div>
  `;

  const buscador = document.getElementById("buscador-ot");
  const filasOT = document.querySelectorAll("#tabla-ordenes tbody tr");

  if (buscador) {
    buscador.addEventListener("input", () => {
      const valor = buscador.value.toLowerCase();
      filasOT.forEach(fila => {
        const coincide =
          fila.dataset.id.includes(valor) ||
          fila.dataset.vendedor.includes(valor) ||
          fila.dataset.fecha.includes(valor);
        fila.style.display = coincide ? "" : "none";
      });
    });
  }

  document.querySelectorAll(".btn-comision").forEach(btn => {
    btn.addEventListener("click", () => {
      const fila = btn.closest("tr");
      const nuevoEstado = btn.dataset.estado === "1" ? 0 : 1;

      btn.dataset.estado = nuevoEstado;
      btn.textContent = nuevoEstado ? "Paga" : "No paga";
      btn.classList.toggle("paga", nuevoEstado === 1);
      btn.classList.toggle("no-paga", nuevoEstado === 0);

      fila.dataset.paga = nuevoEstado;
      fila.classList.toggle("comision-paga", nuevoEstado === 1);
      fila.classList.toggle("comision-no-paga", nuevoEstado === 0);
    });
  });
}
