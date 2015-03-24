<?php

// include SimpleImage class
include('SimpleImage.php');

// define upload path
$uploadpath = getcwd() . '/images/'; 
		
// create a unique filename
$filename = uniqid() . '.jpg';

// if a file is being uploaded
if($_FILES['media']['tmp_name'])
{
	// resize and upload image (https://github.com/claviska/SimpleImage)
	// the SimpleImage library can do a lot of different transformations
	$img = new abeautifulsite\SimpleImage($_FILES['media']['tmp_name']);
	$img->fit_to_width(640)->save($uploadpath . $filename);
	
	$json = array(
		'status' => 'success',
		'filename' => $filename
	);
	
	$output = json_encode($json);
	echo $output;
}	

// The code below will also upload your image to Amazon Web Services 
// if you have this set up. I commented out the code because this example 
// does not use it - this is just for reference
/*

// include libraries
include('aws-autoloader.php');
use Aws\S3\S3Client;

// instantiate an S3 client
$s3 = S3Client::factory(array(
    'key'    => 'YOURAWSKEY',
    'secret' => 'YOURAWSSECRET',
));

// upload file
try {
    $s3->putObject(array(
        'Bucket' => 'yourbucketname',
        'Key'    => $filename,
        'Body'   => fopen($uploadpath . $filename, 'r'),
        'ACL'    => 'public-read',
    ));
    
	$json = array(
		'filename' => 'https://s3.amazonaws.com/yourbucketname/' . $filename
	);

} catch (S3Exception $e) {
    $json = array(
		'error' => 'There was an error uploading the photo'
	);
}
*/

?>