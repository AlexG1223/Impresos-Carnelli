export function serigrafiaFinalizarModal(data) {
  return `

    <div id="serigrafia-modal-overlay" class="modal-overlay">
      <div class="modal-buttons-prod">
        <h3>Finalizar Trabajo OT #${data.ot_id}</h3>
            <div class="modal-body-buttons">
        <button id="cancelarModal">Cancelar</button>
        <button id="confirmarFinalizar" data-id="${data.ot_id}">
          Finalizar
        </button>
        </div>
      </div>
    </div>
  `;
}

