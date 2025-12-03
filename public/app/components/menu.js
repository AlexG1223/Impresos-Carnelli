const menus = {
  administracion: {
    pc: `
      <a>Dashboard</a>
      <a>Gestión de Usuarios</a>
      <a>Roles y Permisos</a>
      <a>Todas las OT</a>
      <a>Reportes</a>
      <a>Configuración</a>
    `,
    mobile: `
      <a>Dashboard</a>
      <a>Gestión de Usuarios</a>
      <a>Roles y Permisos</a>
      <a>Todas las OT</a>
      <a>Reportes</a>
      <a>Configuración</a>
    `
  },

  ventas: {
    pc: `
      <a>Dashboard</a>
      <a>Pedidos</a>
      <a>Clientes</a>
    `,
    mobile: `
      <a>Dashboard</a>
      <a>Pedidos</a>
      <a>Clientes</a>
    `
  },

  diseño: {
    pc: `
      <a>Dashboard</a>
      <a>Diseños</a>
      <a>Aprobaciones</a>
    `,
    mobile: `
      <a>Dashboard</a>
      <a>Diseños</a>
      <a>Aprobaciones</a>
    `
  },

  serigrafia: {
    pc: `
      <a>OT en Producción</a>
      <a>Impresiones</a>
    `,
    mobile: `
      <a>OT en Producción</a>
      <a>Impresiones</a>
    `
  },

  offset: {
    pc: `
      <a>OT en Producción</a>
      <a>Planchas</a>
    `,
    mobile: `
      <a>OT en Producción</a>
      <a>Planchas</a>
    `
  },

  expedicion: {
    pc: `
      <a>Entregas</a>
      <a>Despachos</a>
    `,
    mobile: `
      <a>Entregas</a>
      <a>Despachos</a>
    `
  }
};


export function navPc(sector) {
  const links = menus[sector]?.pc || `<a>Sin permisos</a>`;
  return `
    <aside class="sidebar">
      <h3>Impresos Carnelli</h3>
      <nav>      
      ${links}  
      <a href='../../public/api/login/logout.php'>Cerrar Sesion</a>      
      </nav>
    </aside>
  `;
}

export function navMobile(sector) {
  const links = menus[sector]?.mobile || `<a>Sin permisos</a>`;
  return `
    <nav class="mobile-menu" id="mobileMenu">
      ${links}
      <a href='../../public/api/login/logout.php'>Cerrar Sesion</a>    
    </nav>
  `;
}
