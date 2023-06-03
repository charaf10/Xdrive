<?php
include('../Connect.php');

$React_APP_Data = file_get_contents('php://input'); 
$Decode_React_APP_Data = json_decode($React_APP_Data , true);


header("Access-Control-Allow-Headers: Authorization, Content-Type");
header("Access-Control-Allow-Origin: *");
header('content-type: application/json; charset=utf-8');


$id = $Decode_React_APP_Data['id'];

//$user_id = $_SESSION['user_id'];


$query = "SELECT * FROM profil_driver where idDriver = '$id'";
$query_result = mysqli_query($connect_db, $query);

$list = array();

if (mysqli_num_rows($query_result) > 0) {
  while($row = mysqli_fetch_assoc($query_result)) {
    $list[] = $row;
  }
  
}

// Envoi des données au client
echo json_encode($list);
?>