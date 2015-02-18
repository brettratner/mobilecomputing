// create database
var db = Ti.Database.open('myDatabase');

// create table
db.execute('CREATE TABLE IF NOT EXISTS cities (cityId INTEGER PRIMARY KEY AUTOINCREMENT, city TEXT, query TEXT)');	
	
// populate cities tableView
$.indexWindow.addEventListener('focus', getCities);

// when a row in the city tables is clicked
$.citiesTableView.addEventListener('click', function(e)
{
	// create the details window
	// pass the query attribute from the table to the window
	// assign a window table and define the back button text
	var detailsWindow = Alloy.createController('details', {query: e.row.query}).getView();
	detailsWindow.title = e.row.title;
	detailsWindow.backButtonTitle = 'Back';

	// open the details window
	$.navWindow.openWindow(detailsWindow);
	
});
	
// get cities
function getCities()
{
	// create an empty results array
	var results = [];
	
	// get records from the database table
	var resultSet = db.execute('SELECT cityId, city, query FROM cities ORDER BY city');
	
	// loop through the returned results
	while(resultSet.isValidRow())
	{
		// append data to the results array
		results.push({
			cityId: resultSet.fieldByName('cityId'),
			title: resultSet.fieldByName('city'),
			query: resultSet.fieldByName('query')
		});
		
		// get the next record
		resultSet.next();
	}
	
	// close the resultset
	resultSet.close();

	// populate the cities table with data
	$.citiesTableView.data = results;
}

// when the add button is pressed
$.addButton.addEventListener('click', function(e)
{
	// set add city window
	var addWindow = Alloy.createController('add').getView();
	addWindow.backButtonTitle = 'Back';

	// open the add city window
	$.navWindow.openWindow(addWindow);
});

// create edit and done buttons
var editButton = Ti.UI.createButton({
    systemButton: Ti.UI.iPhone.SystemButton.EDIT
});
var doneButton = Ti.UI.createButton({
    systemButton: Ti.UI.iPhone.SystemButton.DONE
});

// set right navigation button
$.indexWindow.leftNavButton = editButton;

// if edit button is clicked
editButton.addEventListener('click', function(e)
{
	$.citiesTableView.editing = true;
	$.indexWindow.leftNavButton = doneButton;
});

// if done button is clicked
doneButton.addEventListener('click', function(e)
{
	$.citiesTableView.editing = false;
	$.indexWindow.leftNavButton = editButton;
});

// if user is deleting a thing
$.citiesTableView.addEventListener('delete', function(e) 
{
	// delete record from the database
	db.execute('DELETE FROM cities WHERE cityId = ?', e.rowData.cityId);
});

// open window
$.navWindow.open();
