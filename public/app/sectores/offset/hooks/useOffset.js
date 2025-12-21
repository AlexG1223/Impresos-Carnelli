import { getOffsetService } from "../services/getOffsetService.js";
import { startOffsetService } from "../services/startOffsetService.js";
import { endOffsetService } from "../services/endOffsetService.js";
import { offsetTable } from "../components/offsetTable.js";
import { loadViewCSS } from "/ICSoftware/public/app/utils/viewCssManager.js";

export async function useOffset() {
  loadViewCSS("sectores/offset/styles/offsetTable.css");

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
