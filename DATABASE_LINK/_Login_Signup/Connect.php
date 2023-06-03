<?php
 session_start();


 $host='localhost';
 $username='root';
 $password=''; 
 $db_name='db_link'; 
	
 $connect_db = mysqli_connect($host, $username, $password, $db_name);



if(!$connect_db)
{
	echo json_encode("Connection to DB Failed");
	
}



?>