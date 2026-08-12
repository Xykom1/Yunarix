<?php

require_once "../includes/init.php";

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Content-Type: application/json");


if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}


try {

    // Récupérer un puzzle aléatoire du jeu Puzzle Image
    $stmt = $pdo->prepare("
        SELECT id, nom, anime, image
        FROM puzzles
        WHERE jeu_id = 2
        AND actif = 1
        ORDER BY RAND()
        LIMIT 1
    ");

    $stmt->execute();

    $puzzle = $stmt->fetch(PDO::FETCH_ASSOC);


    if (!$puzzle) {

        http_response_code(404);

        echo json_encode([
            "success" => false,
            "message" => "Aucun puzzle disponible"
        ]);

        exit();

    }


    echo json_encode([
        "success" => true,
        "puzzle" => $puzzle
    ]);


} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode([
        "success" => false,
        "message" => "Erreur serveur"
    ]);

}