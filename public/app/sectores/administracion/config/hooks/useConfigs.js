import { configuracionSistema } from "../components/configuracionSistema.js";
import { getConfiguracionService } from "../services/getConfiguracionService.js";
//import { saveConfiguracionService } from "../services/saveConfiguracionService.js";
import { loadViewCSS } from "/ICSoftware/public/app/utils/viewCssManager.js";


export async function useConfiguracionSistema() {
    loadViewCSS("sectores/administracion/config/styles/configuracionSistema.css");
  const section = document.getElementById("section-sh");

  section.innerHTML = "<p>Cargando configuración del sistema...</p>";

  try {
    const res = await getConfiguracionService();

    if (!res.success) {
      section.innerHTML = `
        <div class="card">
          <h3>Configuración del Sistema</h3>
          <p>No existe una configuración registrada.</p>
        </div>
      `;
      return;
    }

    section.innerHTML = configuracionSistema(res.data);

  } catch (error) {
    console.error(error);
    section.innerHTML = "<p>Error inesperado al cargar la configuración.</p>";
  }
}