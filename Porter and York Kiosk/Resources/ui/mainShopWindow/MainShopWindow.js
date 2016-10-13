/**
 * The main shopping experience Window
 * 
 * @author Cole Halverson
 */

function MainShopWindow(args){
	
	var httpClient = require('lib/HttpClient');
	var wooClient = require('lib/WooCommClient');
	var CategoryDock = require('ui/mainShopWindow/CategoryDock');
	var PromptView = require('ui/mainShopWindow/PromptView');
	
	var win = Ti.UI.createWindow({
		width: '100%',
		height: '100%',
		backgroundColor: 'green',
		opacity: 0.0,
		fullscreen: true
	});
	
	var postLayoutCallback = function(e){
		win.removeEventListener('postlayout', postLayoutCallback);
		
		var categoryDockArgs = {
			parentWidth: win.size.width,
			scrollableView: scrollableView,
			categories: ['beef', 'chicken', 'pork'],
		};
		
		var categoryDock = new CategoryDock(categoryDockArgs);
		
		function scrollableViewScrollCallback(e){
			categoryDock.scrollCallback(e);
		}
		scrollableView.addEventListener('scroll', scrollableViewScrollCallback);
		
		function scrollableViewScrollEndCallback(e){
			categoryDock.scrollEndCallback(e);
		}
		scrollableView.addEventListener('scrollend', scrollableViewScrollEndCallback);
	
		win.add(categoryDock);
	};
	
	win.addEventListener('postlayout', postLayoutCallback);
	
	var windowOpenCallback = function(e){
		win.animate({opacity: 1.0, duration: 400});
	};
	
	win.addEventListener('open', windowOpenCallback);
	
	/**
	 * "Stil Shopping?" prompt stuff.  Called by app.js
	 */
	var promptView = new PromptView();
	
		promptView.addEventListener('touchstart', function(){
			win.fireEvent('touchstart');
		});
	
	win.add(promptView);
	
	win.showPrompt = function(time){
		promptView.updateTimer(time);
		promptView.show();
	};
	
	win.hidePrompt = function(){
		promptView.hide();
	};
	
	var scrollableView = Ti.UI.createScrollableView({
		height: Ti.UI.FILL,
		width: Ti.UI.FILL,
		backgroundColor: 'red',
	});
	
	var view1 = Ti.UI.createView({
		height: Ti.UI.FILL,
		width: Ti.UI.FILL,
		backgroundColor: 'orange'
	});
	
	scrollableView.setViews([view1]);
		scrollableView.addEventListener('touchStart', function(){
			Ti.API.info('scrolltouch');
			win.fireEvent('touchstart');
		});
	
	win.add(scrollableView);
	
	return win;
}

module.exports = MainShopWindow;