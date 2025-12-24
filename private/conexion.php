<?php

//define('ROOT_PATH', realpath(__DIR__ . '/../'));

function conectar_bd(){
 //date_default_timezone_set('America/Argentina/Buenos_Aires');
$servidor = "localhost";
$bd = "u240116336_ICSoftware";
$usuario = "u240116336_ICSoftware";
$pass = "2TfXxpJ4"; 



$conn = mysqli_connect($servidor, $usuario, $pass, $bd);


if (!$conn) {
    die("Error de conexion " . mysqli_connect_error());
}


  /* if (!mysqli_query($conn, "SET time_zone = '-03:00'")) {
        error_log("No se pudo fijar time_zone a -03:00. Error: " . mysqli_error($conn));
    }
    */
return $conn;
 
}