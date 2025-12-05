<?php
session_start();
$data = json_decode(file_get_contents("php://input"), true);
$_SESSION["sector_actual"] = $data["sector"] ?? null;
