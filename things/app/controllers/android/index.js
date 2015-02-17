var myThings = Alloy.Collections.things;

// get all things
myThings.fetch();

// when the add button is clicked
$.addButton.addEventListener('click', function(e)
{
	// if field isn't empty
	if($.itemTextField.value != '')
    {
    	// create a new thing
	    var thing = Alloy.createModel('things', {
	        item : $.itemTextField.value,
	        dateAdded : new Date()
	    });
	    
	    // add to tableView
	    myThings.add(thing);
	    
	    // save to database table
	    thing.save();
	    
	    // clear textField
	    $.itemTextField.value = '';
    }
});

// if user is deleting a thing
$.thingsTableView.addEventListener('click', function(e) 
{
	// get selected row
	var selectedRow = e.row.thingId;

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
      		
      			// delete thing
      			myThings.get(selectedRow).destroy();
				
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
