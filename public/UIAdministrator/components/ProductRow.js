export function ProductRow(product) {
    const isActive = product.is_active == 1;
    return `
        <tr>
            <td data-label="Nombre">${product.name}</td>
            <td data-label="Descripción">${product.description || ''}</td>
            <td data-label="Stock">${product.stock}</td>
            <td data-label="Precio">$${product.price}</td>
            <td data-label="Cant. Min.">${product.min_quantity}</td>
            <td data-label="Categoría">${product.category_name || 'Sin categoría'}</td>
            <td data-label="Activo">
                <label class="switch">
                    <input type="checkbox" class="toggle-status" data-id="${product.id}" ${isActive ? 'checked' : ''}>
                    <span class="slider"></span>
                </label>
            </td>
            <td data-label="Acciones">
                <span class="action-icon action-edit" data-id="${product.id}" title="Editar">✏️</span>
                <span class="action-icon action-delete" data-id="${product.id}" title="Eliminar">🗑️</span>
            </td>
        </tr>
    `;
}