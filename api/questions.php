<?php

require_once "../includes/init.php";

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$gameId = isset($_GET["game_id"]) ? (int)$_GET["game_id"] : 1;
$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 10;

// Sécurité
if ($limit < 1) {
    $limit = 10;
}

if ($limit > 100) {
    $limit = 100;
}

try {

    // Récupération des questions dans un ordre aléatoire
    $stmt = $pdo->prepare("
        SELECT id, question
        FROM questions
        WHERE jeu_id = ? AND actif = 1
        ORDER BY RAND()
        LIMIT ?
    ");
    $stmt->bindValue(1, $gameId, PDO::PARAM_INT);
    $stmt->bindValue(2, $limit, PDO::PARAM_INT);
    $stmt->execute();

    $questions = [];

    while ($question = $stmt->fetch(PDO::FETCH_ASSOC)) {

        // Récupération des réponses dans un ordre aléatoire
        $stmtRep = $pdo->prepare("
            SELECT reponse, est_correcte
            FROM reponses
            WHERE question_id = ?
            ORDER BY RAND()
        ");

        $stmtRep->bindValue(1, $question["id"], PDO::PARAM_INT);
        $stmtRep->execute();

        $choices = [];
        $answer = 0;

        foreach ($stmtRep->fetchAll(PDO::FETCH_ASSOC) as $index => $rep) {

            $choices[] = $rep["reponse"];

            if ($rep["est_correcte"]) {
                $answer = $index;
            }
        }

        $questions[] = [
            "question" => $question["question"],
            "choices" => $choices,
            "answer" => $answer
        ];
    }

    echo json_encode($questions);
} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}
