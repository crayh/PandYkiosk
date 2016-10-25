// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');


(function()
	{
		var context = require('context');
		var LoadingWindow = require('ui/LoadingWindow');
		var MainDisplayWindow = require('ui/mainDisplayWindow/MainDisplayWindow');
		var MainShopWindow = require('ui/mainShopWindow/MainShopWindow');
		var wooClient = require('lib/WooCommClient');
		
		var loadingWindow = new LoadingWindow();
		var mainDisplayWindow = new MainDisplayWindow();
		
			
			function mainDisplayWindowClick(e){
				mainDisplayWindow.removeEventListener('click', mainDisplayWindowClick);
				
				loadShop();
				
				mainDisplayWindow.close();
			}
			
			mainDisplayWindow.addEventListener('click', mainDisplayWindowClick);
		
		mainDisplayWindow.open();
		
		var mainShopWindow;
		
		function InstantiateShopWindow(){
			mainShopWindow = new MainShopWindow();
		
			var touchTime = 80; 
			var timer;

			function timeCheck(){
				touchTime -= 1;
				
				if(touchTime < 0){
					closeShop();
				}
				else if(touchTime < 20){
					mainShopWindow.showPrompt(touchTime);
				}
				else{
					mainShopWindow.hidePrompt();
				}
			}
			
			mainShopWindow.addEventListener('open', function(e){
				timer = setInterval(timeCheck, 1000);
			});
			
			mainShopWindow.addEventListener('close', function(e){
				clearInterval(timer);
				touchTime = 80;
			});
			
			mainShopWindow.addEventListener('touchstart', function(e){
				Ti.API.info('touch');
				touchTime = 80;
			});
		}
		
		
			
		function loadShop(){
			loadingWindow.open();
			
			wooClient.getProducts('all', function(success, products){
				if(success){
					var dramaticDelay = setTimeout(function(){
						InstantiateShopWindow();
						mainShopWindow.open();
						loadingWindow.close();
					}, 3500);
					
				}else{
					alert(error);
				}
			});
		}
		
		function closeShop(){
			mainShopWindow.close();
			
			mainDisplayWindow.addEventListener('click', mainDisplayWindowClick);
			
			mainDisplayWindow.open();
		}
		
	})();


