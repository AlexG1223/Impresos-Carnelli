import { getOTPendientesService } from "../services/getOTPendientesService.js";
import { OTPendientesTable } from "../components/OTPendientesTable.js";


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
section.innerHTML = '';
  const res = await getOTPendientesService();
  if (!res.success) return;

  section.innerHTML = OTPendientesTable(res.data);
}
