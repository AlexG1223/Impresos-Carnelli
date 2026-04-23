export function editFormComponent(product) {
    return `
        <div class="admin-panel">
            <header class="header-main">
                <button id="btn-back-main">VOLVER</button>
                <h2>IMPRESOS CARNELLI - EDITAR PRODUCTO</h2>
            </header>
            <main class="content">
                <form id="form-edit-product" class="admin-form">
                    <input type="hidden" name="id" value="${product.id}">
                    <div class="form-group">
                        <label>Nombre del Producto:</label>
                        <input type="text" name="name" required value="${product.name}" placeholder="Ej: Cajas para Pizza">
                    </div>
                    
                    <div class="form-group">
                        <label>Categoría:</label>
                        <select name="category_id" id="select-categories" required>
                            <option value="">Cargando categorías...</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Descripción:</label>
                        <textarea name="description" placeholder="Detalles del producto...">${product.description || ''}</textarea>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label>Precio:</label>
                            <input type="number" name="price" step="0.01" required value="${product.price}">
                        </div>
                        <div class="form-group">
                            <label>Stock:</label>
                            <input type="number" name="stock" value="${product.stock}">
                        </div>
                        <div class="form-group">
                            <label>Cantidad Mínima Venta:</label>
                            <input type="number" name="min_quantity" value="${product.min_quantity}">
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Estado Activo:</label>
                        <label class="switch">
                            <input type="checkbox" name="is_active" ${product.is_active == 1 ? 'checked' : ''}>
                            <span class="slider"></span>
                        </label>
                    </div>

                    <div class="form-group">
                        <label>Imágenes Actuales (Click en ⭐ para portada, ❌ para eliminar):</label>
                        <div id="image-preview" class="image-management-grid">
                            ${product.images ? product.images.map(img => `
                                <div class="image-item ${img.is_primary == 1 ? 'is-primary' : ''}" data-url="${img.url}">
                                    <img src="/public/tienda/${img.url}" alt="Product image">
                                    <div class="image-actions">
                                        <span class="set-primary" title="Marcar como portada">${img.is_primary == 1 ? '⭐' : '☆'}</span>
                                        <span class="delete-image" title="Eliminar imagen">❌</span>
                                    </div>
                                    <input type="radio" name="primary_image" value="${img.url}" ${img.is_primary == 1 ? 'checked' : ''} style="display:none">
                                </div>
                            `).join('') : '<p>No hay imágenes.</p>'}
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Agregar más Imágenes:</label>
                        <input type="file" id="product-images" name="images[]" multiple accept="image/*">
                        <div id="new-images-preview" class="image-management-grid"></div>
                    </div>

                    <button type="submit" id="btn-submit-product">ACTUALIZAR PRODUCTO</button>
                </form>
            </main>
        </div>
    `;
}
