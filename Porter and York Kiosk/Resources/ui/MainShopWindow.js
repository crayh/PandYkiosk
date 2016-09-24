/**
 * The main shopping experience Window
 * 
 * @author Cole Halverson
 */

function MainShopWindow(args){
	
	var httpClient = require('lib/HttpClient');
	var wooClient = require('lib/WooCommClient');
	
	var win = Ti.UI.createWindow({
		width: '100%',
		height: '100%',
		backgroundColor: 'green',
		opacity: 0.0,
	});
	
	var postLayoutCallback = function(e){
		
	};
	
	win.addEventListener('postlayout', postLayoutCallback);
	
	var windowOpenCallback = function(e){
		win.animate({opacity: 1.0, duration: 400});
	};
	
	win.addEventListener('open', windowOpenCallback);
	
	var mainContainerView = Ti.UI.createView({
		height: "75%",
		width: "75%",
		backgroundColor: 'orange'
	});
	
	mainContainerView.addEventListener('click', function(){
		wooClient.getIndex();
	});
	
		var label = Ti.UI.createLabel({
			text: "Porter & York",
			top: "51%",
			font: {fontColor: 'black',
					fontSize: 30}
		});
	
	mainContainerView.add(label);
	win.add(mainContainerView);
	
	return win;
}

module.exports = MainShopWindow;