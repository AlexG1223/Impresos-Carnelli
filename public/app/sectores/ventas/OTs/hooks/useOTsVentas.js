
import { getTodasOTs } from "../../../administracion/OTs/services/getTodasOTsService.js";
import { ModalDetalleOT } from "../../../administracion/OTs/components/ModalDetalleOT.js";
import {
  TablaOTsVendedor,
  activarBuscadorOTsVendedor
} from "../components/TablaOTsVendedor.js";
import { deleteOT } from "../services/deleteOTService.js";
import { loadViewCSS } from "/ICSoftware/public/app/utils/viewCssManager.js";

import { FormularioEditarOT } from "../components/FormularioEditarOT.js";
import { editarOTService } from "../services/editarOTService.js"; 
import { getOTService } from "../services/getOTService.js";
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

  container.innerHTML = TablaOTsVendedor(ots);
  activarBuscadorOTsVendedor();

  container.addEventListener("click", async (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;

    const fila = btn.closest("tr");
    const idOT = Number(fila.dataset.id);
    const accion = btn.dataset.action;

    const ot = ots.find((o) => Number(o.id_ot) === idOT);
    if (!ot) return;

    switch (accion) {
      case "view":
        document.body.insertAdjacentHTML("beforeend", ModalDetalleOT(ot));

        document
          .getElementById("cerrarModalOT")
          ?.addEventListener("click", cerrarModalOT);

        document
          .getElementById("modalDetalleOT")
          ?.addEventListener("click", (e) => {
            if (e.target.id === "modalDetalleOT") cerrarModalOT();
          });
        break;

      case "edit":
         const dataOT = await getOTService(ot.id_ot);
       container.innerHTML = "cargando formulario de edición...";
       container.innerHTML = FormularioEditarOT(dataOT)


        const form = document.getElementById("editarOTForm");
        form.addEventListener("submit", async (e) => {
          e.preventDefault();

          const formData = new FormData(form);
          const res = await editarOTService(formData);

          if (res.success) {
            alert("OT actualizada correctamente");
            container.innerHTML = ""; 
            container.innerHTML = TablaOTsVendedor(ots);
          } else {
            alert(res.message || "Error al actualizar la OT");
          }
        });

        break;

      case "delete":
        if (!confirm(`¿Eliminar OT #${idOT}?`)) return;

        deleteOT(idOT).then((res) => {
          if (!res.success) {
            alert(res.message || "Error al eliminar la OT");
            return;
          }

          fila.remove();
          const index = ots.findIndex((o) => Number(o.id_ot) === idOT);
          if (index !== -1) ots.splice(index, 1);

        });

        break;
    }
  });
}

function cerrarModalOT() {
  const modal = document.getElementById("modalDetalleOT");
  if (modal) modal.remove();
}
