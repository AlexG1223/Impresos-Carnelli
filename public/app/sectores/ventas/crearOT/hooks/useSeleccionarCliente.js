import { seleccionarClienteModal } from "../components/seleccionarClienteModal.js";
import { getAllClientsService } from "../../gestionClientes/services/getAllClientsServices.js";

export async function initSeleccionarCliente() {
  const btn = document.getElementById("btnSeleccionarCliente");
  const modalContainer = document.getElementById("modal-container");

  if (!btn || !modalContainer) return;

  btn.addEventListener("click", async () => {
    const res = await getAllClientsService();

    if (!res.success || !Array.isArray(res.data)) {
      alert("No se pudieron cargar los clientes");
      return;
    }

    modalContainer.innerHTML = seleccionarClienteModal(res.data);
  });

  modalContainer.addEventListener("click", (e) => {

    if (e.target.id === "cerrarModalCliente") {
      modalContainer.innerHTML = "";
      return;
    }

    const item = e.target.closest("li[data-id]");
    if (!item) return;

    document.getElementById("id_cliente").value = item.dataset.id;
    document.getElementById("clienteNombre").value = item.dataset.nombre;

    modalContainer.innerHTML = "";
  });
}
