// include the global user object
var user = Alloy.Globals.User;

// require the facebook library
var fb = require('facebook');

// ugly hack to remove the iOS back button
var view = Ti.UI.createView({});
$.welcomeWindow.leftNavButton = view;

// populate the label and image using the User object properties
$.fullnameLabel.text = user.firstname + ' ' + user.lastname;
$.profileImage.image = user.image;

// when the user taps the logout button
$.logoutButton.addEventListener('click', function(e)
{
	// log out of Facebook
	fb.logout();
	
	// close the welcome window
	$.welcomeWindow.close();
});
