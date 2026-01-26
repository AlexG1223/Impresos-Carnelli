export function offsetFinalizarModal(data) {
  return `
    <div id="offset-modal-overlay" class="modal-overlay">
      <div class="modal-buttons-prod">
        <h3>Finalizar Trabajo OT #${data.ot_id}</h3>
        <div class="modal-body-buttons">
          <button id="cancelarModal">Cancelar</button>
          <button id="confirmarFinalizar">Finalizar</button>
        </div>
      </div>
    </div>
  `;
}
