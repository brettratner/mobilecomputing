// include the global user object
var user = Alloy.Globals.User;

// require the facebook library
var fb = require('facebook');
fb.appid = 'YOURFACEBOOKID';
fb.permissions = ['publish_stream'];
fb.forceDialogAuth = true;

// when a login event occurs
fb.addEventListener('login', function(e) 
{
    if (e.success) 
    {
    		// get the user's information
        fb.requestWithGraphPath('me', {access_token: fb.accessToken}, 'GET', function(e) 
		{
			// uncomment the following line to see what Facebook returns
			//Ti.API.info(e);
		    if (e.success) 
		    {		    	 	
		    		// parse the data the contains information about the user
		    	 	var json = JSON.parse(e.result);

				// populate the global user properties with what comes back from Facebook
		        user.uid = json.id;
		        user.firstname = json.first_name;
		        user.lastname = json.last_name;  
		        user.image = "http://graph.facebook.com/"+json.id+"/picture?type=normal&width=200";
			
				// redirect the user to the welcome window
				var welcomeWindow = Alloy.createController('welcome').getView();
				$.indexWindow.openWindow(welcomeWindow);
			}	        
		});
    } 
    else if (e.error) 
    {
        alert(e.error);
    } 
    else if (e.cancelled) 
    {
        alert("Canceled");
    }
});

// when a user taps the login button
$.loginButton.addEventListener('click', function(e)
{
	fb.authorize();
});

$.indexWindow.open();
