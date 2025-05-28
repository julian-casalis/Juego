<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$datos = json_decode(file_get_contents("php://input"), true);
$username = trim($datos['username'] ?? '');
$tiempo = intval($datos['tiempo'] ?? 0);
$movimientos = intval($datos['movimientos'] ?? 0);

if (!$username || !$tiempo || !$movimientos) {
  echo json_encode(["ok" => false, "error" => "Datos incompletos"]);
  exit;
}

$conexion = new mysqli("localhost", "root", "", "juego");
if ($conexion->connect_error) {
  echo json_encode(["ok" => false, "error" => "Error de conexión"]);
  exit;
}

$username = $conexion->real_escape_string($username);
$sql = "INSERT INTO resultados (username, tiempo, movimientos) VALUES ('$username', $tiempo, $movimientos)";
$ok = $conexion->query($sql);

echo json_encode(["ok" => $ok]);

$conexion->close();
?>