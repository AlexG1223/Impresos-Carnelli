export function offsetFinalizarModal(data) {
  return `
    <div class="modal-content">
      <h3>Finalizar Orden de Trabajo</h3>

      <p><strong>OT:</strong> ${data.ot_id}</p>
      <p><strong>Cliente:</strong> ${data.nombre_empresa}</p>
      <p><strong>Hora de inicio:</strong> ${data.fecha_inicio_trabajo}</p>

      <div class="field">
        <label>Especificaciones técnicas</label>
        <textarea readonly>${data.especificaciones_tecnicas || "-"}</textarea>
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
