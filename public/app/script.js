import { headerHTML, setupMobileMenu } from "./components/header.js";
import { navPc, navMobile } from "./components/menu.js";

const session = window.USER_SESSION;
const mq = window.matchMedia("(max-width: 768px)");

const cleanMenus = () => {
  document.getElementById("mobileMenu")?.remove();
  document.querySelector(".sidebar")?.remove();
};

const loadLayout = () => {
  cleanMenus();

  const sector = session.actual; // sector real desde sesión

  if (mq.matches) {
    document.body.insertAdjacentHTML("afterbegin", navMobile({
      sectores: session.sectores,
      actual: sector
    }));
    setupMobileMenu();
  } else {
    document.getElementById("main").insertAdjacentHTML("afterbegin", navPc({
      sectores: session.sectores,
      actual: sector
    }));
  }

  setupSectorSelector();
};

// Cambiar sector
const setupSectorSelector = () => {
  const select = document.getElementById("sectorSelect");
  if (!select) return;

  select.addEventListener("change", async e => {
    const sector = e.target.value;

    await fetch("api/setSector.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sector })
    });

    location.reload();
  });
};

const init = () => {
  // Header solo una vez
  if (!document.querySelector(".header")) {
    document.body.insertAdjacentHTML("afterbegin", headerHTML);
  }

  loadLayout();
  mq.addEventListener("change", loadLayout);
};

document.addEventListener("DOMContentLoaded", init);
