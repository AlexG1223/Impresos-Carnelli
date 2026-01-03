import { crearOTForm } from "../components/crearOTForm.js";
import { crearOTService } from "../services/crearOTService.js";
import { initSeleccionarCliente } from "./useSeleccionarCliente.js";
import { loadViewCSS } from "https://impresoscarnelli.com/public/app/utils/viewCssManager.js";
import { initSeleccionarOTRepetida } from "../hooks/useSeleccionarOTRepetida.js";

let crearOTListenerInicializado = false;

export async function crearOrdenDeTrabajo() {
  loadViewCSS("sectores/ventas/crearOT/styles/crearOT.css");

  const section = document.getElementById("section-sh");
  section.innerHTML = crearOTForm();

  initSeleccionarCliente();

  if (crearOTListenerInicializado) return;
  crearOTListenerInicializado = true;

  // OT repetida
  document
    .getElementById("btnSeleccionarOTRepetida")
    .addEventListener("click", () => {
      initSeleccionarOTRepetida();
    });

  section.addEventListener("submit", async (e) => {
    if (e.target.id !== "crearOTForm") return;

    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    // 👉 detectar OT repetida
    if (form.dataset.esRepetida === "1") {
      formData.append("es_repeticion", "1");
    }

    const res = await crearOTService(formData);

    if (res.success) {
      alert("OT creada correctamente");
      section.innerHTML = "";
    } else {
      alert(res.message || "Error al crear la OT");
    }
  });
}
