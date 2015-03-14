// global latitude and longitude variables
var latitude;
var longitude;

// get the current position
reportPosition();

// when a message is submitted
$.messageTextField.addEventListener('return', function(e) 
{
	saveMessage($.messageTextField.value);
});


//when a upVote is clicked


// when the pull-to-refresh event is fired
function refreshMessages(e) {
    getMessages();
}

$.messagesListView.addEventListener('itemclick', function(e) 
{
	var item = e.section.getItemAt(e.itemIndex);
	var currentVote = item.votes.text;
	var messageID = item.message_id;


	

	 if( e.bindId === 'up') {
	 
	 	currentVote += 1;
	 
	
	 }	
	
	
else if( e.bindId === 'down') {
	 
	 	currentVote -= 1;
	 
	
	 }	
	saveVote(currentVote, messageID);
	
	

	
	
	e.section.updateItemAt(e.itemIndex, item);
});

// get current position
function reportPosition(e)
{
	Titanium.Geolocation.getCurrentPosition(function(e) 
	{ 
		if (e.error) 
		{ 
			alert('Sorry, but it seems geolocation is not available on your device.'); 
			return; 
		} 
		
		// populate global latitude / longitude variables
		latitude = e.coords.latitude;
		longitude = e.coords.longitude;

		// get messages
		getMessages();

	});
}

// get messages from a PHP script
function getMessages()
{
	
	var xhr = Ti.Network.createHTTPClient();
	
	if(latitude != null && longitude != null) {
			
	
	xhr.onload = function()
	{
		
		
			
		
		// parse JSON from the server
	 var messages = JSON.parse(this.responseText);
	 
	 
	

		// create an empty array
		var messagesData = [];

 		if(messages)
		{
			// loop through all messages
	 		for (var i = 0; i < messages.length; i++) 
	 		{
	 			// add message onto the array
	 			messagesData.push({
	 				message_id: messages[i].message_id,
				    message: {text : messages[i].message},
				    time: {text: messages[i].time },
				    votes: {text: messages[i].votes}
		
	 			});
			}
			
	

			// tell the pull-to-refresh thing to stop animating
			$.refresh.endRefreshing();
			
			// add messages to the listView
			$.messagesListView.sections[0].setItems(messagesData);
				
				// // Create a WebView
				// var aWebView = Ti.UI.createWebView({
					// url : 'http://developer.appcelerator.com'
				// });
				// aWebView.addEventListener('load', function(e) {
					// Ti.API.info('webview loaded: '+ e.url);
				// });
// 				
				// // Add to the parent view.
				// parentView.add(aWebView);
// 				
		} 
		
	};
	
	xhr.onerror = function()
	{
		alert('Could not get messages');
	};



	xhr.open('GET', 'http://kerrinrose.com/tiktak/getmessages.php?latitude=' + latitude + '&longitude=' + longitude + '&miles=1');
	xhr.setRequestHeader('User-Agent','TikTak');
	xhr.send();		
	
	}
	
	else {
		
		alert('Sorry but location isn\'t working, you can\'t tiktak');
	}
	
	
}

// sends the message to a PHP script to be saved
function saveMessage(message)
{
	var xhr = Ti.Network.createHTTPClient();
	xhr.onload = function()
	{
		// clear textField
		$.messageTextField.value = '';
		
		// refresh messages
		getMessages();	
	};
	
	xhr.onerror = function()
	{
		alert('Could not save message');
	};

if(latitude != null && longitude != null) {
	xhr.open('POST', 'http://kerrinrose.com/tiktak/addmessage.php?latitude=' + latitude + '&longitude=' + longitude);
	xhr.setRequestHeader('User-Agent','TikTak');
	xhr.send({
		'message' : message
	});


}

else {
	
		$.messageTextField.value = '';
		alert('Sorry but location isn\'t working, you can\'t tiktak');
}
}

function saveVote(voteCount, messageID) {
	

	var xhr = Ti.Network.createHTTPClient();
	xhr.onload = function()
	{
		Titanium.API.info(voteCount + " " + messageID);
		
		
	};
	
	xhr.onerror = function()
	{
		alert('Could not save vote');
	};


	xhr.open('POST', 'http://kerrinrose.com/tiktak/saveVote.php?voteCount=' + voteCount + '&messageID=' + messageID);
	xhr.setRequestHeader('User-Agent','TikTak');
	xhr.send();


	// refresh messages
		getMessages();	
}


// open navigation window
$.navWindow.open();