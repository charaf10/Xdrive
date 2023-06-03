<?php
include('../Connect.php');

$React_APP_Data = file_get_contents('php://input'); 
$Decode_React_APP_Data = json_decode($React_APP_Data , true);


header("Access-Control-Allow-Headers: Authorization, Content-Type");
header("Access-Control-Allow-Origin: *");
header('content-type: application/json; charset=utf-8');


$idOffer = $Decode_React_APP_Data['idOffer'];

//$user_id = $_SESSION['user_id'];


$query = "SELECT COUNT(*) AS total_rows FROM apply_1 WHERE idOffer = '$idOffer'";
$query_result = mysqli_query($connect_db, $query);

$row = mysqli_fetch_assoc($query_result);
$total_rows = $row['total_rows'];

$response = $total_rows;

// Envoi des données au client
echo json_encode($response);
?>