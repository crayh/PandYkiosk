// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundImage('ui/images/wooTable.png');

/**
* Magtek Card Reader stuff
* 
* Module on git:  https://github.com/appcelerator-archive/ti.magtek/tree/master/ios
* 
* This is here because I can't seem to make it work if inside a module.  
*/
	//require the magtek module  
	 var Magtek = require('ti.magtek');

		Magtek.addEventListener('connected', function(e){
		   Ti.App.fireEvent('cardReaderConnected', {e: e});
		});
		Magtek.addEventListener('disconnected', function(e){
		   Ti.App.fireEvent('cardReaderDisconnected', {e: e});
		});
		Magtek.addEventListener('swipe', function(e){
			Ti.App.fireEvent('cardReaderSwipe', {e: e});
		});
		Magtek.addEventListener('swipeError',function(e){
			Ti.App.fireEvent('cardReaderSwipeError', {e: e});
		});
		
		//register the device with iOS EAAccessory Framework
		Magtek.registerDevice({
			protocol: 'com.magtek.idynamo',
			deviceType: Magtek.DEVICE_TYPE_IDYNAMO
		});


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
			
			mainDisplayWindow.addEventListener('touchstart', mainDisplayWindowClick);
		
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


