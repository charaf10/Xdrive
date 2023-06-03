<?php

include('../Connect.php');


$React_APP_Data = file_get_contents('php://input'); 
$Decode_React_APP_Data = json_decode($React_APP_Data , true);

header("Access-Control-Allow-Headers: Authorization, Content-Type");
header("Access-Control-Allow-Origin: *");
header('content-type: application/json; charset=utf-8');


// Récupération des données envoyées depuis la requête POST
$tableName = $Decode_React_APP_Data['tableName'];
$data = $Decode_React_APP_Data['data'];


if ($connect_db->connect_error) {
  die("La connexion à la base de données a échoué: " . $connect_db->connect_error);
}

// Construction de la requête d'insertion SQL avec des paramètres
$sql = "INSERT INTO $tableName (name, url) VALUES (?, ?)";
$stmt = $connect_db->prepare($sql);
$stmt->bind_param("ss" , $data['name'], $data['url']);

// Exécution de la requête d'insertion
if ($stmt->execute() === TRUE) {
  echo "Insertion réussie";
} else {
  echo "Erreur lors de l'insertion : " . $connect_db->error;
}

// Fermeture de la connexion à la base de données
$stmt->close();
$connect_db->close();
?>
