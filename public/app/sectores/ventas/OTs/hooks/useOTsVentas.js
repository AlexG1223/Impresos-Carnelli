// hooks/useOTsVendedor.js
import { getTodasOTs } from "../../../administracion/OTs/services/getTodasOTsService.js";
import { ModalDetalleOT } from "../../../administracion/OTs/components/ModalDetalleOT.js";
import {
  TablaOTsVendedor,
  activarBuscadorOTsVendedor
} from "../components/TablaOTsVendedor.js";
import { deleteOT } from "../services/deleteOTService.js";
import { loadViewCSS } from "/ICSoftware/public/app/utils/viewCssManager.js";

export async function useOTsVendedor() {
  loadViewCSS("sectores/ventas/OTs/styles/otsVendedor.css");

  const container = document.getElementById("section-sh");
  if (!container) return;

  container.innerHTML = "Cargando OTs...";

  const res = await getTodasOTs();
  if (!res.success) {
    container.innerHTML = "<p>Error al cargar las órdenes</p>";
    return;
  }

  const ots = res.data;
  console.log("OTs del vendedor:", ots);

  container.innerHTML = TablaOTsVendedor(ots);
  activarBuscadorOTsVendedor();

  container.addEventListener("click", e => {
    const btn = e.target.closest("button");
    if (!btn) return;

    const fila = btn.closest("tr");
    const idOT = Number(fila.dataset.id);
    const accion = btn.dataset.action;

    const ot = ots.find(o => Number(o.id_ot) === idOT);
    if (!ot) return;

    switch (accion) {
  case "view":
  document.body.insertAdjacentHTML(
    "beforeend",
    ModalDetalleOT(ot)
  );

  document
    .getElementById("cerrarModalOT")
    ?.addEventListener("click", cerrarModalOT);

  document
    .getElementById("modalDetalleOT")
    ?.addEventListener("click", e => {
      if (e.target.id === "modalDetalleOT") cerrarModalOT();
    });
  break;


      case "edit":
        console.log("Editar OT", ot);
        break;

      case "delete":
case "delete":
  if (!confirm(`¿Eliminar OT #${idOT}?`)) return;

  deleteOT(idOT).then(res => {
    if (!res.success) {
      alert(res.message || "Error al eliminar la OT");
      return;
    }
    fila.remove();
    const index = ots.findIndex(o => Number(o.id_ot) === idOT);
    if (index !== -1) ots.splice(index, 1);

    alert("OT eliminada correctamente");
  });

  break;

        break;
    }
  });
}

function cerrarModalOT() {
  const modal = document.getElementById("modalDetalleOT");
  if (modal) modal.remove();
}
