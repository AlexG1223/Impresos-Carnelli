import { ProductRow } from "./ProductRow.js";

export function ProductList(products) {
    return `
        <div class="admin-panel">
            <header class="header-main">
             <button id="btn-back-main">VOLVER</button>
                <h2>IMPRESOS CARNELLI</h2>
                <button id="btn-add-main">AGREGAR</button>
            </header>
            <main class="content">
            <div class="table-container">
                <table class="table-products">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Stock</th>
                            <th>Precio</th>
                            <th>Cant. Min.</th>
                            <th>Categoría</th>
                            <th>Activo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="product-list-body">
                        ${products.length > 0 
                            ? products.map(p => ProductRow(p)).join('') 
                            : '<tr><td colspan="8">No hay productos.</td></tr>'}
                    </tbody>
                </table>
            </div>
            </main>
        </div>
    `;
}