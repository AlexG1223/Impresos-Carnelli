import { getSerigrafiaService } from "../services/getSerigrafiaService.js";
import { startSerigrafiaService } from "../services/startSerigrafiaService.js";
import { endSerigrafiaService } from "../services/endSerigrafiaService.js";
import { serigrafiaTable } from "../components/serigrafiaTable.js";
import { loadViewCSS } from "/ICSoftware/public/app/utils/viewCssManager.js";

export async function useSerigrafia() {
  loadViewCSS("sectores/serigrafia/styles/serigrafiaTable.css");
  const section = document.getElementById("section-sh");

  async function render() {
    section.innerHTML = "";
    const res = await getSerigrafiaService();
    if (!res.success) return;
    section.innerHTML = serigrafiaTable(res.data);
  }

  await render();

 section.addEventListener("click", async (e) => {
  const btnIniciar = e.target.closest(".btn-iniciar");
  const btnFinalizar = e.target.closest(".btn-finalizar");

  if (btnIniciar) {
    const id = btnIniciar.dataset.id;
    await startSerigrafiaService(id);
    await render();
    return;
  }

  if (btnFinalizar) {
    const id = btnFinalizar.dataset.id;
    await endSerigrafiaService(id);
    await render();
    return;
  }
});

}
