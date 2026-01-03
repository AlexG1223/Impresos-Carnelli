import { getSerigrafiaService } from "../services/getSerigrafiaService.js";
import { startSerigrafiaService } from "../services/startSerigrafiaService.js";
import { endSerigrafiaService } from "../services/endSerigrafiaService.js";
import { serigrafiaTable } from "../components/serigrafiaTable.js";
import { loadViewCSS } from "http://impresoscarnelli.com/public/app/utils/viewCssManager.js";


import { getSerigrafiaDetalleService } from "../services/getSerigrafiaDetalleService.js";
import { serigrafiaFinalizarModal } from "../components/serigrafiaFinalizarModal.js";

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

  const modal = document.getElementById("modal-ot");
  const modalContent = modal.querySelector(".modal-content");

  const res = await getSerigrafiaDetalleService(id);
  if (!res.success) {
    alert(res.message);
    return;
  }

  modalContent.innerHTML = serigrafiaFinalizarModal(res.data);
  modal.classList.remove("hidden");

  document
    .getElementById("cancelarModal")
    .addEventListener("click", () => {
      modal.classList.add("hidden");
    });

  document
    .getElementById("confirmarFinalizar")
    .addEventListener("click", async () => {
      await endSerigrafiaService(id);
      modal.classList.add("hidden");
      await render();
    });

  return;
}

});

}
