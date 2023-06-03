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
$TypeVehicule = $Decode_React_APP_Data['TypeVehicule'];
$TypeShift = $Decode_React_APP_Data['TypeShift'];
$Location = $Decode_React_APP_Data['Location'];
$Status = $Decode_React_APP_Data['Status'];

$Message = "";

// Requête préparée avec des paramètres liés
$Reg_Query = "INSERT INTO offer (`title`, `desc`, `datestart`, `dateend`, `schedule`, `nbdriver`, `identreprise`, `typeVehicule`, `typeShift`, `location`, `status`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
$stmt = $connect_db->prepare($Reg_Query);
$stmt->bind_param("sssssssssss", $Title, $Desc, $Datestart, $Dateend, $Schedule, $Nbdriver, $Identreprise, $TypeVehicule, $TypeShift, $Location, $Status);

if ($stmt->execute()) {
    $Message = "Registered successfully!";
} else {
    $Message = "Error - Try again";
}

$response = array("Message" => $Message);

echo json_encode($response);
?>
