import { getTodasOTs } from "../services/getTodasOTsService.js";
import { TablaOTs, activarBuscadorOTs } from "../components/TablaOTs.js";
import { ModalDetalleOT } from "../components/ModalDetalleOT.js";
import { loadViewCSS } from "/ICSoftware/public/app/utils/viewCssManager.js";

export async function useTodasOTs() {
  loadViewCSS("sectores/administracion/OTs/styles/ots.css");

  const container = document.getElementById("section-sh");
  const modalContainer = document.getElementById("ModalContenedor");

  if (!container) return;

  

  const response = await getTodasOTs();
  if (!response.success) {
    container.innerHTML = `<p>Error al cargar las órdenes</p>`;
    return;
  }

  const ots = response.data;
  container.innerHTML = TablaOTs(ots);
  activarBuscadorOTs();

  container.addEventListener("click", e => {
    const btn = e.target.closest(".btn-ver");
    if (!btn) return;

    if (document.getElementById("modalDetalleOT")) return;

    const idOT = Number(btn.dataset.id);
    const ot = ots.find(o => Number(o.id_ot) === idOT);
    if (!ot) return;

    modalContainer.innerHTML = ModalDetalleOT(ot);

    const modalElement = document.getElementById("modalDetalleOT");
    
    modalElement.querySelector("#cerrarModalOT").addEventListener("click", cerrarModal);
    
    modalElement.addEventListener("click", e => {
      if (e.target.id === "modalDetalleOT") cerrarModal();
    });
  });
}

function cerrarModal() {
  const modal = document.getElementById("modalDetalleOT");
  if (modal) {
    modal.remove();
  }
}