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
              <span class="label">Nombre Cliente</span>
              <p>${ot.cliente}</p>
            </div>

            <div>
              <span class="label">Empresa</span>
              <p>${ot.empresa}</p>
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
              <span class="label">Cantidad de Impresiones</span>
              <p>${ot.cantidad_impresiones}</p>
            </div>

            <div>
              <span class="label">Dirección de Entrega</span>
              <p>${ot.direccion_entrega || "No hay dirección de entrega"}</p>
            </div>


            <div>
              <span class="label">Estado</span>
              <span class="badge-estado">${ot.estado}</span>
            </div>

          </div>
          <div class="detalles-section">
          
          <div class="detalles-section-info">
  <span class="label">Detalle del Trabajo</span>
  <p>
    ${
      ot.detalle_trabajo?.trim()
        ? ot.detalle_trabajo
        : "No hay detalles en este trabajo"
    }
  </p>
</div>

<div class="detalles-section-info">
  <span class="label">Detalles Técnicos</span>
  <p>
    ${
      ot.especificaciones_tecnicas?.trim()
        ? ot.especificaciones_tecnicas
        : "No hay detalles técnicos"
    }
  </p>
</div>

          </div>
<div class="archivos-section">
  <span class="label">Archivos</span>

  ${
    ot.archivos.length
      ? ot.archivos
          .map((a) => {
            if (esImagen(a.nombre)) {
              return `
              <a class="archivo-item imagen-preview" href="${a.url}" target="_blank">
                <img src="${a.url}" alt="${a.nombre}" />
                <span>${a.nombre}</span>
              </a>
            `;
            }

            return `
            <a class="archivo-item" href="${a.url}" target="_blank">
              ${a.nombre}
            </a>
          `;
          })
          .join("")
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
function esImagen(nombre) {
  return /\.(jpg|jpeg|png|gif|webp)$/i.test(nombre);
}
