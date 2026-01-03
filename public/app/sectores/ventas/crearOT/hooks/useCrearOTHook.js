import { crearOTForm } from "../components/crearOTForm.js";
import { crearOTService } from "../services/crearOTService.js";
import { initSeleccionarCliente } from "./useSeleccionarCliente.js";
import { loadViewCSS } from "https://impresoscarnelli.com/public/app/utils/viewCssManager.js";
import { initSeleccionarOTRepetida } from "../hooks/useSeleccionarOTRepetida.js";



export async function crearOrdenDeTrabajo() {
  loadViewCSS("sectores/ventas/crearOT/styles/crearOT.css");

  const section = document.getElementById("section-sh");
  section.innerHTML = crearOTForm();

  initSeleccionarCliente();

  document
    .getElementById("btnSeleccionarOTRepetida")
    .addEventListener("click", () => {
      initSeleccionarOTRepetida();
    });

const form = document.getElementById("crearOTForm");

form.onsubmit = async (e) => {
  e.preventDefault();

  if (form.dataset.enviando === "1") return;
  form.dataset.enviando = "1";

  const formData = new FormData(form);

  if (form.dataset.esRepetida === "1") {
    formData.append("es_repeticion", "1");
  }

  const res = await crearOTService(formData);

  form.dataset.enviando = "0";

  if (res.success) {
    alert("OT creada correctamente");
    document.getElementById("section-sh").innerHTML = "";
  } else {
    alert(res.message || "Error al crear la OT");
  }
};

}
