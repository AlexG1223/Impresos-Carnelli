import { OTPendienteRow } from "./OTPendienteRow.js";
export function OTPendientesTable(ordenes) {
  return `
    <div class="ot-pendientes">

      <h2>Trabajos Pendientes de Diseño</h2>
      <p>Revisa y procesa los archivos antes de enviar a impresión</p>

      <div class="table-container">
        <table class="ot-table">
          <thead>
            <tr>
              <th>OT</th>
              <th>Cliente</th>
              <th>Vendedor</th>
              <th>Fecha Ingreso</th>
              <th>Fecha Prometida</th>
              <th>Archivos</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            ${ordenes.map(OTPendienteRow).join("")}
          </tbody>
        </table>
      </div>

    </div>
  `;
}