import { getTodasOTs } from "../services/getTodasOTsService.js";
import { TablaOTs, activarBuscadorOTs } from "../components/TablaOTs.js";
import { ModalDetalleOT } from "../components/ModalDetalleOT.js";
import { loadViewCSS } from "/ICSoftware/public/app/utils/viewCssManager.js";

export async function useTodasOTs() {
  loadViewCSS("sectores/administracion/OTs/styles/ots.css");

  const container = document.getElementById("section-sh");
  if (!container) return;

  const response = await getTodasOTs();
  if (!response.success) {
    container.innerHTML = `<p>Error al cargar las órdenes</p>`;
    return;
  }

  const ots = response.data;
  container.innerHTML = TablaOTs(ots);
  activarBuscadorOTs();

  // --- MEJORA: DELEGACIÓN DE EVENTOS ---
  // En lugar de hacer forEach a cada botón, escuchamos el contenedor
  container.addEventListener("click", e => {
    const btn = e.target.closest(".btn-ver");
    if (!btn) return;

    // 1. Evitar duplicados: Si ya hay un modal abierto, no hacer nada
    if (document.getElementById("modalDetalleOT")) return;

    const idOT = Number(btn.dataset.id);
    const ot = ots.find(o => Number(o.id_ot) === idOT);
    if (!ot) return;

    // 2. Insertar modal
    document.body.insertAdjacentHTML("beforeend", ModalDetalleOT(ot));

    // 3. Asignar eventos de cierre
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
    // Opcional: podrías añadir una clase de fade-out aquí antes de remover
    modal.remove();
  }
}