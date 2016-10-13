/**
 * Window to display while the API call is executing and storing product data in local-storage.js
 * 
 * @author Cole Halverson
 */

function LoadingWindow(){
	
	var config = require('config');
	
	var win = Ti.UI.createWindow({
		height: Ti.UI.FILL,
		width: Ti.UI.FILL,
		fullscreen: true,
		opacity: 0.0,
		backgroundImage: 'ui/images/woodTable.png'
	});
	
	function winOpenCallback(e){
		win.animate({opacity: 1.0, duration: 250});
		
		animateSpinner();
	}
	win.addEventListener('open', winOpenCallback);
	
	function winPostLayoutCallback(e){
		win.removeEventListener('postlayout', winPostLayoutCallback);
		
	}
	win.addEventListener('postlayout', winPostLayoutCallback);
	
	var shade = Ti.UI.createView({
		height: Ti.UI.FILL,
		width: Ti.UI.FILL,
		backgroundColor: 'white',
		opacity: 0.5
	});
	win.add(shade);
	
	var mainLogo = Ti.UI.createImageView({
		height: '53%',
		image: 'ui/images/stackedLogo.png'
	});
	win.add(mainLogo);
	
	var logoSpinner = Ti.UI.createImageView({
		height: '11%',
		image: 'ui/images/logoSpinner.png'
	});
	win.add(logoSpinner);
	
		/**
		 * animate the spinner
		 */
		function animateSpinner(){
			
			var matrix = Ti.UI.create2DMatrix();
				matrix1 = matrix.rotate(120);
				matrix2 = matrix.rotate(240);
				matrix3 = matrix.rotate(360);
		
			var a1 = Ti.UI.createAnimation({
				duration: 500,
				delay: 450,
				transform: matrix1,
				curve: Titanium.UI.ANIMATION_CURVE_EASE_IN
			});
			a1.addEventListener('complete', function(){logoSpinner.animate(a2);});
			var a2 = Ti.UI.createAnimation({
				duration: 300,
				transform: matrix2,
				curve: Titanium.UI.ANIMATION_CURVE_LINEAR
			});
			a2.addEventListener('complete', function(){logoSpinner.animate(a3);});
			var a3 = Ti.UI.createAnimation({
				duration: 350,
				transform: matrix3,
				curve: Titanium.UI.ANIMATION_CURVE_EASE_OUT
			});
			a3.addEventListener('complete', function(){logoSpinner.animate(a1);});
		
			logoSpinner.animate(a1);
		}
	
	var slogan = Ti.UI.createLabel({
		bottom: '10%',
		height: Ti.UI.SIZE,
		width: Ti.UI.SIZE,
		text: 'Rare Meat. Well Done.',
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		font: {fontFamily: config.avenir_next_regular,
				fontSize: 40},
		color: config.darkBrown
	});
	win.add(slogan);
	
	return win;
}
module.exports = LoadingWindow;