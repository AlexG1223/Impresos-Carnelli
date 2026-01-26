export function normalizarVentas(ordenes) {
  const porFecha = {};
  let total = 0;

  ordenes.forEach(o => {
    const fecha = o.fechaIngreso;
    const monto = Number(o.presupuesto) || 0;

    if (!porFecha[fecha]) porFecha[fecha] = 0;
    porFecha[fecha] += monto;
    total += monto;
  });

  return {
    porFecha,
    total
  };
}
