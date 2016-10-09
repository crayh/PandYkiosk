/**
 * The main shopping experience Window
 * 
 * @author Cole Halverson
 */

function MainShopWindow(args){
	
	var httpClient = require('lib/HttpClient');
	var wooClient = require('lib/WooCommClient');
	var CategoryDock = require('ui/mainShopWindow/CategoryDock');
	
	var win = Ti.UI.createWindow({
		width: '100%',
		height: '100%',
		backgroundColor: 'green',
		opacity: 0.0,
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
	
	var scrollableView = Ti.UI.createScrollableView({
		height: Ti.UI.FILL,
		width: Ti.UI.FILL,
		backgroundColor: 'red'
	});
	
	var view1 = Ti.UI.createView({
			backgroundColor: 'orange',
			height: Ti.UI.FILL,
			width: Ti.UI.FILL
	}),
		view2 = Ti.UI.createView({
			backgroundColor: 'blue',
			height: Ti.UI.FILL,
			width: Ti.UI.FILL
	}),
		view3 = Ti.UI.createView({
			backgroundColor: 'green',
			height: Ti.UI.FILL,
			width: Ti.UI.FILL
	});
	
	scrollableView.setViews([view1, view2, view3]);
	
	win.add(scrollableView);
	
	return win;
}

module.exports = MainShopWindow;