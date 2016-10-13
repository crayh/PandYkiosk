/**
 * Window to display while the API call is executing and storing product data in local-storage.js
 * 
 * @author Cole Halverson
 */

function LoadingWindow(){
	var win = Ti.UI.createWindow({
		height: Ti.UI.FILL,
		width: Ti.UI.FILL,
		fullscreen: true,
		backgroundImage: 'ui/images/woodTable.png'
	});
	
	return win;
}
module.exports = LoadingWindow;