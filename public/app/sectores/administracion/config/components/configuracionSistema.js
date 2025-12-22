
export function configuracionSistema({
  es24hs = true,
  horaInicio = "08:00",
  horaFin = "18:00",
  onChangeTipo,
  onChangeInicio,
  onChangeFin,
  onGuardar
}) {
  return `
    <section class="configuracion">

      <header class="config-header">
        <h2>Configuración General</h2>
        <p>Administra la configuración del sistema</p>
      </header>

      <div class="config-card">

        <div class="config-title">
          <span class="icon">🕒</span>
          <strong>Horarios de Acceso</strong>
        </div>

        <div class="config-field">
          <label>Disponibilidad del Sistema</label>
          <select id="tipoHorario">
            <option value="24" ${es24hs ? "selected" : ""}>Disponible 24/7</option>
            <option value="custom" ${!es24hs ? "selected" : ""}>Horario específico</option>
          </select>
        </div>

        ${
          !es24hs
            ? `
              <div class="config-hours">
                <div>
                  <label>Hora de Inicio</label>
                  <input type="time" id="horaInicio" value="${horaInicio}">
                </div>
                <div>
                  <label>Hora de Fin</label>
                  <input type="time" id="horaFin" value="${horaFin}">
                </div>
              </div>
            `
            : ""
        }

        <div class="config-info">
          ${
            es24hs
              ? "Los empleados pueden acceder al sistema en cualquier momento."
              : `Los empleados podrán acceder al sistema entre las ${horaInicio} y las ${horaFin}.`
          }
        </div>

        <div class="config-actions">
          <button id="guardarConfig" class="btn-primary">
            Guardar configuración
          </button>
        </div>

      </div>
    </section>
  `;
}
