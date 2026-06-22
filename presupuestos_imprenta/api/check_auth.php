<?php
session_start();
header('Content-Type: application/json');

if ((isset($_SESSION['logged_in']) && $_SESSION['logged_in'] === true) || isset($_SESSION['user'])) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false]);
}
?>
