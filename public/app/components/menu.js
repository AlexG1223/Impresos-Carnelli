


const menus = {
administracion: {
  pc: `
    <a data-action="usuarios">Gestión de Usuarios</a>
    <a data-action="roles">Roles y Permisos</a>
    <a data-action="ots">Todas las OT</a>
    <a data-action="reportes">Reportes y Estadísticas</a>
    <a data-action="config">Configuración</a>
  `,
    mobile: `
    <a data-action="usuarios">Gestión de Usuarios</a>
    <a data-action="roles">Roles y Permisos</a>
    <a data-action="ots">Todas las OT</a>
    <a data-action="reportes">Reportes y Estadísticas</a>
    <a data-action="config">Configuración</a>
    `
  },

  ventas: {
    pc: `
    
    <a data-action="crearOT">Crear Orden de Trabajo</a>
    <a data-action="clientes">Clientes</a>
    <a data-action="otsVentas">Ver Ordenes</a>
    `,
    mobile: `
    
    <a data-action="crearOT">Crear Orden de Trabajo</a>
    <a data-action="clientes">Clientes</a>
    <a data-action="otsVentas">Ver Ordenes</a>
    `
  },

  diseño: {
    pc: `
          <a data-action="OTPendientesDisenio">Trabajos Pendientes</a>`,
    mobile: `
          <a data-action="OTPendientesDisenio">Trabajos Pendientes</a>`
  },

  serigrafia: {
    pc: `
    <a data-action="Serigrafia">Producción Serigrafia</a>
    <a data-action="ots">Ver Ordenes</a>`,
    mobile: `
    <a data-action="Serigrafia">Producción Serigrafia</a>
     <a data-action="ots">Ver Ordenes</a>`
    
  },

  offset: {
    pc: ` 
    <a data-action="Offset">Producción Offset</a>
    <a data-action="ots">Ver Ordenes</a>`,
    mobile: `    
    <a data-action="Offset">Producción Offset</a>
    <a data-action="ots">Ver Ordenes</a>`
  },

  expedicion: {
    pc: `
    
    <a data-action="expedicion">Trabajos Finalizados</a>`,
    mobile: `
    
    <a data-action="expedicion">Trabajos Finalizados</a>`
  }
};


function sectorSelector(sectores, actual) {
  if (!sectores.length) {
    return `<p class="no-sector">Sin sectores asignados</p>`;
  }

  return `
    <div class="sector-box">
      <select id="sectorSelect">
        <option value="">Seleccione sector</option>
        ${sectores.map(sec =>
          `<option value="${sec}" ${sec === actual ? "selected" : ""}>${sec.toUpperCase()}</option>`
        ).join("")}
      </select>
    </div>
  `;
}


export function navPc(session) {
  const { sectores, actual } = session;
  const selector = sectorSelector(sectores, actual);
  const menu = actual ? menus[actual]?.pc || "" : "";

  return `
    <aside class="sidebar">
      <h3>Impresos Carnelli</h3>
      ${selector}
      <nav id="menuContent">
        ${menu}
        <a href='../../public/api/login/logout.php'>Cerrar Sesión</a>
      </nav>
    </aside>
  `;
}


export function navMobile(session) {
  const { sectores, actual } = session;
  const selector = sectorSelector(sectores, actual);
  const menu = actual ? menus[actual]?.mobile || "" : "";

  return `
    <nav class="mobile-menu" id="mobileMenu">
      ${selector}
      <div id="menuContent">
        ${menu}
        <a href='../../public/api/login/logout.php'>Cerrar Sesión</a>
      </div>
    </nav>
  `;
}


export function updateMenu(sector, isMobile = false) {
  const container = document.getElementById("menuContent");
  if (!container) return;

  const menuHTML = isMobile
    ? menus[sector]?.mobile || ""
    : menus[sector]?.pc || "";

  container.innerHTML = `
    ${menuHTML}
    <a href='../../public/api/login/logout.php'>Cerrar Sesión</a>
  `;
}
