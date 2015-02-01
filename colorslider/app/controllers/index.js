function rgb2hex(red,green,blue)
{
	return "#" +
		("0" + parseInt(red,10).toString(16)).slice(-2) +
		("0" + parseInt(green,10).toString(16)).slice(-2) +
		("0" + parseInt(blue,10).toString(16)).slice(-2);
}

// red slider
$.redSlider.addEventListener('change', function(e)
{
	$.indexWindow.backgroundColor = rgb2hex($.redSlider.value, $.greenSlider.value, $.blueSlider.value);
});

// green slider
$.greenSlider.addEventListener('change', function(e)
{
	$.indexWindow.backgroundColor = rgb2hex($.redSlider.value, $.greenSlider.value, $.blueSlider.value);
});

// blue slider
$.blueSlider.addEventListener('change', function(e)
{
	$.indexWindow.backgroundColor = rgb2hex($.redSlider.value, $.greenSlider.value, $.blueSlider.value);
});

// open window
$.indexWindow.open();
