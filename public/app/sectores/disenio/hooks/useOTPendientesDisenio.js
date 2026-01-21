import { getOTPendientesService } from "../services/getOTPendientesService.js";
import { OTPendientesTable } from "../components/OTPendientesTable.js";
import { openOTModal } from "../components/OTDetalleModal.js";
import { getOTDetalleService } from "../services/getOTDetalleService.js";
import { loadViewCSS } from "/ICSoftware/public/app/utils/viewCssManager.js";


export async function OTPendientesDisenio() {
  loadViewCSS("sectores/disenio/styles/OTPendientesDisenio.css");

  const section = document.getElementById("section-sh");
  if (!section) return;

  const res = await getOTPendientesService();
  if (!res.success) return;

  section.innerHTML = OTPendientesTable(res.data);

  section.querySelectorAll(".btn-ver").forEach(btn => {
    btn.addEventListener("click", async () => {
      const idOT = btn.dataset.id;

      const resDetalle = await getOTDetalleService(idOT);
      if (!resDetalle.success) return;

      openOTModal(resDetalle.data);
    });
  });
}


