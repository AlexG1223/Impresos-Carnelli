let archivosParaSubir = [];
let archivosEliminados = [];

export function activarAgregarArchivosOT() {
  const btnAgregar = document.querySelector(".btn-agregar-archivo");
  const inputFile = document.getElementById("inputAgregarArchivo");
  const grid = document.querySelector(".archivos-grid");
  const form = document.getElementById("editarOTForm");

  if (!btnAgregar || !inputFile || !grid) return;

  archivosParaSubir = [];
  archivosEliminados = [];

  btnAgregar.addEventListener("click", () => {
    inputFile.click();
  });

  grid.addEventListener("click", (e) => {
    const btnEliminar = e.target.closest(".btn-eliminar-archivo");
    if (!btnEliminar) return;

    const card = btnEliminar.closest(".archivo-card");
    const idArchivo = btnEliminar.dataset.id;

    if (idArchivo) {
      archivosEliminados.push(idArchivo);
    } else {
      const fileName = card.dataset.name;
      archivosParaSubir = archivosParaSubir.filter(f => f.name !== fileName);
    }

    card.remove();
  });

  inputFile.addEventListener("change", () => {
    const files = Array.from(inputFile.files);

    files.forEach((file) => {
      if (archivosParaSubir.some(f => f.name === file.name)) return;

      archivosParaSubir.push(file);
      const url = URL.createObjectURL(file);
      const card = document.createElement("div");
      card.className = "archivo-card archivo-nuevo";
      card.dataset.name = file.name;

      let contenido = `<button type="button" class="btn-eliminar-archivo">✕</button>`;
      
      if (file.type.startsWith("image/")) {
        contenido += `<img src="${url}" class="archivo-img" />`;
      } else {
        contenido += `<span>📄 ${file.name}</span>`;
      }

      card.innerHTML = contenido;
      grid.appendChild(card);
    });

    inputFile.value = "";
  });

  if (form) {
    form.addEventListener("submit", () => {
      const existingInputs = form.querySelectorAll('input[name="archivos_eliminados[]"]');
      existingInputs.forEach(i => i.remove());

      archivosEliminados.forEach(id => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = "archivos_eliminados[]";
        input.value = id;
        form.appendChild(input);
      });

      const dataTransfer = new DataTransfer();
      archivosParaSubir.forEach(file => dataTransfer.items.add(file));
      inputFile.files = dataTransfer.files;
    });
  }
}

export function obtenerDatosArchivosEdit() {
  return {
    nuevos: archivosParaSubir,
    eliminados: archivosEliminados
  };
}