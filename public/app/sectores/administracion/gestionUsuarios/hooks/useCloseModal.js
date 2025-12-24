export function bindCloseModal() {
  const btnCancel = document.getElementById("btnCancel");
  const modal = document.getElementById("modalContainer");

  if (!btnCancel) return;

  btnCancel.addEventListener("click", () => {
    modal.innerHTML = "";
  });
}
