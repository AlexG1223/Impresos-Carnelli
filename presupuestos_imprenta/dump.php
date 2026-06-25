<?php
$costo = 3435;
// Let's test combinations to see how to get 3687.5:
echo "Costo: $costo\n";

for ($g = 0; $g <= 30; $g++) {
    for ($c = 0; $c <= 30; $c++) {
        // formula A: cost * (1+g/100) * (1+c/100) * 0.9
        $valA = $costo * (1 + $g/100) * (1 + $c/100) * 0.9;
        if (abs($valA - 3687.5) < 1) {
            echo "Formula A (g=$g, c=$c, revendedor=10%): $valA\n";
        }
        
        // formula B: cost * (1+g/100) * (1 - 0.10) * (1 + c/100)
        // same as A.
        
        // formula C: cost * (1+g/100) * 0.9 + cost * c/100
        $valC = $costo * (1 + $g/100) * 0.9 + $costo * $c/100;
        if (abs($valC - 3687.5) < 1) {
            echo "Formula C (g=$g, c=$c, revendedor=10%): $valC\n";
        }

        // formula D: without revendedor discount?
        $valD = $costo * (1 + $g/100) * (1 + $c/100);
        if (abs($valD - 3687.5) < 1) {
            echo "Formula D (g=$g, c=$c, no revendedor): $valD\n";
        }
        
        // formula E: Costo + Ganancia + Comision with some discount?
        // Let's check if the user is checking "Revendedor (-10%)" but the formula in the calculator is:
        // (Costo + Ganancia) * (1 - 0.10) * 1.22? No, the calculator has 3687.5.
        
        // What if they did: (Costo + Ganancia) * (1 + Comision% - Revendedor%)
        $valF = ($costo * (1 + $g/100)) * (1 + $c/100 - 0.10);
        if (abs($valF - 3687.5) < 1) {
            echo "Formula F (g=$g, c=$c, c-10%): $valF\n";
        }
    }
}

// Let's also check if they did 3435 * 1.0735 = 3687.5.
// Why would they do 1.0735?
// Wait! What if:
// g = 10% (ganancia)
// c = 15% (comisión)
// But the commission is divided or applied differently?
// What if commission is calculated as: $venta_base * (15/85) or something? No.
// Let's print out what the exact subtotal should be if they checked "Revendedor"
// under g=10, c=15, iva=22:
$g = 10;
$c = 15;
$iva = 22;

$ganancia_valor_exact  = $costo * ($g / 100); // 343.5
$venta_base_exact      = $costo + $ganancia_valor_exact; // 3778.5
$comision_valor_exact  = $venta_base_exact * ($c / 100); // 566.775
$subtotal_venta_exact  = $venta_base_exact + $comision_valor_exact; // 4345.275

// Without discount: 4345.275
// With 10% discount: 3910.7475
// Wait, is there a 15% discount?
$subtotal_with_15_discount = $subtotal_venta_exact * 0.85; // 3693.48375
echo "Subtotal with 15% discount: $subtotal_with_15_discount\n";

// What if the user calculates:
// Venta Base (3778.5) with 10% discount (3400.65) and then they add commission of 15% on cost?
// 3400.65 + 3435 * 0.15 = 3400.65 + 515.25 = 3915.9

// Wait, look at:
// 3687.5 / 1.22 = 3022.54? No, 3687.5 * 1.22 = 4498.75.
// So 3687.5 is the subtotal, 4498.75 is the final price.
?>
