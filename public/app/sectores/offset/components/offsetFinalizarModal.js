export function offsetFinalizarModal(data) {
  return `
   
      <div class="acciones-modal">
        <h3>Finalizar Trabajo OT #${data.ot_id}</h3>
        <button id="cancelarModal">Cancelar</button>
        <button id="confirmarFinalizar" data-id="${data.ot_id}">
          Finalizar
        </button>
      </div>
  `;
}
