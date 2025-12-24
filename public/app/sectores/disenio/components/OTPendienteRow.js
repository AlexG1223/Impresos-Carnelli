export function OTPendienteRow(ot) {
  return `
    <tr>
      <td>${ot.id}</td>
      <td>${ot.cliente_nombre}</td>
      <td>${ot.vendedor_nombre}</td>
      <td>${ot.fecha_ingreso}</td>
      <td class="fecha-prometida">
        ${ot.fecha_prometida ?? "-"}
      </td>
      <td>
        ${ot.total_archivos} archivo${ot.total_archivos == 1 ? "" : "s"}
      </td>
      <td>
        <button
          class="btn-ver"
          data-id="${ot.id}"
        >
          👁
        </button>
      </td>
    </tr>
  `;
}
