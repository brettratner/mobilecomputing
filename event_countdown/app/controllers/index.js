function calculateResults(e) 
{
	var today = new Date();
	var eventDate = new Date($.datePicker.value);
	var difference = eventDate - today;
	var numdays = Math.ceil(difference / (86400000));
    
 	if(numdays > 0)
 	{   
    	$.resultsLabel.text = $.eventTextField.value + ' will happen in ' + numdays + ' days';
	}
	else if(numdays == 0)
 	{   
    	$.resultsLabel.text = $.eventTextField.value + ' is today';
	}
	else 
	{
		$.resultsLabel.text = $.eventTextField.value + ' happened ' + Math.abs(numdays) + ' days ago';
	}

}

// set default date
$.datePicker.value = new Date();

// listen for button press
$.calculateButton.addEventListener('click', calculateResults);

// open window
$.indexWindow.open();
