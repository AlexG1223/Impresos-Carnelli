import { crearOTForm } from "../components/crearOTForm.js";
import { crearOTService } from "../services/crearOTService.js";
import { initSeleccionarCliente } from "./useSeleccionarCliente.js";

function loadCrearOTCSS() {
  if (document.getElementById("crear-ot-css")) return;

  const link = document.createElement("link");
  link.id = "crear-ot-css";
  link.rel = "stylesheet";
  link.href = "sectores/ventas/crearOT/styles/crearOT.css";

  document.head.appendChild(link);
}

export async function crearOrdenDeTrabajo() {
  loadCrearOTCSS();

  const section = document.getElementById("section-sh");
  section.innerHTML = crearOTForm();

  initSeleccionarCliente();

  section.addEventListener("submit", async (e) => {
    if (e.target.id !== "crearOTForm") return;
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.target));

    if (!formData.id_cliente) {
      alert("Debe seleccionar un cliente");
      return;
    }
    console.log(formData);
    const res = await crearOTService(formData);

    if (res.success) {
      alert("Orden de trabajo creada correctamente");
      section.innerHTML = "";
    } else {
      alert(res.message || "Error al crear la OT");
    }
  });
}
