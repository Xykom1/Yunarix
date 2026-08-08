<?php
require_once "../includes/init.php";

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

$pseudo = $data['pseudo'] ?? '';
$password = $data['password'] ?? '';

if (empty($pseudo) || empty($password)) {

    echo json_encode([
        "success" => false,
        "message" => "Champs manquants."
    ]);

    exit();
}


try {

    $stmt = $pdo->prepare(
        "SELECT id, pseudo, mot_de_passe 
         FROM utilisateurs 
         WHERE pseudo = ?"
    );

    $stmt->execute([$pseudo]);


    if ($stmt->rowCount() > 0) {

        $user = $stmt->fetch(PDO::FETCH_ASSOC);


        if (password_verify($password, $user['mot_de_passe'])) {

            $_SESSION['user_id'] = $user['id'];


            echo json_encode([
                "success" => true,
                "message" => "Connexion réussie."
            ]);

        } else {

            echo json_encode([
                "success" => false,
                "message" => "Mot de passe incorrect."
            ]);

        }


    } else {

        echo json_encode([
            "success" => false,
            "message" => "Identifiant incorrect."
        ]);

    }


} catch (PDOException $e) {

    echo json_encode([
        "success" => false,
        "message" => "Erreur serveur."
    ]);

}
?>