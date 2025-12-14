export function crearOTForm() {
  return `
    <h2>Crear Orden de Trabajo</h2>
    <p>Registra una nueva OT y envíala a Diseño</p>

    <form id="crearOTForm" enctype="multipart/form-data">

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

      <div class="ot-repeticion">
      <label>
        <input type="checkbox" name="es_repeticion" value="1">
        ¿Es un trabajo repetido?
      </label>
</div>

      <label>Archivos del Cliente</label>
      <input
        type="file"
        name="archivos[]"
        multiple
        accept=".pdf,.jpg,.jpeg,.png,.eps"
      />

      <input type="hidden" name="sector_destino" value="DISEÑO" />
      <input type="hidden" name="etapa" value="INGRESADA" />

      <div class="ot-actions">
        <button type="submit">Dar Alta de Trabajo (Enviar a Diseño)</button>
        <button type="button" id="cancelarOT">Cancelar</button>
      </div>

    </form>

    <div id="modal-container"></div>
  `;
}
