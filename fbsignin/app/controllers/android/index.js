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
		        
		        // Terrible Android hack to get the real Facebook photo 
		        // The one that Facebook provides is actually a redirect
		        var xhr = Ti.Network.createHTTPClient();
				xhr.onload = function()
				{
					//Ti.API.info(this.responseText);
					var rawPhoto = JSON.parse(this.responseText);
					user.image = rawPhoto.data.url;
					
					// redirect the user to the welcome window
					var welcomeWindow = Alloy.createController('welcome').getView();
					welcomeWindow.open();
				};
				xhr.open('GET', "http://graph.facebook.com/"+json.id+"/picture?type=normal&width=200&redirect=false");
				xhr.setRequestHeader('User-Agent','fblogin');
				xhr.send();
	
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
	// there is a small bug that makes things undefined 
	// when logging in once when I reinstall the app.
	// anychance someone has time to fix it?
	if(fb.loggedIn === false)
	{
		fb.authorize();
	} else {
		var welcomeWindow = Alloy.createController('welcome').getView();
		welcomeWindow.open();
	}
});

$.indexWindow.open();
