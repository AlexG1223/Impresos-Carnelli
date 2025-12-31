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
      <option value="comision">Comisiones</option>
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