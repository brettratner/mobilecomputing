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
	myThings.get(e.row.thingId).destroy();
});

// open window
$.navWindow.open();
