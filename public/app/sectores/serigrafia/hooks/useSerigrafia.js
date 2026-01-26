import { getSerigrafiaService } from "../services/getSerigrafiaService.js";
import { startSerigrafiaService } from "../services/startSerigrafiaService.js";
import { endSerigrafiaService } from "../services/endSerigrafiaService.js";
import { serigrafiaTable } from "../components/serigrafiaTable.js";
import { loadViewCSS } from "https://impresoscarnelli.com/public/app/utils/viewCssManager.js";
import { ModalDetalleOT } from "../../administracion/OTs/components/ModalDetalleOT.js";
import { getTodasOTs } from "../../administracion/OTs/services/getTodasOTsService.js";



import { getSerigrafiaDetalleService } from "../services/getSerigrafiaDetalleService.js";
import { serigrafiaFinalizarModal } from "../components/serigrafiaFinalizarModal.js";

export async function useSerigrafia() {
  loadViewCSS("sectores/serigrafia/styles/serigrafiaTable.css");
  
  const section = document.getElementById("section-sh");
  const modalContainer = document.getElementById("ModalContenedor");

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
    await startSerigrafiaService(id);
    await render();
    return;
  }

if (btnFinalizar) {
  const id = btnFinalizar.dataset.id;


  const modal = document.getElementById("ModalContenedor");
  const res = await getSerigrafiaDetalleService(id);
  if (!res.success) {
    return;
  }

  modalContainer.innerHTML = serigrafiaFinalizarModal(res.data);

const overlay = document.getElementById("serigrafia-modal-overlay");

overlay.querySelector("#cancelarModal")
  .addEventListener("click", () => overlay.remove());

overlay.querySelector("#confirmarFinalizar")
  .addEventListener("click", async () => {
    await endSerigrafiaService(id);
    overlay.remove();
    await render();
  });


  return;
}

});

}
