<?php
require_once __DIR__ . "/tcpdf/tcpdf.php";
require_once __DIR__ . "/../../../private/conexion.php";

$conexion = conectar_bd();
$imgPath = __DIR__ . '/../../assets/etiqueta/header.jpg';

if (!file_exists($imgPath)) {
    die('NO EXISTE LA IMAGEN: ' . $imgPath);
}

$id_orden = (int)($_GET["id_orden"] ?? 0);
$cantidad = (int)($_GET["cantidad"] ?? 1);

if ($cantidad < 1) {
    $cantidad = 1;
}

$sql = "
SELECT
    ot.direccion_entrega,
    ot.aclaracion_entrega,
    c.nombre AS cliente_nombre,
    c.telefono AS cliente_telefono,
    c.localidad AS cliente_localidad,
    c.departamento AS cliente_departamento
FROM ordenes_trabajo ot
INNER JOIN clientes c ON ot.id_cliente = c.id
WHERE ot.id = ?
";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("i", $id_orden);
$stmt->execute();
$result = $stmt->get_result();
$orden = $result->fetch_assoc();

function writeIfExists($pdf, $html) {
    if (!empty(trim(strip_tags($html)))) {
        $pdf->writeHTML($html, true, false, true, false);
    }
}

$pdf = new TCPDF('P', 'mm', [100, 100], true, 'UTF-8', false);

$pdf->SetMargins(3, 30, 3);
$pdf->SetAutoPageBreak(false);
$pdf->setPrintHeader(false);
$pdf->setPrintFooter(false);

$fechahoy = date("d/m/Y");

for ($i = 1; $i <= $cantidad; $i++) {

    $pdf->AddPage();

    $pdf->Image($imgPath, 0, 2, 100, 20, 'JPG');

    $pdf->SetFont('helvetica', '', 12);

    $pdf->SetY(30);
    $pdf->Cell(0, 0, $fechahoy, 0, 1, 'R');

    writeIfExists($pdf, !empty($orden['cliente_nombre']) ? 'SR.: <b>' . htmlspecialchars($orden['cliente_nombre']) . '</b>' : '');
    writeIfExists($pdf, !empty($orden['cliente_telefono']) ? 'Teléfono: <b>' . htmlspecialchars($orden['cliente_telefono']) . '</b>' : '');
    writeIfExists($pdf, !empty($orden['direccion_entrega']) ? 'Dirección: <b>' . htmlspecialchars($orden['direccion_entrega']) . '</b>' : '');
    writeIfExists($pdf, !empty($orden['aclaracion_entrega']) ? 'Aclaración: <b>' . htmlspecialchars($orden['aclaracion_entrega']) . '</b>' : '');
    writeIfExists($pdf, !empty($orden['cliente_localidad']) ? 'Ciudad: <b>' . htmlspecialchars($orden['cliente_localidad']) . '</b>' : '');
    writeIfExists($pdf, !empty($orden['cliente_departamento']) ? 'Departamento: <b>' . htmlspecialchars($orden['cliente_departamento']) . '</b>' : '');

    $pdf->SetFont('helvetica', 'B', 16);
    $pdf->SetXY(70, 73);
    $pdf->Cell(0, 0, 'Bulto', 0, 0, 'L');

    $pdf->SetFont('helvetica', 'B', 20);
    $pdf->SetXY(3, 80);
    $pdf->Cell(0, 0, 'ENVÍO', 0, 0, 'L');
    $pdf->SetXY(73, 80);
    $pdf->Cell(0, 0, (string)$i, 0, 0, 'L');

    $pdf->SetFont('helvetica', '', 16);
    $pdf->SetXY(0, 85);
    $pdf->Cell(100, 0, str_repeat('_', 60), 0, 0, 'C');

    $pdf->SetFont('helvetica', '', 10);
    $pdf->SetXY(0, 92);
    $pdf->Cell(100, 0, 'impresoscarnelli.com    @impresoscarnelli', 0, 0, 'C');

    $pdf->Rect(0, 0, 100, 25);
}

$pdf->Output('etiqueta_prueba_10x10.pdf', 'I');
