// create database
var db = Ti.Database.open('myDatabase');

// create table
db.execute('CREATE TABLE IF NOT EXISTS things (thingId INTEGER PRIMARY KEY AUTOINCREMENT, thing TEXT, date TEXT)');	
	
// populate things tableView
getThings();
	
// get things
function getThings()
{
	// create an empty results array
	var results = [];
	
	// get records from the database table
	var resultSet = db.execute('SELECT thingId, thing, date FROM things ORDER BY date DESC');
	
	// loop through the returned results
	while(resultSet.isValidRow())
	{
		// append data to the results array
		results.push({
			thingId: resultSet.fieldByName('thingId'),
			title: resultSet.fieldByName('thing'),
			date: resultSet.fieldByName('date')
		});
		
		// get the next record
		resultSet.next();
	}
	
	// close the resultset
	resultSet.close();

	// populate the things table with data
	$.thingsTableView.data = results;
}

// when the add button is clicked
$.addButton.addEventListener('click', function(e)
{
	// if field isn't empty
	if($.itemTextField.value != '')
    {
		// insert record into the database
		db.execute('INSERT INTO things (thing, date) VALUES (?, ?)', $.itemTextField.value, new Date());
	    
	    // refresh table
	    getThings();
	    
	    // clear textField
	    $.itemTextField.value = '';
    }
});

// create edit and done buttons
var editButton = Ti.UI.createButton({
    systemButton: Ti.UI.iPhone.SystemButton.EDIT
});
var doneButton = Ti.UI.createButton({
    systemButton: Ti.UI.iPhone.SystemButton.DONE
});

// set right navigation button
$.indexWindow.rightNavButton = editButton;

// if edit button is clicked
editButton.addEventListener('click', function(e)
{
	$.thingsTableView.editing = true;
	$.indexWindow.rightNavButton = doneButton;
});

// if done button is clicked
doneButton.addEventListener('click', function(e)
{
	$.thingsTableView.editing = false;
	$.indexWindow.rightNavButton = editButton;
});

// if user is deleting a thing
$.thingsTableView.addEventListener('delete', function(e) 
{
	// delete record from the database
	db.execute('DELETE FROM things WHERE thingId = ?', e.rowData.thingId);
});

// open window
$.navWindow.open();
