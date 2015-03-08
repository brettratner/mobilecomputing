var map = require('ti.map');

// random city annotations
var annotations = [
	{title: "Birmingham, AL", latitude: "33.57", longitude: "-86.75"},
	{title: "Phoenix, AZ", latitude: "33.43", longitude: "-112.02"},
	{title: "Los Angeles, CA", latitude: "33.93", longitude: "-118.40"},
	{title: "Palo Alto, CA", latitude: "37.47", longitude: "-122.12"},
	{title: "Denver, CO", latitude: "39.75", longitude: "-104.87"},
	{title: "Dover, DE", latitude: "39.13", longitude: "-75.47"},
	{title: "Jacksonville, FL", latitude: "30.33", longitude: "-81.52"},
	{title: "Chicago, IL", latitude: "41.90", longitude: "-87.65"},
	{title: "New Orleans, LA", latitude: "29.98", longitude: "-90.25"},
	{title: "Baltimore, MD", latitude: "39.33", longitude: "-76.42"},
	{title: "Boston, MA", latitude: "42.37", longitude: "-71.03"},
	{title: "Trenton, NJ", latitude: "40.28", longitude: "-74.82"},
	{title: "NewYork, NY", latitude: "40.77", longitude: "-73.98"},
	{title: "Philadelphia, PA", latitude: "39.88", longitude: "-75.25"},
	{title: "Austin, TX", latitude: "30.30", longitude: "-97.70"},
	{title: "Seattle, WA", latitude: "47.60", longitude: "-122.33"}
];

// get current position
Titanium.Geolocation.getCurrentPosition(function(e) 
{ 
	if (e.error) 
	{ 
		alert('Sorry, but it seems geolocation is not available on your device.'); 
		return; 
	} 

	// center map on current location
	$.myMap.region = {
		latitude: e.coords.latitude, 
		longitude: e.coords.longitude, 
		latitudeDelta:0.05, 
		longitudeDelta:0.05
	};
	
	// place annotations on map
	for (var i = 0; i < annotations.length; i++) 
	{
		var pin = map.createAnnotation({
	        latitude : annotations[i].latitude,
	        longitude : annotations[i].longitude,
	    	title: annotations[i].title,
	        animate : true,
	        pincolor : map.ANNOTATION_GREEN
	    });
	    $.myMap.addAnnotation(pin);
	}
});

$.indexWindow.open();
