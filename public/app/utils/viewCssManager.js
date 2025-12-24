export function loadViewCSS(href) {

  document
    .querySelectorAll('link[data-view-css]')
    .forEach(link => link.remove());

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  link.dataset.viewCss = "true";

  document.head.appendChild(link);
}
