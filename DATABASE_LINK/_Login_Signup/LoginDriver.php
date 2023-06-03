<?php
//script pour login //
include('../Connect.php');


$React_APP_Data = file_get_contents('php://input'); 
$Decode_React_APP_Data = json_decode($React_APP_Data , true);

header("Access-Control-Allow-Headers: Authorization, Content-Type");
header("Access-Control-Allow-Origin: *");
header('content-type: application/json; charset=utf-8');

$Username = $Decode_React_APP_Data['Username'];
$Password = $Decode_React_APP_Data['Password']; 

//REQUETE SELECTION DU USERNAME\\
$query = "SELECT * FROM drivers WHERE username = '$Username'";
$query_result = mysqli_query($connect_db, $query);

if (mysqli_num_rows($query_result)) 
{
    $DB_Elements= mysqli_fetch_array($query_result);

    //VERIFICATION DU PASSWORD\\
        if ($DB_Elements['password'] == $Password) 
        {        
            $MessageId = $DB_Elements['id'];
            $Message = "correct";
        } else 
        { 
            $Message = "incorrect";
        }
        } 
else 
        {
            $Message = "User does not exist";
        }

$response[0] = array("Message" => $Message);
$response[1] = array("MessageId" => $MessageId);

echo json_encode($response);

?>