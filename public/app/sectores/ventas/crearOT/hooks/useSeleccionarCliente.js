import { getAllClientsService } from "../../gestionClientes/services/getAllClientsServices.js";

export async function initSeleccionarCliente() {
  const inputNombre = document.getElementById("clienteNombre");
  const inputId = document.getElementById("id_cliente");
  const listContainer = document.getElementById("autocomplete-list");

  if (!inputNombre || !inputId || !listContainer) return;

  let clientes = [];

  // Cargamos los clientes al inicio para tenerlos disponibles para el buscador
  try {
    const res = await getAllClientsService();
    if (res.success && Array.isArray(res.data)) {
      clientes = res.data;
    }
  } catch (error) {
    console.error("Error al cargar clientes:", error);
  }

  inputNombre.addEventListener("input", (e) => {
    const val = e.target.value.toLowerCase();
    listContainer.innerHTML = "";
    
    // Si borra el texto, también borramos el ID seleccionado
    if (!val) {
      inputId.value = "";
      return;
    }

    // Filtrar por nombre o empresa
    const filtrados = clientes.filter(c => 
      (c.nombre && c.nombre.toLowerCase().includes(val)) || 
      (c.empresa && c.empresa.toLowerCase().includes(val))
    ).slice(0, 10); // Limitar a 10 resultados para mejor performance y UI

    filtrados.forEach(cliente => {
      const div = document.createElement("div");
      div.className = "autocomplete-item";
      div.innerHTML = `
        <strong>${cliente.nombre || "Sin nombre"}</strong>
        <small>${cliente.empresa || "Sin empresa"}</small>
      `;
      div.addEventListener("click", () => {
        inputNombre.value = cliente.nombre;
        inputId.value = cliente.id;
        listContainer.innerHTML = "";
      });
      listContainer.appendChild(div);
    });
  });

  // Cerrar lista al hacer click fuera
  document.addEventListener("click", (e) => {
    if (e.target !== inputNombre) {
      listContainer.innerHTML = "";
    }
  });

  // Si el input gana foco y tiene texto, mostrar sugerencias nuevamente
  inputNombre.addEventListener("focus", () => {
    if (inputNombre.value) {
      inputNombre.dispatchEvent(new Event('input'));
    }
  });
}

