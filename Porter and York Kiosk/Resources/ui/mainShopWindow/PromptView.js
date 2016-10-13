/**
 * Displays over the mainShopWindow before resetting due to inactivity
 * 
 * @author Cole Halverson
 */

function PromptView(){
	
	var config = require('config');
	
	var view = Ti.UI.createView({
		height: Ti.UI.FILL,
		width: Ti.UI.FILL,
		visible: false,
		zIndex: 100
	});
	
		var shade = Ti.UI.createView({
			height: Ti.UI.FILL,
			width: Ti.UI.FILL,
			backgroundColor: 'gray',
			opacity: .5
		});
		view.add(shade);
		
		var alertBox = Ti.UI.createView({
			height: '30%',
			width: '30%',
			backgroundColor: 'white',
			borderRadius: 10,
			layout: 'vertical'
		});
		view.add(alertBox);
			
			var stillShopping = Ti.UI.createLabel({
				top: '5%',
				width: Ti.UI.FILL,
				height: Ti.UI.SIZE,
				text: 'Still Shopping?',
				textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
				font: {fontFamily: config.avenir_next_regular,
						fontSize: 30}
			});
		alertBox.add(stillShopping);
		
			var alertString = Ti.UI.createLabel({
				top: '10%',
				width: Ti.UI.FILL,
				height: Ti.UI.SIZE,
				text: 'Kiosk will reset in:',
				textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
				font: {fontFamily: config.avenir_next_regular,
						fontSize: 20}
			});
		alertBox.add(alertString);
		
			var counter = Ti.UI.createLabel({
				top: '10%',
				width: Ti.UI.FILL,
				height: Ti.UI.SIZE,
				textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
				font: {fontFamily: config.avenir_next_regular,
						fontSize: 25}
			});
		alertBox.add(counter);
		
			var cancelString = Ti.UI.createLabel({
				top: '10%',
				width: Ti.UI.FILL,
				height: Ti.UI.SIZE,
				textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
				text: 'Touch To Cancel',
				font: {fontFamily: config.avenir_next_regular,
						fontSize: 20}
			});
		alertBox.add(cancelString);
			
			
	view.updateTimer = function(time){
		counter.setText(time);
	};	
		
	return view;
}

module.exports = PromptView;