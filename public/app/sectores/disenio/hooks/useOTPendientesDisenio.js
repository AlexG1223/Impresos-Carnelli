import { getOTPendientesService } from "../services/getOTPendientesService.js";
import { OTPendientesTable } from "../components/OTPendientesTable.js";
import { openOTModal, initOTDetalleModal } from "../components/OTDetalleModal.js";
import { getOTDetalleService } from "../services/getOTDetalleService.js";

function loadOTPendientesCSS() {
  if (document.getElementById("ot-pendientes-css")) return;

  const link = document.createElement("link");
  link.id = "ot-pendientes-css";
  link.rel = "stylesheet";
  link.href = "sectores/disenio/styles/OTPendientesDisenio.css";

  document.head.appendChild(link);
}

export async function OTPendientesDisenio() {
  loadOTPendientesCSS();

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

