import { gestionUsuarios } from "../sectores/administracion/gestionUsuarios/hooks/useGestorUsuarios.js";
import { gestionRoles } from "../sectores/administracion/gestionRoles/hooks/useGestorRoles.js";
import { gestionClientes } from "../sectores/ventas/gestionClientes/hooks/useGestionClientes.js";
import { crearOrdenDeTrabajo } from "../sectores/ventas/crearOT/hooks/useCrearOTHook.js";
import { OTPendientesDisenio } from "../sectores/disenio/hooks/useOTPendientesDisenio.js";

export const useMenuActions = () => {

  const actions = {

    dashboard() {
      console.log("Dashboard cargado");
      // loadDashboard();
    },

    usuarios() {
     
      gestionUsuarios()

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

    config() {
      console.log("Configuración");
      // loadConfig();
    },
    clientes () {
      gestionClientes();

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

    document.addEventListener("click", e => {
      const btn = e.target.closest("[data-action]");
      if (!btn) return;

      e.preventDefault();

      const action = btn.dataset.action;
      executeAction(action);
    });

  };


  return { bindMenuActions };
};
