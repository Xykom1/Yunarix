<?php

require_once "../includes/init.php";

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");


try {

    // Récupération des jeux actifs
    $jeuxStmt = $pdo->query("
        SELECT id, nom 
        FROM jeux 
        WHERE actif = 1
    ");

    $jeux = $jeuxStmt->fetchAll(PDO::FETCH_ASSOC);


    // Filtre jeu
    $game_id = isset($_GET['game_id']) 
        ? (int)$_GET['game_id'] 
        : 0;


    if ($game_id > 0) {

        $stmt = $pdo->prepare("
            SELECT 
                u.pseudo,
                MAX(s.score) AS best_score,
                MAX(s.total) AS total
            FROM scores s
            JOIN utilisateurs u 
                ON u.id = s.utilisateur_id
            WHERE s.jeu_id = ?
            GROUP BY u.id
            ORDER BY best_score DESC
            LIMIT 10
        ");

        $stmt->execute([$game_id]);

    } else {

        $stmt = $pdo->query("
            SELECT 
                u.pseudo,
                MAX(s.score) AS best_score,
                MAX(s.total) AS total
            FROM scores s
            JOIN utilisateurs u 
                ON u.id = s.utilisateur_id
            GROUP BY u.id
            ORDER BY best_score DESC
            LIMIT 10
        ");

    }


    $classement = $stmt->fetchAll(PDO::FETCH_ASSOC);


    echo json_encode([
        "success" => true,
        "jeux" => $jeux,
        "classement" => $classement
    ]);


} catch(PDOException $e) {

    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);

}