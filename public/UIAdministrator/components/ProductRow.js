export function ProductRow(product) {
    return `
        <tr>
            <td>${product.name}</td>
            <td>${product.description || ''}</td>
            <td>${product.stock}</td>
            <td>$${product.price}</td>
            <td>${product.min_quantity}</td>
            <td>${product.category_name || 'Sin categoría'}</td>
            <td>${product.is_active ? 'Si' : 'No'}</td>
            <td>
                <span class="action-delete" data-id="${product.id}" style="cursor:pointer; color:red; text-decoration:underline;">eliminar</span>
               <!-- <span class="action-edit" data-id="${product.id}" style="cursor:pointer; color:blue; text-decoration:underline;">editar</span>
            </td>
        </tr>
    `;
}