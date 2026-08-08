<?php

require_once "../includes/init.php";

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

function attribuerBadge(PDO $pdo, int $utilisateurId, int $badgeId): void
{
    // Vérifie si le badge est déjà obtenu
    $stmt = $pdo->prepare("
        SELECT 1
        FROM utilisateur_badge
        WHERE utilisateur_id = ? AND badge_id = ?
    ");

    $stmt->execute([$utilisateurId, $badgeId]);

    if ($stmt->fetch()) {
        return;
    }

    // Attribution du badge
    $stmt = $pdo->prepare("
        INSERT INTO utilisateur_badge (utilisateur_id, badge_id)
        VALUES (?, ?)
    ");

    $stmt->execute([$utilisateurId, $badgeId]);
}


// Traiter la requête préflight EN PREMIER, avant toute logique d'auth/session
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Vérifier que l'utilisateur est connecté
if (!isset($_SESSION['user_id'])) {

    http_response_code(401);

    echo json_encode([
        "success" => false,
        "message" => "Utilisateur non connecté"
    ]);

    exit();

}


// Récupérer les données envoyées par React
$data = json_decode(file_get_contents("php://input"), true);

if (
    !isset($data['score']) ||
    !isset($data['total']) ||
    !isset($data['game_id'])
) {

    http_response_code(400);

    echo json_encode([
        "success" => false,
        "message" => "Données manquantes"
    ]);

    exit();

}


$user_id = $_SESSION['user_id'];
$score = (int)$data['score'];
$total = (int)$data['total'];
$game_id = (int)$data['game_id'];


// Calcul du pourcentage
$percent = ($total > 0) 
    ? ($score / $total) * 100 
    : 0;


// Enregistrement
$sql = "
    INSERT INTO scores
    (
        utilisateur_id,
        jeu_id,
        score,
        total,
        score_pourcentage,
        date_score
    )
    VALUES (?, ?, ?, ?, ?, NOW())
";


$stmt = $pdo->prepare($sql);

$stmt->execute([
    $user_id,
    $game_id,
    $score,
    $total,
    $percent
]);

// ================================
// Attribution des badges
// ================================

// Badge 1 : Premier pas
attribuerBadge($pdo, $user_id, 1);

// Badge 2 : Apprenti Otaku (50 %)
if ($percent >= 50) {
    attribuerBadge($pdo, $user_id, 2);
}

// Badge 5 : Expert Anime (80 %)
if ($percent >= 80) {
    attribuerBadge($pdo, $user_id, 5);
}

// Badge 6 : Sans faute (100 %)
if ($percent == 100) {
    attribuerBadge($pdo, $user_id, 6);
}

// Nombre total de parties
$stmt = $pdo->prepare("
    SELECT COUNT(*)
    FROM scores
    WHERE utilisateur_id = ?
");

$stmt->execute([$user_id]);

$nbParties = (int) $stmt->fetchColumn();

// Badge 3 : Persévérant (10 parties)
if ($nbParties >= 10) {
    attribuerBadge($pdo, $user_id, 3);
}

// Badge 4 : Fan d'anime (25 parties)
if ($nbParties >= 25) {
    attribuerBadge($pdo, $user_id, 4);
}

// Badge 8 : Vétéran (100 parties)
if ($nbParties >= 100) {
    attribuerBadge($pdo, $user_id, 8);
}

echo json_encode([
    "success" => true
]);