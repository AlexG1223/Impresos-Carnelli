import { getOffsetService } from "../services/getOffsetService.js";
import { offsetTable } from "../components/offsetTable.js";
function loadOTPendientesCSS() {
  if (document.getElementById("ot-pendientes-css")) return;

  const link = document.createElement("link");
  link.id = "ot-pendientes-css";
  link.rel = "stylesheet";
  link.href = "sectores/offset/styles/offsetTable.css";

  document.head.appendChild(link);
}

export async function useOffset() {
  loadOTPendientesCSS();

  const section = document.getElementById("section-sh");
  section.innerHTML = "";

  const res = await getOffsetService();
  if (!res.success) return;

  section.innerHTML = offsetTable(res.data);


//section.addEventListener("click", async (e) => {
 
//});


  
}

