import { getOffsetService } from "../services/getOffsetService.js";
import { startOffsetService } from "../services/startOffsetService.js";
import { endOffsetService } from "../services/endOffsetService.js";
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

  async function render() {
    section.innerHTML = "";
    const res = await getOffsetService();
    if (!res.success) return;
    section.innerHTML = offsetTable(res.data);
  }

  await render();

 section.addEventListener("click", async (e) => {
  const btnIniciar = e.target.closest(".btn-iniciar");
  const btnFinalizar = e.target.closest(".btn-finalizar");

  if (btnIniciar) {
    const id = btnIniciar.dataset.id;
    await startOffsetService(id);
    await render();
    return;
  }

  if (btnFinalizar) {
    const id = btnFinalizar.dataset.id;
    await endOffsetService(id);
    await render();
    return;
  }
});

}
