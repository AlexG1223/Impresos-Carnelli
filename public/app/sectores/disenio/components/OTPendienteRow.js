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
          type="button"
          class="btn-imprimir-ot-disenio"
          onclick="window.open('/public/api/ordenes_trabajo/imprimir.php?id=${ot.id}', '_blank')"
          title="Imprimir Orden de Trabajo"
          style="background: #ede9fe; color: #5b21b6; border: 1px solid #ddd6fe; border-radius: 6px; padding: 4px 8px; cursor: pointer; font-size: 14px; margin-right: 4px;"
        >
          🖨️
        </button>
        <button
          class="btn-verDisenio"
          data-id="${ot.id}"
          title="Ver detalles"
        >
          👁
        </button>
      </td>
    </tr>
  `;
}
