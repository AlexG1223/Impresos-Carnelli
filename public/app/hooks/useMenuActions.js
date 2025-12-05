import { gestionUsuarios } from "../sectores/administracion/gestionUsuarios/hooks/useGestorUsuarios.js";


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
      console.log("Gestión de roles");
      // loadRoles();
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
