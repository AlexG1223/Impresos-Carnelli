<?php
session_start();
if (!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true) {
    header("Location: ../login.html");
    exit();
}

$target_dir = "../img/";
$target_file = $target_dir . "logo.png";

if(isset($_POST["submit"]) && isset($_FILES["logo"])) {
    $tmp_name = $_FILES["logo"]["tmp_name"];
    if (!file_exists($tmp_name)) {
        header("Location: ../admin.html?logo_error=No se recibio ningun archivo");
        exit();
    }
    
    $check = getimagesize($tmp_name);
    if($check !== false) {
        $mime = $check['mime'];
        $image = null;
        
        if ($mime == 'image/jpeg') {
            $image = imagecreatefromjpeg($tmp_name);
        } elseif ($mime == 'image/png') {
            $image = imagecreatefrompng($tmp_name);
        } elseif ($mime == 'image/webp') {
            $image = imagecreatefromwebp($tmp_name);
        }
        
        if ($image) {
            // Guardar como PNG real
            imagealphablending($image, false);
            imagesavealpha($image, true);
            if (imagepng($image, $target_file)) {
                imagedestroy($image);
                header("Location: ../admin.html?logo_success=1");
                exit();
            } else {
                imagedestroy($image);
                header("Location: ../admin.html?logo_error=No se pudo guardar la imagen");
                exit();
            }
        } else {
            header("Location: ../admin.html?logo_error=Formato de imagen no compatible");
            exit();
        }
    } else {
        header("Location: ../admin.html?logo_error=El archivo no es una imagen valida");
        exit();
    }
} else {
    header("Location: ../admin.html");
    exit();
}
?>
