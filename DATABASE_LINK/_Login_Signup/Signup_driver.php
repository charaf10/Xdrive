<?php
// Connexion à la base de données
include('../Connect.php');


$React_APP_Data = file_get_contents('php://input'); 
$Decode_React_APP_Data = json_decode($React_APP_Data , true);

header("Access-Control-Allow-Headers: Authorization, Content-Type");
header("Access-Control-Allow-Origin: *");
header('content-type: application/json; charset=utf-8');

$firstname = $Decode_React_APP_Data['Firstname'];
$lastname = $Decode_React_APP_Data['Lastname'];
$username = $Decode_React_APP_Data['Username'];
$password = $Decode_React_APP_Data['Password'];
$birth = $Decode_React_APP_Data['Birth'];
$address = $Decode_React_APP_Data['Address'];
$city = $Decode_React_APP_Data['City'];
$country = $Decode_React_APP_Data['Country'];
$licence = $Decode_React_APP_Data['Licence'];
$email = $Decode_React_APP_Data['Email'];
$phone = $Decode_React_APP_Data['Phone'];
$sign = $Decode_React_APP_Data['Sign'];


/*
$query = "SELECT * FROM forms WHERE EMAIL = '$EMAIL'";
$query_result = mysqli_query($connect_db, $query);
*/
    $Reg_Query = "INSERT INTO drivers (`firstname`, `lastname`, `username`, `password`, `birth`, `address`, `city`, `country` , `licence` , `email`, `phone` , `sign`) VALUES ('$firstname', '$lastname','$username','$password','$birth','$address','$city','$country','$licence','$email','$phone','$sign')";
    $Reg_Query_Result = mysqli_query($connect_db, $Reg_Query);
    
    if ($Reg_Query_Result) 
	{
        $Message = "Registered successfully!";

    } else 
	{
        $Message = "Error - Try again";
    }

$response[] = array("Message" => $Message);

echo json_encode($response);

?>