<?php

	// database credentials
	$db_user = 'yourusername';
	$db_password = 'yourpassword';
	$db_host = 'localhost';
	$db_name = 'yourdatabasename';
	
	// connect to the database
	$db = mysqli_connect(
			$db_host,
			$db_user,
			$db_password,
			$db_name
		) OR die ('Can not connect ' . mysqli_connect_error());
	
	// clean message
	$message = mysqli_real_escape_string($db, $_POST['message']);
	
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