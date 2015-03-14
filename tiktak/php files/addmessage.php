<?php

	// database credentials
	$db_user = 'kerrinro_tiktak';
    $db_password = '********';
    $db_host = 'localhost';
    $db_name = 'kerrinro_tiktak';
	
	// connect to the database
	$db = mysqli_connect(
			$db_host,
			$db_user,
			$db_password,
			$db_name
		) OR die ('Can not connect ' . mysqli_connect_error());
	
	// clean message
	$message = mysqli_real_escape_string($db, $_POST['message']);
echo $message;
	
	// add a message
	$sql = "INSERT INTO messages (
				message_id, 
				message, 
				latitude, 
				longitude, 
				message_date
			) VALUES (
				null,
				'$message',
				'{$_GET['latitude']}',
				'{$_GET['longitude']}',
				NOW()
			)";
	$result = mysqli_query($db, $sql) or die('Query failed');
	
?>