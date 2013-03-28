function startUp() {
	setTimeout(function() {updateValues();}, 100);
	defaultDisplay = window.localStorage.getItem('default-display');
	var sel = document.getElementsByTagName('select')[0]
	for (var i=0;i<sel.options.length;i++) {
		if (sel.options[i].value == defaultDisplay) {
			sel.selectedIndex = i;
		}
	};
}

function displayChanged() {
	var sel = document.getElementsByTagName('select')[0]
	newValue = sel.options[sel.selectedIndex].value;
	window.localStorage.setItem('default-display', newValue);
	chrome.extension.getBackgroundPage().updateTicker();
}

function updateValues(){
	chrome.extension.getBackgroundPage().updateTicker();
	$('#mtgox-high').html("&#36;&nbsp;"+Number(window.localStorage.getItem('mtgox-high')).toFixed(2));
	$('#mtgox-low').html("&#36;&nbsp;"+Number(window.localStorage.getItem('mtgox-low')).toFixed(2));
	$('#mtgox-buy').html("&#36;&nbsp;"+Number(window.localStorage.getItem('mtgox-buy')).toFixed(2));
	$('#mtgox-sell').html("&#36;&nbsp;"+Number(window.localStorage.getItem('mtgox-sell')).toFixed(2));
}

document.addEventListener('DOMContentLoaded', function() {
	startUp();
});