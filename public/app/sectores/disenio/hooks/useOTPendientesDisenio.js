import { getOTPendientesService } from "../services/getOTPendientesService.js";
import { OTPendientesTable } from "../components/OTPendientesTable.js";
import { getOTDetalleService } from "../services/getOTDetalleService.js";
import { loadViewCSS } from "/ICSoftware/public/app/utils/viewCssManager.js";
import { enviarADetalleProduccionService } from "../services/enviarADetalleProduccionService.js";
import { OTDetalleModal } from "../components/OTDetalleModal.js";
import { toggleTiempoDisenioService } from "../services/toggleTiempoDisenioService.js";

export async function OTPendientesDisenio() {
  loadViewCSS("sectores/disenio/styles/OTPendientesDisenio.css");

  const section = document.getElementById("section-sh");
  if (!section) return;

  const res = await getOTPendientesService();
  if (!res.success) return;

  section.innerHTML = OTPendientesTable(res.data);

  section.querySelectorAll(".btn-verDisenio").forEach(btn => {
    btn.addEventListener("click", async () => {
      const idOT = btn.dataset.id;

      const resDetalle = await getOTDetalleService(idOT);
      if (!resDetalle.success) return;

       const modalContainer = document.getElementById("ModalContenedor");
      modalContainer.innerHTML = OTDetalleModal(resDetalle.data);

       const modal = document.getElementById("ot-modal-overlay");

  modal.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("btn-cerrar-modal") ||
      e.target.id === "ot-modal-overlay"
    ) {
      modalContainer.innerHTML = "";
    }
  });

  modal.querySelectorAll(".ot-sector").forEach(sector => {
    sector.addEventListener("click", () => {
      modal.querySelectorAll(".ot-sector")
        .forEach(s => s.classList.remove("activo"));

      sector.classList.add("activo");
    });
  });
modal.querySelector(".btn-iniciar-diseño").addEventListener("click", async (e) => {
    const btn = e.currentTarget;
    const idOrden = modal.dataset.idOrden;

    btn.disabled = true; 
    
    const res = await toggleTiempoDisenioService(idOrden);

    if (res.success) {

        modalContainer.innerHTML = ""; 
        await OTPendientesDisenio(); 
        

    } else {
        alert(res.message);
        btn.disabled = false;
    }
});




  modal.querySelector(".btn-confirmar-envio")
    .addEventListener("click", async () => {

      const idOrden = modal.dataset.idOrden;
      const aclaraciones = modal.querySelector(".js-aclaraciones").value;

      const sectorActivo = modal.querySelector(".ot-sector.activo");
      if (!sectorActivo) {
        alert("Debe seleccionar el sector");
        return;
      }

      const btn = modal.querySelector(".btn-confirmar-envio");
      btn.disabled = true;

      const res = await enviarADetalleProduccionService({
        id_orden: idOrden,
        especificaciones_tecnicas: aclaraciones,
        sector_responsable: sectorActivo.dataset.sector
      });

      if (res.success) {
        alert("OT enviada a producción");
         modalContainer.innerHTML = "";
        OTPendientesDisenio();
      } else {
        alert(res.message || "Error al enviar a producción");
        btn.disabled = false;
      }
    });
    });
  });
}



