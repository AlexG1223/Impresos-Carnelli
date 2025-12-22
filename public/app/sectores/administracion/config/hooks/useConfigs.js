//import { configuracionSistema } from "../components/configuracionSistema.js";
import { getConfiguracionService } from "../services/getConfiguracionService.js";
//import { saveConfiguracionService } from "../services/saveConfiguracionService.js";
export async function useConfiguracionSistema() {
  const section = document.getElementById("section-sh");
    section.innerHTML = "<p>Cargando configuración del sistema...</p>";
   const res = await getConfiguracionService();

    if (!res.success) {
      section.innerHTML = "<p>Error al cargar la configuración del sistema.</p>";
      return;
    }
    const config = res.data;
    console.log("Configuración del sistema cargada:", config);

}

