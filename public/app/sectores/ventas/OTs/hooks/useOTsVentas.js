
import { getTodasOTs } from "../../../administracion/OTs/services/getTodasOTsService.js";
import { ModalDetalleOT } from "../../../administracion/OTs/components/ModalDetalleOT.js";
import {
  TablaOTsVendedor,
  activarBuscadorOTsVendedor, activarToggleFinalizadas
} from "../components/TablaOTsVendedor.js";
import { deleteOT } from "../services/deleteOTService.js";
import { loadViewCSS } from "https://impresoscarnelli.com/public/app/utils/viewCssManager.js";

import { FormularioEditarOT } from "../components/FormularioEditarOT.js";
import { editarOTService } from "../services/editarOTService.js"; 
import { getOTService } from "../services/getOTService.js";
import { activarAgregarArchivosOT, obtenerDatosArchivosEdit } from "../utils/activarAgregarArchivosOT.js";


export async function useOTsVendedor() {
  loadViewCSS("sectores/ventas/OTs/styles/otsVendedor.css");

const oldContainer = document.getElementById("section-sh");
  if (!oldContainer) return;

  const container = oldContainer.cloneNode(false); 

     const modalContainer = document.getElementById("ModalContenedor");
  oldContainer.parentNode.replaceChild(container, oldContainer);
  container.innerHTML = "Cargando OTs...";

  const res = await getTodasOTs();
  if (!res.success) {
    container.innerHTML = "<p>Error al cargar las órdenes</p>";
    return;
  }

  const ots = res.data;

  container.innerHTML = TablaOTsVendedor(ots);
  activarBuscadorOTsVendedor();
  activarToggleFinalizadas();

  container.addEventListener("click", async (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;

    const fila = btn.closest("tr");

    if (!fila) return;
    const idOT = Number(fila.dataset.id);
    const accion = btn.dataset.action;
if (!accion) return;
    const ot = ots.find((o) => Number(o.id_ot) === idOT);
    if (!ot) return;

    switch (accion) {
      case "view":
        modalContainer.innerHTML = ModalDetalleOT(ot);

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


       activarAgregarArchivosOT();


        const form = document.getElementById("editarOTForm");
        form.addEventListener("submit", async (e) => {
          e.preventDefault();

          const formData = new FormData(form);

          const { nuevos, eliminados } = obtenerDatosArchivosEdit();

          nuevos.forEach(file => {
        formData.append("archivos[]", file);
      });


    eliminados.forEach(id => {
        formData.append("archivos_eliminados[]", id);
    });

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
