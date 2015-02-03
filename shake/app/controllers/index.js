// create an array of restaurants
var websites = [
    "http://www.palermostomatopie.com/",
    "http://m.mainstreethub.com/eastsushinj",
    "http://www.villarosanj.com/",
    "http://www.ewingdiner.com/",
    "http://www.metrogrills.net/",
    "http://fiveguys.com",
    "https://www.primohoagies.com/",
    "http://mexicanmariachigrill.com/"
];

// create a player
var notification = Ti.Media.createSound({url:"/media/notification.wav"});

// listen for shake gesture
Ti.Gesture.addEventListener('shake',function(e)
{
    //alert(e.source+" "+e.timestamp+" "+e.type);
    
    // pick a random number
    var rand = Math.floor((Math.random() * websites.length)); 
   
	// populate the webview with a random website
	$.webView.url = websites[rand];
	
	// play notification sound
	notification.play();
	 
	// hide instructions label / show webview  
    $.instructionsLabel.hide();
    $.webView.show();
    
});

// open window
$.indexWindow.open();
