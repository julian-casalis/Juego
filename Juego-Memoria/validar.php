<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$datos = json_decode(file_get_contents("php://input"), true);
$username = trim($datos['username'] ?? '');

if (!$username) {
  echo json_encode(["error" => "Usuario no válido"]);
  exit;
}

$conexion = new mysqli("localhost", "root", "", "juego");
if ($conexion->connect_error) {
  echo json_encode(["error" => "Error de conexión"]);
  exit;
}

$username = $conexion->real_escape_string($username);
$res = $conexion->query("SELECT COUNT(*) AS cantidad FROM resultados WHERE username = '$username'");
$row = $res->fetch_assoc();

echo json_encode(["repetido" => $row['cantidad'] > 0]);

$conexion->close();
?>