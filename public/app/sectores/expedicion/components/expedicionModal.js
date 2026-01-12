export function expedicionModal(detalle) {
  return `
    <div 
      class="modal-overlay" 
      id="expedicion-modal-overlay"
      data-id-orden="${detalle.id_orden}"
    >
      <div class="modal-expedicion">

        <h3>Detalle Expedición</h3>

        <!-- INFO BASE -->
        <div class="info-resumen">
          <div>
            <label>Cliente</label>
            <p>${detalle.cliente}</p>
          </div>
          <div>
            <label>Vendedor</label>
            <p>${detalle.vendedor}</p>
          </div>
          <div>
            <label>Fecha Prometida</label>
            <p>${detalle.fecha_prometida || "-"}</p>
          </div>
          <div>
          <label>Dirección Final</label>
            <p>${detalle.direccion_entrega || "-"}</p>
          </div>
          <div>
          <label>Detalle del Trabajo</label>
            <p>${detalle.detalle_trabajo || "-"}</p>
          </div>

          <div>
          <label>Cantidad de Impresiones</label>
            <p>${detalle.cantidad_impresiones || "-"}</p>
          </div>

        </div>

        <!-- FORM -->
        <div class="form-expedicion">

          <label>Método de Envío *</label>
          <select id="metodo_envio">
            <option value="">Seleccionar...</option>
            <option value="ENVIO" ${detalle.metodo_envio === "ENVIO" ? "selected" : ""}>Envío</option>
            <option value="RETIRO" ${detalle.metodo_envio === "RETIRO" ? "selected" : ""}>Retiro</option>
          </select>



          <label>Estado de Embalaje</label>
          <select id="estado_embalaje">
            <option value="">Seleccionar...</option>
            <option value="PREPARADO" ${detalle.estado_embalaje === "PREPARADO" ? "selected" : ""}>
              Preparado
            </option>
            <option value="PREPARADO_EMBALADO" ${detalle.estado_embalaje === "PREPARADO_EMBALADO" ? "selected" : ""}>
              Preparado y Embalado
            </option>
          </select>

          <div class="estado-cards">
            <div class="card ${detalle.tiene_expedicion ? "active" : ""}" data-estado="LISTO_ENTREGA">
              <strong>Listo para Entrega</strong>
              <span>Preparado y embalado</span>
            </div>

            <div class="card" data-estado="DEPOSITO">
              <strong>En Depósito</strong>
              <span>Aguardando retiro</span>
            </div>
          </div>


        </div>

        <div class="modal-actions">
          <button id="guardar-expedicion" class="btn-primary">
            Guardar Datos Expedición
          </button>
          <button id="cerrar-expedicion" class="btn-secondary">
            Cancelar
          </button>
        </div>

      </div>
    </div>
  `;
}
