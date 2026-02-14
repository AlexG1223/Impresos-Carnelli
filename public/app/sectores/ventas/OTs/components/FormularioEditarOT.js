
function esImagen(path) {
  return /\.(jpg|jpeg|png|gif|webp)$/i.test(path);
}

function esPDF(path) {
  return /\.pdf$/i.test(path);
}


export function FormularioEditarOT(ot) {

  const renderArchivos = () => {

    if (!ot.archivos || ot.archivos.length === 0) {
      return `
      <div class="archivos-grid">
      <p class="sin-archivos">No hay archivos cargados</p>
      </div>
      `;
    }

    return `
      <div class="archivos-grid">

        ${ot.archivos.map(a => {

          if (esImagen(a.ruta_archivo)) {
            return `
              <div class="archivo-card" data-id="${a.id}">
                
                <button 
                  type="button"
                  class="btn-eliminar-archivo"
                  data-id="${a.id}">
                  ✕
                </button>

                <img 
                  src="https://impresoscarnelli.com/${a.ruta_archivo}" 
                  class="archivo-img"
                  loading="lazy"
                />
              </div>
            `;
          }

          if (esPDF(a.ruta_archivo)) {
            return `
              <div class="archivo-card archivo-pdf" data-id="${a.id}">
                
                <button 
                  type="button"
                  class="btn-eliminar-archivo"
                  data-id="${a.id}">
                  ✕
                </button>

                <a href="https://impresoscarnelli.com/${a.ruta_archivo}" target="_blank" rel="noopener">
                  📄 Ver PDF
                </a>

              </div>
            `;
          }

          return `
            <div class="archivo-card archivo-otro" data-id="${a.id}">
              
              <button 
                type="button"
                class="btn-eliminar-archivo"
                data-id="${a.id}">
                ✕
              </button>

              <a href="https://impresoscarnelli.com/${a.ruta_archivo}" target="_blank" rel="noopener">
                Archivo
              </a>

            </div>
          `;

        }).join("")}

      </div>
    `;
  };

  return `
    <h2>Editar Orden de Trabajo</h2>

    <form id="editarOTForm" class="form" enctype="multipart/form-data">

      <label>Cliente *</label>
      <input type="text" value="${ot.cliente_nombre}" readonly required />

      <input type="hidden" name="id_cliente" value="${ot.id_cliente}" />
      <input type="hidden" name="id_ot" value="${ot.id_ot}" />

      <label>Presupuesto Asociado</label>
      <input name="presupuesto" type="number" step="0.01" value="${ot.presupuesto}" />

      <label>Fecha de Ingreso *</label>
      <input name="fecha_ingreso" type="datetime" value="${ot.fecha_ingreso}" required />

      <label>Fecha Prometida</label>
      <input name="fecha_prometida" type="date" value="${ot.fecha_prometida}" />

      <label>Detalle del Trabajo</label>
      <textarea name="detalle_trabajo">${ot.detalle_trabajo}</textarea>

      <label>Seña</label>
      <input name="sena" type="number" step="0.01" value="${ot.sena}" />

      <label>Dirección de Entrega</label>
      <input name="direccion_entrega" type="text" value="${ot.direccion_entrega}" required />

      <label>Aclaración de Entrega</label>
      <textarea name="aclaracion_entrega">${ot.aclaracion_entrega}</textarea>

      <label>Cantidad de Impresiones</label>
      <input name="cantidad_impresiones" type="number" value="${ot.cantidad_impresiones}" />

      <label>Sector Destino</label>
      <select name="sector_destino" required>
        <option value="OFFSET" ${ot.sector_destino === "OFFSET" ? "selected" : ""}>OFFSET</option>
        <option value="SERIGRAFIA" ${ot.sector_destino === "SERIGRAFIA" ? "selected" : ""}>SERIGRAFIA</option>
      </select>

      <label>
        <input type="checkbox" name="total_pago" ${ot.total_pago ? "checked" : ""}/>
        Pagada en su totalidad
      </label>

      <hr>

      <h3>Archivos</h3>

      ${renderArchivos()}

      <div class="archivo-actions">
        <input type="file" id="inputAgregarArchivo" multiple hidden />
        <button type="button" class="btn-agregar-archivo">
          + Agregar archivos
        </button>
      </div>

      <div class="ot-actions">
        <button type="submit">Actualizar OT</button>
      </div>

    </form>
  `;
}
