defaultDisplay = window.localStorage.getItem('default-display');
if (defaultDisplay == null){
	defaultDisplay = 'mtgox-buy';
	window.localStorage.setItem('default-display', 'mtgox-buy');
}
chrome.browserAction.setBadgeBackgroundColor({color:[0, 0, 0, 150]});
updateTicker();
setTimeout(function() {updateTicker();}, 1000);
setInterval(function() {updateTicker();}, 10000);

chrome.browserAction.onClicked.addListener(function(tab) {
	updateTicker();
});

function updateTicker(){
	getMtgox();
	chrome.browserAction.setBadgeText({	text: String(window.localStorage.getItem(window.localStorage.getItem('default-display')))});
}
function getMtgox() {
	$.getJSON('https://data.mtgox.com/code/data/ticker.php', function(data) {
		window.localStorage.setItem('mtgox-high',Number(data["ticker"]["high"]));
		window.localStorage.setItem('mtgox-low',Number(data["ticker"]["low"]));
		window.localStorage.setItem('mtgox-buy',Number(data["ticker"]["buy"]));
		window.localStorage.setItem('mtgox-sell',Number(data["ticker"]["sell"]));
	});
}
function parseTrades(data) {
	prices = [];
	minPrice = Number(data[0]['price']);
	maxPrice = Number(data[0]['price']);
	for (var x in data){
		price = Number(data[x]['price']);
		prices.push(price);
		if (price < minPrice) {
			minPrice = price;
		}
		if (price > maxPrice) {
			maxPrice = price;
		}
	}
	return [minPrice, maxPrice];
}