import { headerHTML, setupMobileMenu } from "./components/header.js";
import { navPc, navMobile } from "./components/menu.js";

const mq = window.matchMedia("(max-width: 768px)");

const cleanMenus = () => {
  document.getElementById("mobileMenu")?.remove();
  document.querySelector(".sidebar")?.remove();
};

const loadLayout = () => {
  cleanMenus();

  if (mq.matches) {
    document.body.insertAdjacentHTML("afterbegin", navMobile);
    setupMobileMenu();
  } else {
    document.getElementById("main").insertAdjacentHTML("afterbegin", navPc);
  }
};

const init = () => {
  document.body.insertAdjacentHTML("afterbegin", headerHTML);
  loadLayout();
  mq.addEventListener("change", loadLayout);
};

document.addEventListener("DOMContentLoaded", init);
