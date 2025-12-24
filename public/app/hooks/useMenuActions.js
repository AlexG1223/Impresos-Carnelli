import { gestionUsuarios } from "../sectores/administracion/gestionUsuarios/hooks/useGestorUsuarios.js";
import { gestionRoles } from "../sectores/administracion/gestionRoles/hooks/useGestorRoles.js";
import { gestionClientes } from "../sectores/ventas/gestionClientes/hooks/useGestionClientes.js";
import { crearOrdenDeTrabajo } from "../sectores/ventas/crearOT/hooks/useCrearOTHook.js";
import { OTPendientesDisenio } from "../sectores/disenio/hooks/useOTPendientesDisenio.js";
import { useOffset } from "../sectores/offset/hooks/useOffset.js";
import { useSerigrafia } from "../sectores/serigrafia/hooks/useSerigrafia.js";
import { useExpedicion } from "../sectores/expedicion/hooks/useExpedicion.js";
import { useConfiguracionSistema } from "../sectores/administracion/config/hooks/useConfigs.js";
import { useTodasOTs } from "../sectores/administracion/OTs/hooks/useTodasOTs.js";
import { useReportes } from "../sectores/administracion/reportesYEstadisticas/hooks/useReportes.js";

export const useMenuActions = () => {

  const actions = {
    usuarios() {
      gestionUsuarios();
    },
    roles() {
      gestionRoles();
    },
    crearOT() {
      crearOrdenDeTrabajo();
    },
    OTPendientesDisenio() {
      OTPendientesDisenio();
    },
    Offset() {
      useOffset();
    },
    Serigrafia() {
      useSerigrafia();
    },
    clientes() {
      gestionClientes();
    },
    expedicion() {
      useExpedicion();
    },
    config() {
      useConfiguracionSistema();
    },
    ots() {
      useTodasOTs();
    },
    reportes() {
      useReportes();
    }
  };

  const executeAction = (action) => {
    const fn = actions[action];

    if (!fn) {
      console.warn("Acción no definida:", action);
      return;
    }

    fn();
  };

  const bindMenuActions = () => {
    showDefaultBackground();

    document.addEventListener("click", e => {
      const btn = e.target.closest("[data-action]");
      if (!btn) return;

      e.preventDefault();

      executeAction(btn.dataset.action);
    });
  };

  return { bindMenuActions };
};

const showDefaultBackground = () => {
  const main = document.getElementById("section-sh");
  if (!main) return;

  main.innerHTML = `
    <div class="default-bg">
      <img src="/ICSoftware/public/assets/img/ICLogo.jpeg" alt="IC Software">
    </div>
  `;
};
