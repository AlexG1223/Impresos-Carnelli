import { getOffsetService } from "../services/getOffsetService.js";
import { startOffsetService } from "../services/startOffsetService.js";
import { endOffsetService } from "../services/endOffsetService.js";
import { offsetTable } from "../components/offsetTable.js";
import { loadViewCSS } from "http://trumanuy.com/ICSoftware/public/app/utils/viewCssManager.js";
import { getOffsetDetalleService } from "../services/getOffsetDetalleService.js";
import { offsetFinalizarModal } from "../components/offsetFinalizarModal.js";


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

  const modal = document.getElementById("modal-ot");
  const modalContent = modal.querySelector(".modal-content");

  const res = await getOffsetDetalleService(id);
  if (!res.success) {
    alert(res.message);
    return;
  }

  modalContent.innerHTML = offsetFinalizarModal(res.data);
  modal.classList.remove("hidden");

  document
    .getElementById("cancelarModal")
    .addEventListener("click", () => {
      modal.classList.add("hidden");
    });

  document
    .getElementById("confirmarFinalizar")
    .addEventListener("click", async () => {
      await endOffsetService(id);
      modal.classList.add("hidden");
      await render();
    });

  return;
}

});

}
