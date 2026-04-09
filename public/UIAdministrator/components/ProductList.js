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
                            <th>nombre</th>
                            <th>descripcion</th>
                            <th>stock</th>
                            <th>precio</th>
                            <th>cant. min.</th>
                            <th>categoria</th>
                            <th>activo</th>
                            <th>acciones</th>
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