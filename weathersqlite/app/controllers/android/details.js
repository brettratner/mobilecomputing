var args = arguments[0] || {};

// call the getWeather function and pass it the window's query argument
getWeather(args.query);

// get weather
function getWeather(query) 
{	
	// make a server request to openweather map
	var xhr = Titanium.Network.createHTTPClient();
	xhr.open('POST', 'http://api.openweathermap.org/data/2.5/find?q=' + query + '&type=like&mode=json&units=imperial');
	xhr.onload = function() 
	{		
		// hide the activity indicator	
		$.activityIndicator.hide();
		
		// parse json response
		var json = JSON.parse(this.responseText);
		
		// print json contents to the console
		Ti.API.info(this.responseText);
		
		// populate labels and ImageView
		$.tempLabel.text = json.list[0].main.temp + "\u00B0";
		$.descriptionLabel.text = json.list[0].weather[0].description;
		$.weatherIcon.image = 'http://openweathermap.org/img/w/' + json.list[0].weather[0].icon + '.png';
		
	};
	xhr.onerror = function() 
	{
		alert(this.error + ': ' + this.statusText);
		return false;
	};
	xhr.setRequestHeader('User-Agent', 'weatherApp');
	xhr.send();
}