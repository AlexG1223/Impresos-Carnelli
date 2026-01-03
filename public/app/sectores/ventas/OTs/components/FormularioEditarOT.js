export function FormularioEditarOT(ot) {
  return `
    <h2>Editar Orden de Trabajo</h2>
    <form id="editarOTForm" enctype="multipart/form-data">
      <label>Cliente *</label>
      <input type="text" id="clienteNombre" value="${ot.cliente_nombre}" readonly required />

      <input type="hidden" name="id_cliente" id="id_cliente" value="${ot.id_cliente}" />
      <input type="hidden" name="id_ot" id="id_ot" value="${ot.id_ot}" />

      <label>Presupuesto Asociado</label>
      <input name="presupuesto" type="number" step="0.01" value="${ot.presupuesto}" />

      <label>Fecha de Ingreso *</label>
      <input name="fecha_ingreso" type="date" value="${ot.fecha_ingreso}" required />

      <label>Fecha Prometida</label>
      <input name="fecha_prometida" type="date" value="${ot.fecha_prometida}" />

      <label>Detalle del Trabajo</label>
      <textarea name="detalle_trabajo">${ot.detalle_trabajo}</textarea>

      <label>Seña</label>
      <input name="sena" type="number" step="0.01" value="${ot.sena}" />

      <label>Cantidad de Impresiones</label>
      <input name="cantidad_impresiones" type="number" value="${ot.cantidad_impresiones}" />

      <label>Sector Destino</label>
      <input name="sector_destino" type="text" value="${ot.sector_destino}" />

      <label>Etapa</label>
      <input name="etapa" type="text" value="${ot.etapa}" />

      <div class="ot-actions">
        <button type="submit">Actualizar OT</button>
      </div>
    </form>
  `;
}
