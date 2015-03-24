// when the addButton is tapped
$.addButton.addEventListener('click', function(e) {
	$.dialog.show();
});

// when a dialog option is chosen
$.dialog.addEventListener('click', function(e) 
{
	// camera
	if (e.index == 0) {
		Titanium.Media.showCamera(
		{
			success : function(event) 
			{
				var image = event.media;
				
				// resize image (reduces upload time)
				var newWidth;
				var newHeight;
				if(image.width > image.height)
				{
					var ratio = image.height / image.width;
					newWidth = 1024;
					newHeight = 1024 * ratio;
				} else {
					var ratio = image.width / image.height;
					newHeight = 1024;
					newWidth = 1024 * ratio;
				}
				var resizedImage = image.imageAsResized(newWidth, newHeight);

				if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) 
				{
					uploadImage(resizedImage);
				}
			},
			cancel : function() {
				// getting image from camera was cancelled
			},
			error : function(error) {
				if (error.code == Titanium.Media.NO_CAMERA) {
					alert('Device does not have image recording capabilities');
				} else {
					alert('Unexpected error: ' + error.code);
				}
			},
			allowImageEditing : true,
			saveToPhotoGallery : false
		});
	}

	// photo gallery
	if (e.index == 1) {
		Titanium.Media.openPhotoGallery(
		{
			success : function(event) 
			{
				var image = event.media;
				
				// resize image
				var newWidth;
				var newHeight;
				if(image.width > image.height)
				{
					var ratio = image.height / image.width;
					newWidth = 1024;
					newHeight = 1024 * ratio;
				} else {
					var ratio = image.width / image.height;
					newHeight = 1024;
					newWidth = 1024 * ratio;
				}
				var resizedImage = image.imageAsResized(newWidth, newHeight);

				if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
					uploadImage(resizedImage);
				}
			},
			cancel : function() {
				//user cancelled the action from within the photo gallery
			}
		});

	} else {
		// cancel was tapped
	}
});

// upload image to the server
function uploadImage(selectedImage) 
{
	$.progressBar.show();
	
	var xhr = Titanium.Network.createHTTPClient();
	xhr.open('POST', 'http://johnkuiphoff.com/saycheese/index.php');
	xhr.onload = function() 
	{
		$.progressBar.show();
		
		// update status message
		$.statusLabel.text = 'Upload complete';
		
	};

	xhr.onsendstream = function(e) 
	{
		$.progressBar.value = e.progress;
		$.statusLabel.text = Math.round(e.progress * 100) + '%';
		
	};

	xhr.onerror = function() 
	{
		alert(this.error + ': ' + this.statusText);
		return false;
	};

	xhr.setRequestHeader('User-Agent', 'SayCheese');
	xhr.send({
		'media' : selectedImage
	});

}

$.navWindow.open();
