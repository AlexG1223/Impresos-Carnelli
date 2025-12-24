export function configuracionSistema(config = null) {
  const horarioEntrada = config?.horaEntrada ?? "";
  const horarioSalida = config?.horaSalida ?? "";
  const es24hs = config?.es24hs ?? false;

  return `
    <div class="card">
      <h3>Configuración del Sistema</h3>
      <p>Defina el horario de acceso de los empleados</p>

      <form id="configuracionSistemaForm">

        <div id="horariosContainer" class="${es24hs ? "hidden" : ""}">
          <div class="field">
            <label>Horario de Entrada</label>
            <input 
              type="time" 
              name="horario_entrada"
              value="${horarioEntrada}"
            />
          </div>

          <div class="field">
            <label>Horario de Salida</label>
            <input 
              type="time" 
              name="horario_salida"
              value="${horarioSalida}"
            />
          </div>
        </div>

        <div class="checkbox">
          <input 
            type="checkbox" 
            id="es24hs"
            name="es24hs"
            ${es24hs ? "checked" : ""}
          />
          <label for="es24hs">Acceso 24 hs</label>
        </div>

        <p class="info-text">
          Solo los administradores pueden modificar esta configuración.
        </p>

        <button type="submit">Guardar Configuración</button>

      </form>
    </div>
  `;
}
