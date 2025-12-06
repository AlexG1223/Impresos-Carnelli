import { gestionUsuarios } from "../sectores/administracion/gestionUsuarios/hooks/useGestorUsuarios.js";
import { gestionRoles } from "../sectores/administracion/gestionRoles/hooks/useGestorRoles.js";
import { gestionClientes } from "../sectores/ventas/gestionClientes/hooks/useGestionClientes.js";

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

    ots() {
      console.log("Listado de OT");
      // loadOTs();
    },

    reportes() {
      console.log("Módulo reportes");
      // loadReportes();
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
