export function normalizarImpresiones(ordenes) {
  const generalPorFecha = {};
  let totalGeneral = 0;

  const operarios = {};

  ordenes.forEach(o => {
    const fecha = o.fechaIngreso;
    const cant = Number(o.cantidadImpresiones) || 0;
    const nombre = o.operario.nombre;
    const sector = o.sector;

    if (!generalPorFecha[fecha]) generalPorFecha[fecha] = 0;
    generalPorFecha[fecha] += cant;
    totalGeneral += cant;


    if (!operarios[nombre]) {
      operarios[nombre] = {
        OFFSET: { porFecha: {}, total: 0 },
        SERIGRAFIA: { porFecha: {}, total: 0 }
      };
    }

    if (!operarios[nombre][sector].porFecha[fecha]) {
      operarios[nombre][sector].porFecha[fecha] = 0;
    }

    operarios[nombre][sector].porFecha[fecha] += cant;
    operarios[nombre][sector].total += cant;
  });

  return {
    general: {
      porFecha: generalPorFecha,
      total: totalGeneral
    },
    operarios
  };
}
