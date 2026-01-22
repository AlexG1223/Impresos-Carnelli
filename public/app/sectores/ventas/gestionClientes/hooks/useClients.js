import { updateClientService } from "../services/updateClientService.js";
import { getAllClientsService } from "../services/getAllClientsServices.js";
import { ClientCard } from "../components/clientCard.js";
import { ClientViewModal } from "../components/clientViewModal.js";
import { ClientEditModal } from "../components/clientEditModal.js";
import { loadViewCSS } from "/ICSoftware/public/app/utils/viewCssManager.js";

function closeModal(modalContainer) {
  modalContainer.innerHTML = "";
}
export async function useClients() {
  loadViewCSS("sectores/ventas/gestionClientes/styles/clients.css");

  const container = document.getElementById("clientTable");
  const modalContainer = document.getElementById("modalContainer");

  container.innerHTML = "Cargando...";

  const res = await getAllClientsService();
  if (!res.success) return;

  const clients = res.data;

  container.innerHTML = `
    <div id="clientsGrid">
      ${clients.map(ClientCard).join("")}
    </div>
  `;

  activarBuscadorClientes();

  container.addEventListener("click", e => {
    const btn = e.target.closest("button");
    if (!btn) return;

    const { id, action } = btn.dataset;
    const client = clients.find(c => c.id == id);

    if (action === "view") {
      modalContainer.innerHTML = ClientViewModal(client);
    }

    if (action === "edit") {
      modalContainer.innerHTML = ClientEditModal(client);
    }
  });

  modalContainer.addEventListener("click", e => {
    if (e.target.id === "closeModal") {
      closeModal(modalContainer);
    }
  });

  modalContainer.addEventListener("submit", async e => {
    if (!e.target.matches("#editClientForm")) return;

    e.preventDefault();

    const form = e.target;
    const data = Object.fromEntries(new FormData(form));

    const res = await updateClientService(data);

    if (res.success) {
      alert("Cliente actualizado con éxito.");
      closeModal(modalContainer);
       container.innerHTML = "Cargando...";

  const res = await getAllClientsService();
  if (!res.success) return;

  const clients = res.data;

  container.innerHTML = `
    <div id="clientsGrid">
      ${clients.map(ClientCard).join("")}
    </div>
  `;

    }
  });
}

function activarBuscadorClientes() {
  const input = document.getElementById("buscadorClientes");
  if (!input) return;

  input.addEventListener("input", () => {
    const texto = input.value.toLowerCase();
    const cards = document.querySelectorAll("#clientsGrid .client-card");

    cards.forEach(card => {
      const contenido = card.innerText.toLowerCase();
      card.style.display = contenido.includes(texto) ? "" : "none";
    });
  });
}
