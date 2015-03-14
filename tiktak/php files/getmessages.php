<?php

// database credentials
$db_user = 'kerrinro_tiktak';
$db_password = '*********';
$db_host = 'localhost';
$db_name = 'kerrinro_tiktak';

// connect to the database
$db = mysqli_connect(
		$db_host,
		$db_user,
		$db_password,
		$db_name
	) OR die ('Can not connect ' . mysqli_connect_error());

// get all messages
$messages = null;

// shortcut vars - unneccessary, - but it makes the
// sql below look cleaner
$latitude = $_GET['latitude'];
$longitude = $_GET['longitude'];

// get all messages within one mile of user
$sql = "SELECT (
		(ACOS(SIN($latitude * PI() / 180) * SIN(latitude * PI() / 180) + COS($latitude * PI() / 180) * COS(latitude * PI() / 180) * COS(($longitude - longitude) * PI() / 180)) * 180 / PI()) * 60 * 1.1515)
		AS distance, message_id, message, latitude, longitude, message_date, votes
		FROM messages
		HAVING distance <= 1 
		ORDER BY message_date DESC";

$result = mysqli_query($db, $sql) or die('Query failed');
while($row = mysqli_fetch_assoc($result))
{
	// determine time ago
	$messageDate = new DateTime($row['message_date']);
	$currentDate = new DateTime();
	$interval = $currentDate->diff($messageDate);	
	if($interval->d > 0)
	{
		$timeago = $interval->d . ' days ago';
	} elseif ($interval->h > 0) {
		$timeago = $interval->h . ' hours ago';
	} elseif ($interval->i > 0) {
		$timeago = $interval->i . ' minutes ago';
	} else {
		$timeago = 'just now';
	}
    
    $voteInt = intval($row['votes']);
	
	// add to messages array
	$messages[] = array(
		'message_id' => $row['message_id'],
		'message' => $row['message'],
		'latitude' => $row['latitude'],
		'longitude' => $row['longitude'],
		'time' => $timeago,
        'votes' => $voteInt
	);
}

// send messages to the app
$output = json_encode($messages);
echo $output;



?>