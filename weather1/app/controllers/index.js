// when a row in the city tables is clicked
$.citiesTableView.addEventListener('click', function(e)
{
	// create the details window
	// pass the query attribute from the table to the window
	// assign a window table and define the back button text
	var detailsWindow = Alloy.createController('details', {query: e.row.query}).getView();
	detailsWindow.title = e.row.title;
	detailsWindow.backButtonTitle = 'Back';

	// if iphone, ipad, ipod
	if (OS_IOS) 
	{
		// open the details window
		$.indexWindow.openWindow(detailsWindow);
	}
	
	// if android
	if (OS_ANDROID) 
	{
		// open the details window
		detailsWindow.open();
	}
	
});

$.indexWindow.open();
