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
	
	// get voteCount
	$voteCount = $_GET['voteCount'];
	$messageID = $_GET['messageID'];
if($voteCount >= -3) {
	// update database entry with new votecount
	$sql = "UPDATE messages SET votes=".$voteCount. " WHERE message_id=".$messageID."";
}

else if ($vouteCount < -3) {
    
 $sql = "DELETE from messages WHERE message_id=".$messageID;   
}

if (mysqli_query($db, $sql)) {
    echo "Record updated successfully";
} else {
    echo "Error updating record: " . mysqli_error($db);
}


mysqli_close($db);
//	
//$result = mysqli_query($db, $sql) or die('Query failed');
//while($row = mysqli_fetch_assoc($result))
//{
//	
//	
//	// add to messages array
//	$messages[] = array(
//		'message_id' => $row['message_id'],
//		'message' => $row['message'],
//		'latitude' => $row['latitude'],
//		'longitude' => $row['longitude'],
//		'time' => $timeago,
//        'votes' => 3
//	);
//}
//
//// send messages to the app
//$output = json_encode($messages);
//echo $output;





?> 

