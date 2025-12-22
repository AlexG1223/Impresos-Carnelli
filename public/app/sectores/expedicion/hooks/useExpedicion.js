import { getExpedicionService} from "../services/expedicionService.js";
//import { expedicionTable } from "../components/expedicionTable.js";
//import { loadViewCSS } from "/ICSoftware/public/app/utils/viewCssManager.js";

export async function useExpedicion() {
 //loadViewCSS("sectores/offset/styles/offsetTable.css");

  const section = document.getElementById("section-sh");
  section.innerHTML = "";

    const res = await getExpedicionService();

    if (!res.success) {
      section.innerHTML = "<p>Error al cargar los datos de expedición.</p>";
      return;
    }


    const trabajos = res.data;
   console.log("Expedición - trabajos cargados:", trabajos);
   
   /* if (trabajos.length === 0) {
      section.innerHTML = "<p>No hay trabajos finalizados para mostrar.</p>";
      return;
    } else {
        section.innerHTML = expedicionTable(res.data);
      return;
    }
    
*/
}
