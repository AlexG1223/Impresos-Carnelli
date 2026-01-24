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



$pdf = new TCPDF(
    'P',
    'mm',
    [100, 100], 
    true,
    'UTF-8',
    false
);
$fechahoy = date("d/m/Y");

$pdf->SetMargins(0, 0, 0);
$pdf->SetAutoPageBreak(false, 0);
$pdf->setPrintHeader(false);
$pdf->setPrintFooter(false);
for ($i = 1; $i <= $cantidad; $i++) {

    $pdf->AddPage();

    $pdf->SetFont('helvetica', 'B', 16);

    $pdf->Image($imgPath, 0, 2, 100, 20, 'JPG');

    $pdf->SetFont('helvetica', '', 12);

    $pdf->Text(3, 30, 'SR.: ' . ($orden['cliente_nombre'] ?? 'N/A'));
    $pdf->Text(70, 30, $fechahoy);
    $pdf->Text(3, 40, 'Teléfono: ' . ($orden['cliente_telefono'] ?? 'N/A'));

    $pdf->MultiCell(
        80,
        5,
        'Dirección: ' . ($orden['direccion_entrega'] ?? 'N/A'),
        0,
        'L',
        false,
        1,
        3,
        50
    );

    $pdf->Text(3, 60, 'Ciudad: ' . ($orden['cliente_localidad'] ?? 'N/A'));
    $pdf->Text(3, 70, 'Departamento: ' . ($orden['cliente_departamento'] ?? 'N/A'));

    $pdf->SetFont('helvetica', 'B', 18);
    $pdf->Text(70, 73, 'Bulto');

    $pdf->SetFont('helvetica', 'B', 24);
    $pdf->Text(30, 80, 'ENVÍO');
    $pdf->Text(73, 80, (string)$i); 

    $pdf->SetFont('helvetica', '', 12);
    $pdf->Text(0, 85, '________________________________________________________________');

    $pdf->Text(5, 92, 'impresoscarnelli.com    @impresoscarnelli');

    $pdf->Rect(0, 0, 100, 25);
}


$pdf->Output('etiqueta_prueba_10x10.pdf', 'I');
