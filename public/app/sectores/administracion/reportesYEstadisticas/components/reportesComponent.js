export function renderReportes() {

    
  const container = document.getElementById("section-sh");
  if (!container) return;
    
container.innerHTML = `<h2>Reportes y Estadísticas</h2>
    <p>Análisis de rendimiento y estadísticas del sistema</p>
    <div class="reporte-filtros">

  <div class="campo">
    <label for="tipoReporte">Tipo de Reporte</label>
    <select id="tipoReporte" name="tipoReporte">
      <option value="impresiones">Impresiones</option>
      <option value="ventas">Ventas</option>
      <option value="graficar">Gráficos</option>
      <option value="diseño">Diseño</option>
    </select>
  </div>

  <div class="campo">
    <label for="fechaInicio">Fecha Inicio</label>
    <input
      type="date"
      id="fechaInicio"
      name="fechaInicio"
    />
  </div>

  <div class="campo">
    <label for="fechaFin">Fecha Fin</label>
    <input
      type="date"
      id="fechaFin"
      name="fechaFin"
    />
  </div>
  
  <div class="campo">
  <div id="comision-container" style="display:none">
  <label>Comisión (%)</label>
  <input type="number" id="porcentajeComision" value="10" min="0" step="0.1">
</div>
  </div>

  <div class="campo">
  <div id="precio-diseño-container" style="display:none">
  <label>Precio por Diseño ($)</label>
  <input type="number" id="precioDiseño" value="0" min="0" step="0.1">
</div>
  </div>

  <div class="campo campo-boton">
    <button type="button" class="btn-generar">
      ⬇ Generar Reporte
    </button>
  </div>

</div>

<div id="reporteResultado" class="reporte-resultado">
</div>
`;


}