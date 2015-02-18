var args = arguments[0] || {};

var db = Ti.Database.open('myDatabase');

$.addCityButton.addEventListener('click', function(e)
{
	// if field isn't empty
	if($.cityTextField.value != '' && $.stateTextField.value != '')
    {
		// insert record into the database
		var city = $.cityTextField.value + ', ' + $.stateTextField.value;
		var query = $.cityTextField.value.replace(" ", "+") + ',' + $.stateTextField.value; 
		db.execute('INSERT INTO cities (city, query) VALUES (?, ?)', city, query);
	    
	    // clear textFields
	    $.cityTextField.value = '';
	    $.stateTextField.value = '';
	    
	    // close add window
	    $.addWindow.close();
    }
});
