<?php

require_once "../includes/init.php";

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);

    echo json_encode([
        "success" => false,
        "message" => "Méthode non autorisée"
    ]);

    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

$puzzleId = isset($data["puzzle_id"]) ? (int) $data["puzzle_id"] : 0;
$difficulty = $data["difficulte"] ?? "";
$time = isset($data["temps"]) ? (int) $data["temps"] : 0;
$moves = isset($data["mouvements"]) ? (int) $data["mouvements"] : 0;
$score = isset($data["score"]) ? (int) $data["score"] : 0;


// Vérifications
if ($puzzleId <= 0) {
    http_response_code(400);

    echo json_encode([
        "success" => false,
        "message" => "Puzzle invalide"
    ]);

    exit();
}

if (!in_array($difficulty, ["facile", "moyen", "difficile"])) {
    http_response_code(400);

    echo json_encode([
        "success" => false,
        "message" => "Difficulté invalide"
    ]);

    exit();
}

if ($time < 0 || $moves < 0 || $score < 0) {
    http_response_code(400);

    echo json_encode([
        "success" => false,
        "message" => "Valeurs invalides"
    ]);

    exit();
}


try {

    // Vérifier que le puzzle existe
    $stmt = $pdo->prepare("
        SELECT id
        FROM puzzles
        WHERE id = ?
        AND actif = 1
    ");

    $stmt->execute([$puzzleId]);

    if (!$stmt->fetch()) {

        http_response_code(404);

        echo json_encode([
            "success" => false,
            "message" => "Puzzle introuvable"
        ]);

        exit();
    }


    // Récupérer l'utilisateur connecté
    if (!isset($_SESSION["user_id"])) {

        http_response_code(401);

        echo json_encode([
            "success" => false,
            "message" => "Utilisateur non connecté"
        ]);

        exit();
    }

    $userId = (int) $_SESSION["user_id"];


    // Enregistrer le score
    $stmt = $pdo->prepare("
        INSERT INTO puzzle_scores
        (
            utilisateur_id,
            puzzle_id,
            difficulte,
            temps,
            mouvements,
            score
        )
        VALUES (?, ?, ?, ?, ?, ?)
    ");

    $stmt->execute([
        $userId,
        $puzzleId,
        $difficulty,
        $time,
        $moves,
        $score
    ]);


    echo json_encode([
        "success" => true,
        "message" => "Score enregistré"
    ]);

} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode([
        "success" => false,
        "message" => "Erreur serveur"
    ]);
}