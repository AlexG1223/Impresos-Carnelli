export function configuracionSistema(config = null) {
  const horarioEntrada = config?.Horario_Entrada ?? "";
  const horarioSalida = config?.Horario_Salida ?? "";
  const es24hs = config?.Es24hs ?? false;

  return `
    <div class="card">
      <h3>Configuración del Sistema</h3>
      <p>Defina el horario de acceso de los empleados</p>

      <form id="configuracionSistemaForm">

        ${
          !es24hs
            ? `
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
            `
            : ""
        }

        <div class="checkbox">
          <input 
            type="checkbox" 
            id="es24hs"
            ${es24hs ? "checked" : ""}
            disabled
          />
          <label for="es24hs">Acceso 24 hs</label>
        </div>

        <p class="info-text">
          Solo los administradores pueden modificar esta configuración.
        </p>

      </form>
    </div>
  `;
}
