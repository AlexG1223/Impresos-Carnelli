export function crearOTForm() {
  return `
    <h2>Crear Orden de Trabajo</h2>
    <p id="ot-subtitle">Registra una nueva OT y envíala a Diseño</p>

    <form id="crearOTForm" enctype="multipart/form-data" data-es-repetida="0">

      <!-- INFO OT REPETIDA -->
      <div id="otRepetidaInfo" style="display:none;" class="ot-repetida-info">
        <strong>OT repetida</strong>
        <span id="otRepetidaOrigen"></span>
      </div>

      <label>Cliente *</label>
      <div class="cliente-selector">
        <input
          type="text"
          id="clienteNombre"
          placeholder="Seleccionar cliente..."
          readonly
          required
        />
        <button type="button" id="btnSeleccionarCliente">
          Elegir
        </button>
      </div>

      <input type="hidden" name="id_cliente" id="id_cliente" />

      <label>Presupuesto Asociado</label>
      <input name="presupuesto" type="number" step="0.01" />

      <label>Fecha de Ingreso *</label>
      <input name="fecha_ingreso" type="date" required />

      <label>Fecha Prometida</label>
      <input name="fecha_prometida" type="date" />

      <label>Detalle del Trabajo</label>
      <textarea name="detalle_trabajo"></textarea>

      <label>Seña</label>
      <input name="sena" type="number" step="0.01" />

      <label>Cantidad de Impresiones</label>
      <input name="cantidad_impresiones" type="number" />

      <label>Archivos del Cliente</label>
      <input
        type="file"
        name="archivos[]"
        multiple
        accept=".pdf,.jpg,.jpeg,.png,.eps"
      />

      <!-- estos se pisan si es OT repetida -->
      <input type="hidden" name="sector_destino" id="sector_destino" value="DISEÑO" />
      <input type="hidden" name="etapa" value="INGRESADA" />

      <!-- metadata -->
      <input type="hidden" name="ot_origen_id" id="ot_origen_id" />

      <div class="ot-actions">
        <button type="submit">Dar Alta de Trabajo</button>
        <button type="button" id="btnSeleccionarOTRepetida">
          Seleccionar OT repetida
        </button>
      </div>

    </form>

    <div id="modal-container"></div>
    <div id="modal-OTrepetida"></div>
  `;
}
