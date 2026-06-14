export function normalizarVentas(ordenes) {
  const porFecha = {};
  let total = 0;
  const vendedores = {};

  ordenes.forEach(o => {
    const fecha = o.fechaIngreso;
    const monto = Number(o.presupuesto) || 0;
    const nombreVendedor = o.vendedor;

    if (!porFecha[fecha]) porFecha[fecha] = 0;
    porFecha[fecha] += monto;
    total += monto;

    if (nombreVendedor) {
      if (!vendedores[nombreVendedor]) {
        vendedores[nombreVendedor] = { porFecha: {}, total: 0 };
      }
      if (!vendedores[nombreVendedor].porFecha[fecha]) {
        vendedores[nombreVendedor].porFecha[fecha] = 0;
      }
      vendedores[nombreVendedor].porFecha[fecha] += monto;
      vendedores[nombreVendedor].total += monto;
    }
  });

  return {
    porFecha,
    total,
    vendedores
  };
}
