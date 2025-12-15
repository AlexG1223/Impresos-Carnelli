import { getOTPendientesService } from "../services/getOTPendientesService.js";
import { OTPendientesTable } from "../components/OTPendientesTable.js";
import { openOTModal, initOTDetalleModal } from "../components/OTDetalleModal.js";
// ⬆️ modal desacoplado

function loadOTPendientesCSS() {
  if (document.getElementById("ot-pendientes-css")) return;

  const link = document.createElement("link");
  link.id = "ot-pendientes-css";
  link.rel = "stylesheet";
  link.href = "sectores/disenio/styles/OTPendientesDisenio.css";

  document.head.appendChild(link);
}

export async function OTPendientesDisenio() {
  loadOTPendientesCSS();

  const section = document.getElementById("section-sh");
  section.innerHTML = "";

  const res = await getOTPendientesService();
  if (!res.success) return;

  section.innerHTML = OTPendientesTable(res.data);

  // 🔹 Delegación de eventos para el botón 👁
  section.addEventListener("click", async (e) => {
    const btn = e.target.closest(".btn-ver");
    if (!btn) return;

    const idOT = btn.dataset.id;

    // 🔜 luego será service real
    const otDetalle = await obtenerDetalleOTMock(idOT);

    openOTModal(otDetalle);
  });

  // listeners globales del modal
  initOTDetalleModal();
}
async function obtenerDetalleOTMock(id) {
  return {
    id,
    cliente_nombre: "Empresa ABC S.A.",
    vendedor_nombre: "Juan Pérez",
    fecha_prometida: "2024-01-25",
    presupuesto: "PRES-2024-001",
    archivos: [
      { nombre: "catalogo_abc.pdf", url: "#" },
      { nombre: "logo_abc.eps", url: "#" }
    ]
  };
}
