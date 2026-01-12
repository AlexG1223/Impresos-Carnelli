export function offsetFinalizarModal(data) {
  return `
    <div class="modal-content">
      <h3>Finalizar Orden de Trabajo</h3>

      <p><strong>OT:</strong> ${data.ot_id}</p>
      <p><strong>Cliente:</strong> ${data.nombre_empresa}</p>
      <p><strong>Hora de inicio:</strong> ${data.fecha_inicio_trabajo}</p>
      <p><strong>Cantidad de impresiones:</strong> ${data.cantidad_impresiones}</p>

      <div class="field">
        <p><strong>Especificaciones técnicas</strong></p>
        <p readonly>${data.especificaciones_tecnicas || "-"}</p>
      </div>

      <div class="field">
        <p><strong>Detalles del Trabajo</strong></p>
        <p readonly>${data.detalle_trabajo || "-"}</p>
      </div>

      <div class="acciones-modal">
        <button id="cancelarModal">Cancelar</button>
        <button id="confirmarFinalizar" data-id="${data.ot_id}">
          Finalizar
        </button>
      </div>
    </div>
  `;
}
