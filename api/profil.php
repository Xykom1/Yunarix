<?php

require_once "../includes/init.php";

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if (!isset($_SESSION['user_id'])) {

    echo json_encode([
        "success" => false,
        "message" => "Utilisateur non connecté"
    ]);

    exit();
}

$user_id = $_SESSION['user_id'];

try {

    // Informations utilisateur
    $stmt = $pdo->prepare("
        SELECT id, pseudo, email, avatar, date_inscription
        FROM utilisateurs
        WHERE id = ?
    ");

    $stmt->execute([$user_id]);

    $user = $stmt->fetch(PDO::FETCH_ASSOC);


    // Statistiques
    $stmt = $pdo->prepare("
        SELECT 
            COUNT(*) as nb_parties,
            MAX(score) as best_score,
            AVG(score) as avg_score
        FROM scores
        WHERE utilisateur_id = ?
    ");

    $stmt->execute([$user_id]);

    $stats = $stmt->fetch(PDO::FETCH_ASSOC);


    // Badges
    $stmt = $pdo->prepare("
        SELECT 
            b.id,
            b.nom,
            b.description,
            b.rarete,
            ub.date_obtenu
        FROM utilisateur_badge ub
        JOIN badges b ON b.id = ub.badge_id
        WHERE ub.utilisateur_id = ?
        ORDER BY ub.date_obtenu DESC
    ");

    $stmt->execute([$user_id]);

    $badges = $stmt->fetchAll(PDO::FETCH_ASSOC);


    echo json_encode([
        "success" => true,
        "user" => $user,
        "stats" => $stats,
        "badges" => $badges
    ]);
} catch (PDOException $e) {

    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}
