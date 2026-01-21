

export function OTDetalleModal(ot) {
  return `
    <div class="modal-overlay" id="ot-modal-overlay" data-id-orden="${ot.id}">
      <div class="modal-ot">
        <div class="modal-body-scroll">

          <div class="modal-header">
            <h3>OT #${ot.id} - ${ot.cliente_nombre}</h3>
            <!-- <button class="btn-cerrar-modal">✕</button> -->
          </div>

          <div class="modal-info">
            <div>
              <strong>Vendedor</strong>
              ${ot.vendedor_nombre}
            </div>

            <div>
              <strong>Fecha Prometida</strong>
              <span class="fecha-prometida">${ot.fecha_prometida ?? "-"}</span>
            </div>

            <div>
              <strong>Presupuesto</strong>
              ${ot.presupuesto ?? "-"}
            </div>

            <div>
              <h4 class="modal-subtitle">Detalle del Trabajo</h4>
              <p class="detalle-texto">
                ${ot.detalle_trabajo?.trim()
                  ? ot.detalle_trabajo
                  : "No hay detalles en este trabajo"}
              </p>
            </div>
          </div>

          <h4 class="modal-subtitle">Archivos del Cliente</h4>
          <div class="archivos-lista">
            ${
              ot.archivos.length === 0
                ? "<p>No hay archivos cargados</p>"
                : ot.archivos.map(a => `
                    <div class="archivo-item">
                      <span>${a.nombre}</span>
                      <a href="${a.url}" target="_blank">Descargar</a>
                    </div>
                  `).join("")
            }
          </div>

          <div class="alerta-info">
            ⚠️ Los archivos finales deben enviarse por el canal habitual (email/FTP).
          </div>

          <h4 class="modal-subtitle">Aclaraciones Técnicas para Impresión</h4>
          <textarea
            class="ot-textarea js-aclaraciones"
            placeholder="Ej: Colores Pantone, sangrado, tipo de papel, tamaño final..."
          ></textarea>

          <h4 class="modal-subtitle">Enviar a</h4>
          <div class="ot-sectores">
            <div class="ot-sector" data-sector="OFFSET">
              <strong>Offset</strong>
            </div>
            <div class="ot-sector" data-sector="SERIGRAFIA">
              <strong>Serigrafía</strong>
            </div>
          </div>

          <div class="modal-actions">
            <button class="btn-accion primaria btn-confirmar-envio">
              Confirmar Envío
            </button>
            <button class="btn-accion secundaria btn-cerrar-modal">
              Cancelar
            </button>
          </div>

        </div>
      </div>
    </div>
  `;
}

