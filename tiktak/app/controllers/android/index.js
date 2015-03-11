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

// pull-to-refresh isn't implemented in Android yet
// I found this link: https://gist.github.com/jpurcell/903895
// I might clean that up and add it here soon...

function itemClicked(e)
{
	var item = e.section.getItemAt(e.itemIndex);
	item.time.text = 'someone just discovered a hint for winning 20 dollars :)';
	e.section.updateItemAt(e.itemIndex, item);
}

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
				    time: {text: messages[i].time }
	 			});
			}

			// add messages to the listView
			$.messagesListView.sections[0].setItems(messagesData);			
		} 
	};
	
	xhr.onerror = function()
	{
		alert('Could not get messages');
	};

	xhr.open('GET', 'http://johnkuiphoff.com/tiktak/getmessages.php?latitude=' + latitude + '&longitude=' + longitude + '&miles=1');
	xhr.setRequestHeader('User-Agent','TikTak');
	xhr.send();		
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

	xhr.open('POST', 'http://johnkuiphoff.com/tiktak/addmessage.php?latitude=' + latitude + '&longitude=' + longitude);
	xhr.setRequestHeader('User-Agent','TikTak');
	xhr.send({
		'message' : message
	});
}


// open navigation window
$.indexWindow.open();