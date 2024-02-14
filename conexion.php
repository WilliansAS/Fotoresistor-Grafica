<?php
// Configuración de la conexión a la base de datos
$host = 'localhost';
$dbname = 'iot_examen';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);

    // Configura el PDO error mode a excepción
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Consulta SQL para obtener los últimos datos
    $sql = "SELECT valor, intensidad, fecha FROM fotoresistor ORDER BY id_puerto_serial DESC LIMIT 100";
    $stmt = $pdo->query($sql);

    $data = [];
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $data[] = $row;
    }

    // Enviar datos en formato JSON
    echo json_encode($data);
} catch (PDOException $e) {
    die("ERROR: Could not connect. " . $e->getMessage());
}
