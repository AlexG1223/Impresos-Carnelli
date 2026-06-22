function limpiarPapelNombre(nombre) {
    if (!nombre) return "-";
    return nombre.replace(/\s*\(\d+(?:\.\d+)?x\d+(?:\.\d+)?cm\)/i, "").replace(/\s*\(Bobina.*?\)/i, "");
}

function generarPDFCliente(data) {
    if (typeof html2pdf === 'undefined') {
        alert("La librería PDF aún se está cargando o no está disponible. Por favor, verifica tu conexión o intenta en unos segundos.");
        return;
    }

    const formatter = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' });

    const desc = data.descripcion || "Trabajo de Impresión / Serigrafía";
    const cant = data.cantidad || 1;
    const precio = data.precio_final || data.precio_final_con_iva || 0;
    
    // Fallbacks to gracefully handle both Calculador runtime and Historial stored JSON
    const papel = limpiarPapelNombre(data.papel_nombre);
    const colores = (data.colores !== undefined && data.colores !== null) ? data.colores : 1;
    const infoFrenteDorso = data.frente_dorso === 'si' ? 'Ambas Caras (Frente y Dorso)' : 'Solo Frente';
    const fecha = data.fecha_emision || new Date().toLocaleDateString('es-AR');
    let numeroCotizacion = Math.floor(Math.random() * 90000) + 10000;
    if (data.id) numeroCotizacion = String(data.id).padStart(5, '0');

    const html = `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 0px 40px; color: #1e293b; background: white; width: 800px; box-sizing: border-box;">
            <!-- Header -->
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #dc2626; padding-bottom: 25px; margin-bottom: 30px;">
                <div style="flex: 1;">
                    <!-- Logo Oficial Subido por el Usuario -->
                    <img src="img/logo.png?v=${Date.now()}" style="max-width: 350px; max-height: 100px; object-fit: contain;" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                    <!-- Fallback / Text Logo (si no hay imagen subida) -->
                    <div style="display: none; font-family: 'Arial Black', Impact, sans-serif;">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <h1 style="color: #000000; font-size: 38px; margin: 0; letter-spacing: -1px; font-weight: 900;">IMPRESOS CARNELLI</h1>
                        </div>
                    </div>
                </div>
                <div style="text-align: right; flex: 1;">
                    <h2 style="margin: 0; color: #dc2626; font-size: 24px; text-transform: uppercase;">Presupuesto</h2>
                    <p style="margin: 5px 0 0 0; color: #94a3b8; font-size: 14px;">Cotización N° ${numeroCotizacion}</p>
                    <p style="margin: 5px 0 0 0; color: #64748b; font-size: 14px;"><strong>Fecha:</strong> ${fecha}</p>
                </div>
            </div>

            <!-- Client Info / Greeting -->
            <div style="margin-bottom: 30px;">
                <h3 style="margin: 0 0 10px 0; color: #000000; font-size: 18px;">Detalle del Servicio</h3>
                <p style="margin: 0; color: #64748b; line-height: 1.5; font-size: 14px;">
                    <strong>Señor(es) / Cliente:</strong> <span style="color: #0f172a;">${data.cliente || 'No especificado'}</span><br>
                    A continuación se detalla la propuesta comercial solicitada para los servicios de impresión gráfica / estampado. Los valores expresados incluyen todos los materiales descritos en las especificaciones.
                </p>
            </div>

            <!-- Central Data Table -->
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 40px; border-radius: 8px; overflow: hidden; border: 1px solid #e2e8f0;">
                <thead>
                    <tr style="background-color: #f8fafc; text-align: left; border-bottom: 2px solid #dc2626;">
                        <th style="padding: 15px; color: #000000; width: 65%;">Descripción del Trabajo</th>
                        <th style="padding: 15px; color: #000000; text-align: right;">Cantidad</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="padding: 20px 15px; border-bottom: 1px solid #f1f5f9;">
                            <strong style="color: #0f172a; font-size: 16px; display: block; margin-bottom: 8px;">${desc}</strong>
                            <ul style="margin: 0; padding-left: 20px; color: #64748b; font-size: 13px; line-height: 1.8;">
                                <li><strong>Sustrato / Prenda:</strong> ${papel}</li>
                                <li><strong>Formato Final:</strong> ${data.formato_final || '-'}</li>
                                <li><strong>Colores:</strong> ${colores} (${infoFrenteDorso})</li>
                                <li><strong>Detalle de Tintas:</strong> ${data.detalle_tintas ? data.detalle_tintas : 'Estándar'}</li>
                            </ul>
                        </td>
                        <td style="padding: 20px 15px; text-align: right; vertical-align: top; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #334155;">
                            ${cant} u.
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- Total Box -->
            <div style="display: flex; justify-content: flex-end; margin-bottom: 50px;">
                <div style="background: #f8fafc; padding: 20px 30px; border-radius: 8px; border: 1px solid #dc2626; border-left: 5px solid #dc2626; width: 300px;">
                    <div style="display: flex; justify-content: space-between; align-items: baseline;">
                        <span style="color: #64748b; font-size: 14px; text-transform: uppercase;">Precio Final</span>
                        <span style="color: #dc2626; font-size: 26px; font-weight: bold;">${formatter.format(precio)}</span>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div style="border-top: 1px dashed #cbd5e1; padding-top: 20px; text-align: center; color: #94a3b8; font-size: 12px; line-height: 1.6;">
                <p style="margin: 0;">Presupuesto válido por 15 días desde su emisión.</p>
                <p style="margin: 5px 0 0 0;">Generado por <strong>Impresos Carnelli</strong></p>
            </div>
        </div>
    `;

    const opt = {
        margin:       [85, 0, 40, 0], // 85pt son aproximadamente 3cm exactos
        filename:     `Presupuesto_${desc.substring(0,20).replace(/[^a-z0-9]/gi, '_')}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true, letterRendering: true },
        jsPDF:        { unit: 'pt', format: 'a4', orientation: 'portrait' }
    };

    // Pasamos el string HTML directamente a html2pdf.
    // Esto evita tener que inyectarlo en el DOM manualmente y previene bugs visuales.
    html2pdf().set(opt).from(html).save();
}

function generarPDFUnificado(listaDatos) {
    if (typeof html2pdf === 'undefined') {
        alert("La librería PDF aún se está cargando o no está disponible.");
        return;
    }

    if (!listaDatos || listaDatos.length === 0) return;

    const formatter = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' });

    const cliente = listaDatos[0].cliente || 'No especificado';
    const fecha = new Date().toLocaleDateString('es-AR');
    let numeroCotizacion = Math.floor(Math.random() * 90000) + 10000;

    let filasHTML = '';
    let totalGeneral = 0;

    listaDatos.forEach(data => {
        const desc = data.descripcion || "Trabajo de Impresión / Serigrafía";
        const cant = data.cantidad || 1;
        const precio = data.precio_final || data.precio_final_con_iva || 0;
        const papel = limpiarPapelNombre(data.papel_nombre);
        const colores = (data.colores !== undefined && data.colores !== null) ? data.colores : 1;
        const infoFrenteDorso = data.frente_dorso === 'si' ? 'Ambas Caras (Frente y Dorso)' : 'Solo Frente';

        totalGeneral += parseFloat(precio);

        filasHTML += `
            <tr>
                <td style="padding: 15px; border-bottom: 1px solid #f1f5f9;">
                    <strong style="color: #0f172a; font-size: 15px; display: block; margin-bottom: 5px;">${desc}</strong>
                    <div style="color: #64748b; font-size: 12px; line-height: 1.6;">
                        ${papel} | Formato: ${data.formato_final || '-'} | Colores: ${colores} (${infoFrenteDorso})
                    </div>
                </td>
                <td style="padding: 15px; text-align: center; vertical-align: middle; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #334155;">
                    ${cant} u.
                </td>
                <td style="padding: 15px; text-align: right; vertical-align: middle; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #dc2626;">
                    ${formatter.format(precio)}
                </td>
            </tr>
        `;
    });

    const html = `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 0px 40px; color: #1e293b; background: white; width: 800px; box-sizing: border-box;">
            <!-- Header -->
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #dc2626; padding-bottom: 25px; margin-bottom: 30px;">
                <div style="flex: 1;">
                    <img src="img/logo.png?v=${Date.now()}" style="max-width: 350px; max-height: 100px; object-fit: contain;" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                    <div style="display: none; font-family: 'Arial Black', Impact, sans-serif;">
                        <h1 style="color: #000000; font-size: 38px; margin: 0; letter-spacing: -1px; font-weight: 900;">IMPRESOS CARNELLI</h1>
                    </div>
                </div>
                <div style="text-align: right; flex: 1;">
                    <h2 style="margin: 0; color: #dc2626; font-size: 24px; text-transform: uppercase;">Presupuesto Consolidado</h2>
                    <p style="margin: 5px 0 0 0; color: #94a3b8; font-size: 14px;">Cotización Múltiple N° ${numeroCotizacion}</p>
                    <p style="margin: 5px 0 0 0; color: #64748b; font-size: 14px;"><strong>Fecha:</strong> ${fecha}</p>
                </div>
            </div>

            <!-- Client Info / Greeting -->
            <div style="margin-bottom: 30px;">
                <h3 style="margin: 0 0 10px 0; color: #000000; font-size: 18px;">Detalle del Servicio</h3>
                <p style="margin: 0; color: #64748b; line-height: 1.5; font-size: 14px;">
                    <strong>Señor(es) / Cliente:</strong> <span style="color: #0f172a;">${cliente}</span><br>
                    A continuación se detalla la propuesta comercial solicitada agrupando varios ítems.
                </p>
            </div>

            <!-- Central Data Table -->
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 40px; border-radius: 8px; overflow: hidden; border: 1px solid #e2e8f0;">
                <thead>
                    <tr style="background-color: #f8fafc; text-align: left; border-bottom: 2px solid #dc2626;">
                        <th style="padding: 12px 15px; color: #000000; width: 55%;">Descripción del Trabajo</th>
                        <th style="padding: 12px 15px; color: #000000; text-align: center; width: 15%;">Cantidad</th>
                        <th style="padding: 12px 15px; color: #000000; text-align: right; width: 30%;">Precio Unitario/Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${filasHTML}
                </tbody>
            </table>

            <!-- Total Box -->
            <div style="display: flex; justify-content: flex-end; margin-bottom: 50px;">
                <div style="background: #f8fafc; padding: 20px 30px; border-radius: 8px; border: 1px solid #dc2626; border-left: 5px solid #dc2626; width: 300px;">
                    <div style="display: flex; justify-content: space-between; align-items: baseline;">
                        <span style="color: #64748b; font-size: 14px; text-transform: uppercase;">Total General</span>
                        <span style="color: #dc2626; font-size: 26px; font-weight: bold;">${formatter.format(totalGeneral)}</span>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div style="border-top: 1px dashed #cbd5e1; padding-top: 20px; text-align: center; color: #94a3b8; font-size: 12px; line-height: 1.6;">
                <p style="margin: 0;">Presupuesto válido por 15 días desde su emisión.</p>
                <p style="margin: 5px 0 0 0;">Generado por <strong>Impresos Carnelli</strong></p>
            </div>
        </div>
    `;

    const opt = {
        margin:       [85, 0, 40, 0], // 85pt son aproximadamente 3cm exactos
        filename:     `Presupuesto_Consolidado_${cliente.substring(0,15).replace(/[^a-z0-9]/gi, '_')}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true, letterRendering: true },
        jsPDF:        { unit: 'pt', format: 'a4', orientation: 'portrait' }
    };

    // Pasamos el string HTML directamente a html2pdf
    html2pdf().set(opt).from(html).save();
}
