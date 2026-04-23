import { getListaOTsRepetidas } from "../services/getListaOTsRepetidas.js";
import { modalSeleccionOTRepetida } from "../components/otRepetidaModal.js";
import { otSeleccionadaService } from "../services/otSeleccionadaService.js";

export async function initSeleccionarOTRepetida() {
  const modalContainer = document.getElementById("modal-OTrepetida");
  if (!modalContainer) return;

  const otData = await getListaOTsRepetidas();

  if (!otData.success) {
    alert(otData.message || "Error al obtener OTs repetidas");
    return;
  }

  modalSeleccionOTRepetida(otData.data);
  modalContainer.classList.add("show");

  modalContainer.querySelectorAll(".ot-row").forEach(row => {
    row.addEventListener("click", async () => {
      const otId = row.dataset.otId;

      const res = await otSeleccionadaService(otId);

      if (!res.success) {
        alert(res.message || "Error al cargar la OT");
        return;
      }

      cargarOTRepetidaEnFormulario(res.data);
      cerrarModal(modalContainer);
    });
  });

  modalContainer.querySelector("[data-close]")?.addEventListener("click", () => {
    cerrarModal(modalContainer);
  });
}

function cerrarModal(container) {
  container.classList.remove("show");
  container.innerHTML = "";
}
function cargarOTRepetidaEnFormulario(data) {
  const { orden_trabajo, archivos } = data;

  const form = document.getElementById("crearOTForm");
  if (!form) return;


  form.dataset.esRepetida = "1";


  document.getElementById("ot-subtitle").textContent =
    "Creando OT a partir de una OT repetida";

  const infoBox = document.getElementById("otRepetidaInfo");
  infoBox.style.display = "block";
  document.getElementById("otRepetidaOrigen").textContent =
    ` (OT #${orden_trabajo.id})`;

  document.getElementById("id_cliente").value = orden_trabajo.id_cliente;
  document.getElementById("clienteNombre").value = orden_trabajo.cliente_nombre;

  // Mostrar archivos existentes
  const archivosContainer = document.getElementById("archivosExistentesContainer");
  const listaArchivos = document.getElementById("listaArchivosExistentes");
  
  if (archivos && archivos.length > 0) {
    archivosContainer.style.display = "block";
    listaArchivos.innerHTML = archivos.map(a => {
        const esImagen = /\.(jpg|jpeg|png|gif|webp)$/i.test(a.ruta_archivo);
        return `
          <div class="archivo-item-preview">
            ${esImagen 
              ? `<img src="/${a.ruta_archivo}" style="width:50px; height:50px; object-fit:cover; border-radius:4px;">` 
              : `<span style="font-size: 20px;">📄</span>`
            }
          </div>
        `;
    }).join("");
  } else {
    archivosContainer.style.display = "none";
  }


  const inputNombre = document.getElementById("clienteNombre");
  inputNombre.readOnly = true;
  inputNombre.disabled = true;

  form.querySelector('[name="detalle_trabajo"]').value =
    orden_trabajo.detalle_trabajo || "";


  form.querySelector('[name="cantidad_impresiones"]').value =
    orden_trabajo.cantidad_impresiones || "";

  form.querySelector('[name="presupuesto"]').value =
    orden_trabajo.presupuesto || "";

  form.querySelector('[name="sena"]').value =
    orden_trabajo.sena || "";


  document.getElementById("sector_destino").value =
    orden_trabajo.sector_destino || "DISEÑO";


  document.getElementById("ot_origen_id").value = orden_trabajo.id;



}
