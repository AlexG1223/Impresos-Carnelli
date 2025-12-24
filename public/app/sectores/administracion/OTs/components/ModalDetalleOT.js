export function ModalDetalleOT(ot) {
  return `
    <div class="modal-overlay" id="modalDetalleOT">
      <div class="modal-card">

        <div class="modal-header">
          <h2>Detalle de OT #${ot.id_ot}</h2>
        </div>

        <div class="modal-body">
          <div class="detalle-grid">

            <div>
              <span class="label">Cliente</span>
              <p>${ot.cliente}</p>
            </div>

            <div>
              <span class="label">Vendedor</span>
              <p>${ot.vendedor}</p>
            </div>

            <div>
              <span class="label">Fecha de Ingreso</span>
              <p>${ot.fecha_ingreso}</p>
            </div>

            <div>
              <span class="label">Fecha Prometida</span>
              <p>${ot.fecha_prometida}</p>
            </div>

            <div>
              <span class="label">Estado</span>
              <span class="badge-estado">${ot.estado}</span>
            </div>

          </div>

          <div class="archivos-section">
            <span class="label">Archivos</span>

            ${
              ot.archivos.length
                ? ot.archivos.map(a => `
                  <a class="archivo-item" href="${a.url}">
                    ${a.nombre}
                  </a>
                `).join('')
                : `<p class="sin-archivos">No hay archivos adjuntos</p>`
            }

          </div>
        </div>

        <div class="modal-footer">
          <button class="btn-cerrar" id="cerrarModalOT">Cerrar</button>
        </div>

      </div>
    </div>
  `;
}
