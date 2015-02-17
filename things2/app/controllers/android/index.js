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

// if user is deleting a thing
$.thingsTableView.addEventListener('click', function(e) 
{
	// get selected row
	var selectedRow = e.rowData.thingId;
	
	// create an alert dialog
	var alertDialog = Titanium.UI.createAlertDialog({ title: 'Delete thing', message: 'Are you sure?', buttonNames: ['Yes', 'No'] });

	// alert dialog event handlers
	alertDialog.addEventListener('click', function(e) 
	{ 
		// which button has been pressed?
		switch (e.index) 
		{
      		// yes button
      		case 0: 
      		
      			// delete record from the database
				db.execute('DELETE FROM things WHERE thingId = ?', selectedRow);
				
				// refresh tableView
				getThings();
				
  			break;

			// no button
			case 1: 

				// do nothing
			
			break;
		}
	});

	// show alert dialog
	alertDialog.show();

});

// open window
$.indexWindow.open();
