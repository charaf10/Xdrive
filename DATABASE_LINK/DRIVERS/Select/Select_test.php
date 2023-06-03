<?php
include('../Connect.php');


header("Access-Control-Allow-Headers: Authorization, Content-Type");
header("Access-Control-Allow-Origin: *");
header('content-type: application/json; charset=utf-8');



//$user_id = $_SESSION['user_id'];


$query = "SELECT * FROM apply_1";
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