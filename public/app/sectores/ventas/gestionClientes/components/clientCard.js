export function ClientCard(client) {
  return `
    <div class="client-card">
      <div class="card-header">
        <div class="icon">🏢</div>
        <div>
          <strong>${client.nombre_empresa}</strong>
          <div class="rut">${client.rut}</div>
        </div>
      </div>

      <div class="card-body">
        <p><small>Razón Social</small><br>${client.razon_social}</p>
        <p><small>Localidad</small><br>${client.localidad}</p>
        <p><small>Teléfono</small><br>${client.telefono}</p>
      </div>

      <div class="card-footer">
        <button data-action="view" data-id="${client.id}">👁 Ver</button>
        <button data-action="edit" data-id="${client.id}">✏️ Editar</button>
      </div>
    </div>
  `;
}
