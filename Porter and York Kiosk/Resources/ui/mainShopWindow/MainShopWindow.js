/**
 * The main shopping experience Window
 * 
 * @author Cole Halverson
 */
		

function MainShopWindow(args){
	
	var httpClient = require('lib/HttpClient');
	var wooClient = require('lib/WooCommClient');
	var localStorage = require('local-storage');
	var CategoryDock = require('ui/mainShopWindow/CategoryDock');
	var CategoryView = require('ui/mainShopWindow/CategoryView');
	var HomeView = require('ui/mainShopWindow/HomeView');
	var PromptView = require('ui/mainShopWindow/PromptView');
	//var SingleProductView = require('ui/mainShopWindow/SingleProductView');

	var win = Ti.UI.createWindow({
		width: '100%',
		height: '100%',
		opacity: 0.0,
		fullscreen: true,
		backgroundImage: 'ui/images/woodTable.png'
	});
	
	var postLayoutCallback = function(e){
		Ti.API.info('mainShopWin postlayout');
		win.removeEventListener('postlayout', postLayoutCallback);
	};
	win.addEventListener('postlayout', postLayoutCallback);
	
	var windowOpenCallback = function(e){
		win.animate({opacity: 1.0, duration: 400});
	};
	win.addEventListener('open', windowOpenCallback);
	
		win.showProduct = function(view){
			win.add(view);
		};
		
		win.hideProduct = function(view){
			win.remove(view);
		};
	
	var shade = Ti.UI.createView({
		height: Ti.UI.FILL,
		width: Ti.UI.FILL,
		backgroundColor: 'white',
		opacity: 0.85
	});
	win.add(shade);
	
	/**
	 * "Stil Shopping?" prompt stuff.  Called by app.js
	 */
	var promptView = new PromptView();
	
		promptView.addEventListener('touchstart', function(){
			win.fireEvent('touchstart');
		});
		
		promptView.addEventListener('click', function(){
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
	
	win.doneLoading = function(){
		var scrollableView = Ti.UI.createScrollableView({
			height: Ti.UI.FILL,
			width: Ti.UI.FILL
		});
		
			function scrollableViewPostlayoutCallback(e){
				e.source.removeEventListener('postlayout', scrollableViewPostlayoutCallback);
				
				win.add(categoryDock);
				
				/**
				 * Force all scrollableView.views to layout, which loads product images
				 */
				scrollableView.scrollToView(3);
			
				var delay = setTimeout(function(){
					scrollableView.scrollToView(0);	
				}, 100);
			};
		
		scrollableView.addEventListener('postlayout', scrollableViewPostlayoutCallback);
	
		scrollableView.addEventListener('touchstart', function(){
			win.fireEvent('touchstart');
		});
		scrollableView.addEventListener('touchmove', function(){
			win.fireEvent('touchstart');
		});
	
		//Get the products from storage
		var storedProducts = localStorage.getStoredProducts();
		
		/**
		 *  unshift storedProducts with a 'home' element in index 0
		 *  This keeps our logic clean for dynically building dockViews and categoryViews to match the products present
		 *  in the response from woocomm API 
		 */
			var home = {name: 'home'};
			storedProducts.unshift(home);
		
		//Build a CategoryView for each category with products
		var categoryViews = [];
		
	
		for (var i=0; i < storedProducts.length; i++){
			
			if(storedProducts[i].name === 'home')
			{
				var homeView = new HomeView();
				categoryViews.push(homeView);
			}else{
				var categoryView = new CategoryView(storedProducts[i], win);
				categoryViews.push(categoryView);
			}	
		}
		
		scrollableView.setViews(categoryViews);
		
		win.add(scrollableView);
		
		var categoryDockArgs = {
			parentWidth: win.size.width,
			scrollableView: scrollableView,
			storedProducts: storedProducts
		};
	
		var categoryDock = new CategoryDock(categoryDockArgs);
		
		function scrollableViewScrollCallback(e){
			categoryDock.scrollCallback(e);
			
			win.fireEvent('touchstart');
		}
		scrollableView.addEventListener('scroll', scrollableViewScrollCallback);
		
		function scrollableViewScrollEndCallback(e){
			categoryDock.scrollEndCallback(e);
			
			win.fireEvent('touchstart');
		}
		scrollableView.addEventListener('scrollend', scrollableViewScrollEndCallback);
		
	};
	
	return win;
}

module.exports = MainShopWindow;