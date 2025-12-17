import { enviarADetalleProduccionService } from "../services/enviarADetalleProduccionService.js";
import { OTPendientesDisenio } from "../hooks/useOTPendientesDisenio.js";


export function OTDetalleModal(ot) {
  return `
    <div class="modal-overlay" id="ot-modal-overlay" data-id-orden="${ot.id}">
      <div class="modal-ot">
        <div class="modal-body-scroll">
        <div class="modal-header">

          <h3>OT #${ot.id} - ${ot.cliente_nombre}</h3>
          <button class="btn-cerrar-modal">✕</button>
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

        <!-- 🆕 ACLARACIONES -->
        <h4 class="modal-subtitle">Aclaraciones Técnicas para Impresión</h4>
<textarea
  class="ot-textarea js-aclaraciones"
  placeholder="Ej: Colores Pantone, sangrado, tipo de papel, tamaño final..."
></textarea>



        <!-- 🆕 SECTOR -->
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

          <button class="btn-accion secundaria btn-cerrar-modal">Cancelar</button>
        </div>
          </div>
      </div>
    </div>
  `;
}

export function initOTDetalleModal() {
  document.addEventListener("click", async (e) => {

    // cerrar modal
    if (
      e.target.classList.contains("btn-cerrar-modal") ||
      e.target.id === "ot-modal-overlay"
    ) {
      cerrarModalOT();
      return;
    }

    // seleccionar sector
    const sector = e.target.closest(".ot-sector");
    if (sector) {
      const modal = document.getElementById("ot-modal-overlay");
      if (!modal) return;

      modal.querySelectorAll(".ot-sector")
        .forEach(s => s.classList.remove("activo"));

      sector.classList.add("activo");
      return;
    }

    // confirmar envío
    const btnConfirmar = e.target.closest(".btn-confirmar-envio");
    if (!btnConfirmar) return;

    const modal = document.getElementById("ot-modal-overlay");
    if (!modal) return;

    const idOrden = modal.dataset.idOrden;
    const aclaraciones = modal.querySelector(".js-aclaraciones").value;

    const sectorActivo = modal.querySelector(".ot-sector.activo");
    const sectorSeleccionado = sectorActivo
      ? sectorActivo.dataset.sector
      : null;

    if (!sectorSeleccionado) {
      alert("Debe seleccionar el sector");
      return;
    }

    btnConfirmar.disabled = true;

    const res = await enviarADetalleProduccionService({
      id_orden: idOrden,
      especificaciones_tecnicas: aclaraciones,
      sector_responsable: sectorSeleccionado
    });

    if (res.success) {
      alert("OT enviada a producción");
      cerrarModalOT();
      OTPendientesDisenio()
    } else {
      alert(res.message || "Error al enviar a producción");
      btnConfirmar.disabled = false;
    }
  });
}


export function openOTModal(ot) {
  cerrarModalOT();

  const container = document.createElement("div");
  container.innerHTML = OTDetalleModal(ot);
  document.body.appendChild(container);
}

function cerrarModalOT() {
  const modal = document.getElementById("ot-modal-overlay");
  if (modal) modal.remove();
}
