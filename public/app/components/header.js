export function setupMobileMenu() {
  const toggle = document.getElementById("menuToggle");
  const menu = document.getElementById("mobileMenu");

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const open = menu.classList.toggle("open");
      document.body.style.overflow = open ? "hidden" : "auto";
    });
  }
}

export const headerHTML = `
<header class="header">
  <div class="header-left">
    <span class="mobile-only" id="menuToggle">☰</span>
    <h2>Sistema de Gestión - Impresos Carnelli</h2>
  </div>

  <div class="header-right">
    <span class="user">Administrador</span>
    <img src="https://ui-avatars.com/api/?name=Admin" />
  </div>
</header>
`;
