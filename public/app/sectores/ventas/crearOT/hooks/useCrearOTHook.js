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
let crearOTListenerInicializado = false;

export async function crearOrdenDeTrabajo() {
  loadCrearOTCSS();

  const section = document.getElementById("section-sh");
  section.innerHTML = crearOTForm();

  initSeleccionarCliente();

  if (crearOTListenerInicializado) return; // 🔒
  crearOTListenerInicializado = true;

  section.addEventListener("submit", async (e) => {
    if (e.target.id !== "crearOTForm") return;

    e.preventDefault();

    const form = e.target;

    const res = await crearOTService(form);

    if (res.success) {
      alert("OT creada correctamente");
      section.innerHTML = "";
    } else {
      alert(res.message || "Error al crear la OT");
    }
  });
}
