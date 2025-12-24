import { configuracionSistema } from "../components/configuracionSistema.js";
import { getConfiguracionService } from "../services/getConfiguracionService.js";
import { saveConfiguracionService } from "../services/saveConfiguracionService.js";
import { loadViewCSS } from "http://trumanuy.com/ICSoftware/public/app/utils/viewCssManager.js";

export async function useConfiguracionSistema() {
  loadViewCSS("sectores/administracion/config/styles/configuracionSistema.css");
  const section = document.getElementById("section-sh");

  section.innerHTML = "<p>Cargando configuración del sistema...</p>";

  try {
    const res = await getConfiguracionService();

if (!res.success || !res.data) {
  section.innerHTML = `
    <div class="card">
      <h3>Configuración del Sistema</h3>
      <p>No existe una configuración registrada.</p>
    </div>
  `;
  return;
}


    section.innerHTML = configuracionSistema(res.data);

    const form = document.getElementById("configuracionSistemaForm");
    const checkbox24 = document.getElementById("es24hs");
    const horariosContainer = document.getElementById("horariosContainer");

    checkbox24.addEventListener("change", () => {
      horariosContainer.classList.toggle("hidden", checkbox24.checked);
    });


    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const data = {
        es24hs: checkbox24.checked,
        horario_entrada: checkbox24.checked
          ? null
          : form.horario_entrada.value,
        horario_salida: checkbox24.checked
          ? null
          : form.horario_salida.value,
      };

      try {
        if (!checkbox24.checked) {
  if (!form.horario_entrada.value || !form.horario_salida.value) {
    alert("Debe completar horario de entrada y salida");
    return;
  }

  if (form.horario_entrada.value >= form.horario_salida.value) {
    alert("El horario de entrada debe ser menor al de salida");
    return;
  }
}

        const result = await saveConfiguracionService(data);

        if (!result.success) {
          alert(result.message || "Error al guardar la configuración");
          return;
        }

        alert("Configuración guardada correctamente ✅");

      } catch (error) {
        console.error(error);
        alert("Error inesperado al guardar");
      }
    });

  } catch (error) {
    console.error(error);
    section.innerHTML = "<p>Error inesperado al cargar la configuración.</p>";
  }
}
