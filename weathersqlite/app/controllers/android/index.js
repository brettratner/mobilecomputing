// create database
var db = Ti.Database.open('myDatabase');

// create table
db.execute('CREATE TABLE IF NOT EXISTS cities (cityId INTEGER PRIMARY KEY AUTOINCREMENT, city TEXT, query TEXT)');	
	
// populate cities tableView
$.indexWindow.addEventListener('focus', getCities);

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
//$.addButton.addEventListener('click', function(e)
function openAddWindow()
{
	// set add city window
	var addWindow = Alloy.createController('add').getView();
	addWindow.backButtonTitle = 'Back';
	
	// open the add city window
	addWindow.open();
};

// when a row in the city tables is clicked
$.citiesTableView.addEventListener('click', function(e)
{
	// create the details window
	// pass the query attribute from the table to the window
	// assign a window table and define the back button text
	var detailsWindow = Alloy.createController('details', {query: e.rowData.query}).getView();
	detailsWindow.title = e.rowData.title;
	detailsWindow.backButtonTitle = 'Back';

	// open the details window
	detailsWindow.open();
	
});

$.indexWindow.open();
