export function formComponent() {
    return `
        <div class="admin-panel">
            <header class="header-main">
                <button id="btn-back-main">VOLVER</button>
                <h2>IMPRESOS CARNELLI - AGREGAR PRODUCTO</h2>
            </header>
            <main class="content">
                <form id="form-add-product" class="admin-form">
                    <div class="form-group">
                        <label>Nombre del Producto:</label>
                        <input type="text" name="name" required placeholder="Ej: Cajas para Pizza">
                    </div>
                    
                    <div class="form-group">
                        <label>Categoría:</label>
                        <select name="category_id" id="select-categories" required>
                            <option value="">Cargando categorías...</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Descripción:</label>
                        <textarea name="description" placeholder="Detalles del producto..."></textarea>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label>Precio:</label>
                            <input type="number" name="price" step="0.01" required>
                        </div>
                        <div class="form-group">
                            <label>Stock Inicial:</label>
                            <input type="number" name="stock" value="0">
                        </div>
                        <div class="form-group">
                            <label>Cantidad Mínima Venta:</label>
                            <input type="number" name="min_quantity" value="1">
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Imágenes del Producto (Puedes seleccionar varias):</label>
                        <input type="file" id="product-images" name="images[]" multiple accept="image/*">
                        <div id="image-preview" style="display: flex; gap: 10px; margin-top: 10px;"></div>
                    </div>

                    <button type="submit" id="btn-submit-product">GUARDAR PRODUCTO</button>
                </form>
            </main>
        </div>
    `;
}