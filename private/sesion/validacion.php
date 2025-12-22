<?php
session_start();
require_once __DIR__ . "/../conexion.php";

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

$username = $data['username'] ?? '';
$password = $data['password'] ?? '';

if (!$username || !$password) {
    echo json_encode(["success" => false, "message" => "Datos incompletos"]);
    exit;
}

$conexion = conectar_bd();

$sql = "SELECT * FROM usuarios WHERE nombre = ?";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(["success" => false, "message" => "Usuario no encontrado"]);
    exit;
}

$user = $result->fetch_assoc();


if (!password_verify($password, $user['contrasenia'])) {
    echo json_encode(["success" => false, "message" => "Contraseña incorrecta"]);
    exit;
}


if ($user['rol'] !== 'Administrador') {

    $sqlConfig = "SELECT Es24hs, Horario_Entrada, Horario_Salida 
                  FROM configuracion_sistema 
                  LIMIT 1";

    $resultConfig = mysqli_query($conexion, $sqlConfig);

    if (!$resultConfig || mysqli_num_rows($resultConfig) === 0) {
        echo json_encode([
            "success" => false,
            "message" => "No existe configuración del sistema"
        ]);
        exit;
    }

    $config = mysqli_fetch_assoc($resultConfig);

    if ((int)$config['Es24hs'] !== 1) {

        $horaEntrada = $config['Horario_Entrada'];
        $horaSalida  = $config['Horario_Salida'];

        if (!$horaEntrada || !$horaSalida) {
            echo json_encode([
                "success" => false,
                "message" => "Configuración horaria inválida"
            ]);
            exit;
        }

        $ahora = new DateTime("now");
        $entrada = new DateTime($horaEntrada);
        $salida  = new DateTime($horaSalida);

        if ($ahora < $entrada || $ahora > $salida) {
            echo json_encode([
                "success" => false,
                "message" => "Acceso denegado: fuera del horario de trabajo"
            ]);
            exit;
        }
    }
}


$sqlSectores = "SELECT ventas, serigrafia, offset, expedicion, `diseño`, administracion 
                FROM sectores 
                WHERE id_usr = ?";

$stmt2 = $conexion->prepare($sqlSectores);
$stmt2->bind_param("i", $user['id']);
$stmt2->execute();

$resultSectores = $stmt2->get_result();

$sectoresDisponibles = [];

if ($resultSectores->num_rows > 0) {
    $row = $resultSectores->fetch_assoc();
    foreach ($row as $sector => $valor) {
        if ($valor == 1) {
            $sectoresDisponibles[] = $sector;
        }
    }
}


$_SESSION['user'] = [
    "id" => $user['id'],
    "nombre" => $user['nombre'],
    "rol" => $user['rol']
];

$_SESSION["sectores"] = $sectoresDisponibles;
$_SESSION["sector_actual"] = null;


echo json_encode([
    "success" => true,
    "user" => $_SESSION['user'],
    "sectores" => $_SESSION["sectores"]
]);
