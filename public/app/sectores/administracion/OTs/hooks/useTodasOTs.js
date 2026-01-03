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
activarBuscadorOTs()
  document.querySelectorAll(".btn-ver").forEach(btn => {
    btn.addEventListener("click", () => {
      const idOT = Number(btn.dataset.id);
      const ot = ots.find(o => Number(o.id_ot) === idOT);

      if (!ot) return;

      document.body.insertAdjacentHTML(
        "beforeend",
        ModalDetalleOT(ot)
      );

      document
        .getElementById("cerrarModalOT")
        .addEventListener("click", cerrarModal);

      document
        .getElementById("modalDetalleOT")
        .addEventListener("click", e => {
          if (e.target.id === "modalDetalleOT") cerrarModal();
        });
    });
  });
}

function cerrarModal() {
  const modal = document.getElementById("modalDetalleOT");
  if (modal) modal.remove();
}
