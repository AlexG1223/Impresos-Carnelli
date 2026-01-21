import { getExpedicionService } from "../services/expedicionService.js";
import { expedicionTable } from "../components/expedicionTable.js";
import { expedicionModal } from "../components/expedicionModal.js";
import { loadViewCSS } from "/ICSoftware/public/app/utils/viewCssManager.js";
import { getExpedicionDetalleService } from "../services/getExpedicionDetalleService.js";
import { saveExpedicionService } from "../services/saveExpedicionService.js";

async function renderExpedicionTable(section) {
  section.innerHTML = "<p class='loading'>Cargando expedición...</p>";

  const res = await getExpedicionService();

  if (!res.success) {
    section.innerHTML = `<p class="error">${res.message}</p>`;
    return;
  }

  section.innerHTML = expedicionTable(res.data);

  section.querySelectorAll(".btn-ver").forEach(btn => {
    btn.addEventListener("click", async () => {
      await abrirModalExpedicion(btn.dataset.id, section);
    });
  });
}


async function abrirModalExpedicion(otId, section) {
  const detalleRes = await getExpedicionDetalleService(otId);

   const modalContainer = document.getElementById("ModalContenedor");

  if (!detalleRes.success) {
    alert(detalleRes.message);
    return;
  }

  modalContainer.innerHTML = expedicionModal(detalleRes.data);

  const modal = document.getElementById("expedicion-modal-overlay");

  let estadoExpedicion = null;

  const cards = modal.querySelectorAll(".estado-cards .card");
  cards.forEach(card => {
    card.addEventListener("click", () => {
      cards.forEach(c => c.classList.remove("active"));
      card.classList.add("active");
      estadoExpedicion = card.dataset.estado;
    });
  });

  modal.querySelector("#cerrar-expedicion")
    .addEventListener("click", () => modal.remove());

  modal.querySelector("#guardar-expedicion")
    .addEventListener("click", async () => {

      const payload = {
        id_orden: otId,
        metodo_envio: modal.querySelector("#metodo_envio").value,
        direccion_entrega_final: modal.querySelector("#direccion_entrega_final").value,
        estado_embalaje: modal.querySelector("#estado_embalaje").value
      };
      if (!payload.metodo_envio || !payload.estado_embalaje ) {
        alert("Completá los datos obligatorios.");
        return;
      }

      const saveRes = await saveExpedicionService(payload);

      if (!saveRes.success) {
        alert(saveRes.message || "Error al guardar expedición");
        return;
      }

      modal.remove();
      await renderExpedicionTable(section);
    });
}

export async function useExpedicion() {
  loadViewCSS("sectores/expedicion/styles/expedicion.css");

  const section = document.getElementById("section-sh");
  await renderExpedicionTable(section);
}
