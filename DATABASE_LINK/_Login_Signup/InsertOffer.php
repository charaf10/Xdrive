<?php
// Connexion à la base de données
include('../Connect.php');

// title desc datestart dateend schedule nbdriver identreprise status

$React_APP_Data = file_get_contents('php://input'); 
$Decode_React_APP_Data = json_decode($React_APP_Data , true);

header("Access-Control-Allow-Headers: Authorization, Content-Type");
header("Access-Control-Allow-Origin: *");
header('content-type: application/json; charset=utf-8');

$Title = $Decode_React_APP_Data['Title'];
$Desc = $Decode_React_APP_Data['Desc'];
$Datestart = $Decode_React_APP_Data['Datestart'];
$Dateend = $Decode_React_APP_Data['Dateend'];
$Schedule = $Decode_React_APP_Data['Schedule'];
$Nbdriver = $Decode_React_APP_Data['Nbdriver'];
$Identreprise = $Decode_React_APP_Data['Identreprise'];
$Status = $Decode_React_APP_Data['Status'];


/*
$query = "SELECT * FROM forms WHERE EMAIL = '$EMAIL'";
$query_result = mysqli_query($connect_db, $query);
*/
    $Reg_Query = "INSERT INTO offer (`title`, `desc`, `datestart`, `dateend`, `schedule`, `nbdriver`, `identreprise`, `status`) VALUES ('$Title', '$Desc','$Datestart','$Dateend','$Schedule','$Nbdriver','$Identreprise','$Status')";
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