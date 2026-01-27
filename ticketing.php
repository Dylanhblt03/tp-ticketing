<?php

header('Content-Type: text/html; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
http_response_code(200);
exit();
}

$token = $_SERVER['HTTP_AUTHORIZATION'];

if (!$token) {
    header('HTTP/1.1 401 Unauthorized');
    echo json_encode(['error' => 'Token manquant']);
    exit();
}

if ($token !== "VBnAzKpOLlf5DZSNpNuXJmvg5") {
    header('HTTP/1.1 403 Forbidden');
    echo json_encode(['error' => 'Token invalide']);
    exit();
}

$database = new mysqli("192.168.56.56", "homestead", "secret", "TP_ticketing");
mysqli_set_charset($database, "utf8mb4");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $sujet = $_POST['sujet'];
    $nom = $_POST['nom'];
    $email = $_POST['email'];
    $commune = $_POST['commune'];
    $departement = $_POST['departement'];
    $region = $_POST['region'];
    $message = $_POST['message'];

    $sql = "INSERT INTO demande (sujet, nom, email, commune, departement, region, message) VALUES (?, ?, ?, ?, ?, ?, ?)";
    
    try {
        $stmt = $database->prepare($sql);
        $stmt->bind_param("sssssss", $sujet, $nom, $email, $commune, $departement, $region, $message);
        $success = $stmt->execute();
        if ($success) {
            $expediteur = "no-reply@ticketing.fr";
            $destinataire = $email; 
            $headers = "From: $expediteur" . "\r\n" .
                       "Reply-To: $expediteur" . "\r\n" .
                       "Content-Type: text/plain; charset=utf-8";
            $contenu = "Bonjour $nom,\n\n";
            $contenu .= "Nous avons bien reçu votre demande concernant :\n";
            $contenu .= "Sujet : $sujet\n\n";
            $contenu .= "Détails de votre message :\n$message\n\n";
            $contenu .= "Lieu concerné : $commune ($departement, $region)\n";
            mail($destinataire, "Confirmation de votre Ticket : " . $sujet, $contenu, $headers);
        }

        echo json_encode(["success" => $success]);

    } catch (Exception $e) {
        echo json_encode(["success" => false, "error" => $e->getMessage()]);
    }

} else if($_SERVER['REQUEST_METHOD'] === 'GET') {
    $demande = $database->execute_query("SELECT * FROM demande ORDER BY id DESC")->fetch_all(MYSQLI_ASSOC);
    echo json_encode($demande);
}
