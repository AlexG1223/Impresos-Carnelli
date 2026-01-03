import { getOTPendientesService } from "../services/getOTPendientesService.js";
import { OTPendientesTable } from "../components/OTPendientesTable.js";
import { openOTModal, initOTDetalleModal } from "../components/OTDetalleModal.js";
import { getOTDetalleService } from "../services/getOTDetalleService.js";
import { loadViewCSS } from "http://impresoscarnelli.com/public/app/utils/viewCssManager.js";




export async function OTPendientesDisenio() {
loadViewCSS("sectores/disenio/styles/OTPendientesDisenio.css")

  const section = document.getElementById("section-sh");
  section.innerHTML = "";

  const res = await getOTPendientesService();
  if (!res.success) return;

  section.innerHTML = OTPendientesTable(res.data);


section.addEventListener("click", async (e) => {
  const btn = e.target.closest(".btn-ver");
  if (!btn) return;

  const idOT = btn.dataset.id;

  const resDetalle = await getOTDetalleService(idOT);
  if (!resDetalle.success) return;

  openOTModal(resDetalle.data);
});


  initOTDetalleModal();
}

