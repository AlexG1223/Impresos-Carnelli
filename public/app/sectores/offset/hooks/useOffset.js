import { getOffsetService } from "../services/getOffsetService.js";
import { startOffsetService } from "../services/startOffsetService.js";
import { endOffsetService } from "../services/endOffsetService.js";
import { offsetTable } from "../components/offsetTable.js";
import { loadViewCSS } from "/ICSoftware/public/app/utils/viewCssManager.js";
import { getOffsetDetalleService } from "../services/getOffsetDetalleService.js";
import { offsetFinalizarModal } from "../components/offsetFinalizarModal.js";
import { ModalDetalleOT } from "../../administracion/OTs/components/ModalDetalleOT.js";
import { getTodasOTs } from "../../administracion/OTs/services/getTodasOTsService.js";



export async function useOffset() {
  loadViewCSS("sectores/offset/styles/offsetTable.css");

  const section = document.getElementById("section-sh");
  const modalContainer = document.getElementById("ModalContenedor");

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
  const btnVer = e.target.closest(".btn-ver");

  if (btnVer) {

    const id = Number(btnVer.dataset.id);
    const res = await getTodasOTs(id);
    const ots = res.data;
    const dataOT = ots.find(o => Number(o.id_ot) === id);
    
    modalContainer.innerHTML = ModalDetalleOT(dataOT);
    const modalElement = document.getElementById("modalDetalleOT");

    modalElement.querySelector("#cerrarModalOT").addEventListener("click", 
      () => {
        modalElement.remove();
      }
    );

    return;
    
  }

  if (btnIniciar) {
    const id = btnIniciar.dataset.id;
    await startOffsetService(id);
    await render();
    return;
  }

if (btnFinalizar) {
  const id = btnFinalizar.dataset.id;

  const modal = document.getElementById("ModalContenedor");
  const res = await getOffsetDetalleService(id);
  if (!res.success) {
    alert(res.message);
    return;
  }
modalContainer.innerHTML = offsetFinalizarModal(res.data);

const overlay = document.getElementById("offset-modal-overlay");

overlay.querySelector("#cancelarModal")
  .addEventListener("click", () => overlay.remove());

overlay.querySelector("#confirmarFinalizar")
  .addEventListener("click", async () => {
    await endOffsetService(id);
    overlay.remove();
    await render();
  });


  return;
}

});

}

