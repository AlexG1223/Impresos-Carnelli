import { headerHTML, setupMobileMenu } from "./components/header.js";
import { navPc, navMobile, updateMenu } from "./components/menu.js";
import { useMenuActions } from "./hooks/useMenuActions.js";



const session = window.USER_SESSION;
const mq = window.matchMedia("(max-width: 768px)");

const cleanMenus = () => {
  document.getElementById("mobileMenu")?.remove();
  document.querySelector(".sidebar")?.remove();
};

const loadLayout = () => {
  cleanMenus();

  const sector = session.actual; 

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

const setupSectorSelector = () => {
  const select = document.getElementById("sectorSelect");
  if (!select) return;

  select.addEventListener("change", async e => {
    const sector = e.target.value;
    if (!sector) return;

    await fetch("../../public/api/sectores/setSector.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sector })
    });
    session.actual = sector;
    updateMenu(sector, mq.matches);
  });
};




const init = () => {

  if (!document.querySelector(".header")) {
    document.body.insertAdjacentHTML("afterbegin", headerHTML);
  }

  loadLayout();

  const { bindMenuActions } = useMenuActions();
  bindMenuActions();

  mq.addEventListener("change", loadLayout);
};

document.addEventListener("DOMContentLoaded", init);
