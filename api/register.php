<?php
require_once "../includes/init.php";

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

$pseudo = trim($data["pseudo"] ?? "");
$email = trim($data["email"] ?? "");
$password = $data["password"] ?? "";
$confirmPassword = $data["confirmPassword"] ?? "";
$phone = trim($data["phone"] ?? "");
$terms = !empty($data["terms"]) ? 1 : 0;

$errors = [];

// Vérification des champs obligatoires
if (empty($pseudo) || empty($email) || empty($password) || empty($confirmPassword)) {
    $errors[] = "Tous les champs sont obligatoires.";
}

// Vérification de l'adresse e-mail
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = "Adresse e-mail invalide.";
}

// Vérification des mots de passe
if ($password !== $confirmPassword) {
    $errors[] = "Les mots de passe ne correspondent pas.";
}

// Longueur du mot de passe
if (strlen($password) < 6) {
    $errors[] = "Le mot de passe doit contenir au moins 6 caractères.";
}

// Conditions d'utilisation
if (!$terms) {
    $errors[] = "Vous devez accepter les conditions d'utilisation.";
}

// Vérification de l'unicité du pseudo / email
if (empty($errors)) {

    $stmt = $pdo->prepare(
        "SELECT id FROM utilisateurs WHERE email = ? OR pseudo = ?"
    );

    $stmt->execute([$email, $pseudo]);

    if ($stmt->fetch()) {
        $errors[] = "Ce pseudo ou cet e-mail est déjà utilisé.";
    }
}

// Insertion en base
if (empty($errors)) {

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $stmt = $pdo->prepare(
        "INSERT INTO utilisateurs
        (pseudo, email, mot_de_passe, date_inscription, numerotel, condUtilisation)
        VALUES (?, ?, ?, NOW(), ?, ?)"
    );

    $stmt->execute([
        $pseudo,
        $email,
        $hashedPassword,
        $phone,
        $terms
    ]);

    echo json_encode([
        "success" => true
    ]);

    exit();
}

// S'il y a des erreurs
echo json_encode([
    "success" => false,
    "errors" => $errors
]);
?>