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
		var config = require('config');
		
		//Since we're loading (potentailly many) remote images.  Keep an eye on this during dev.
		if(config.mode == config.mode_development){
			Ti.App.addEventListener('memorywarning', function(e){
				alert('Memory Warning:  ' + e);
			});
		}
			
		var MainDisplayWindow = require('ui/mainDisplayWindow/MainDisplayWindow');
		var MainShopWindow = require('ui/mainShopWindow/MainShopWindow');
		var LoadingWindow = require('ui/LoadingView');
		var wooClient = require('lib/WooCommClient');

		var mainDisplayWindow = new MainDisplayWindow();
			
			function mainDisplayWindowClick(e){
				mainDisplayWindow.removeEventListener('click', mainDisplayWindowClick);
				
				loadShop();
				
				mainDisplayWindow.close();
			}
			mainDisplayWindow.addEventListener('touchstart', mainDisplayWindowClick);
		
		mainDisplayWindow.open();
			
		var mainShopWindow;
		
		function loadShop(){
			mainShopWindow = null;
			
			mainShopWindow = new MainShopWindow();
			
			mainShopWindow.addEventListener('open', shopWindowOpen);
			mainShopWindow.addEventListener('close', shopWindowClose);
		
			var touchTime = 20; 
			var timer;

			function timeCheck(){
				touchTime -= 1;
				
				if(touchTime < 0){
					closeShop();
				}
				else if(touchTime < 5){
					mainShopWindow.showPrompt(touchTime);
				}
				else{
					mainShopWindow.hidePrompt();
				}
			}
			
			function shopWindowOpen(e){
				mainShopWindow.removeEventListener('open', shopWindowOpen);
				timer = setInterval(timeCheck, 1000);
			}
			
			
			function shopWindowClose(e){
				mainShopWindow.removeEventListener('close', shopWindowClose);
				mainShopWindow = null;
				clearInterval(timer);
				touchTime = 20;
			}
			mainShopWindow.addEventListener('close', shopWindowClose);
			
			function shopWindowTouchstart(e){
				touchTime = 20;
			}
			mainShopWindow.addEventListener('touchstart', shopWindowTouchstart);
			
			mainShopWindow.open();
			
			var loadingWindow = new LoadingWindow();
			loadingWindow.open();
			
			wooClient.getProducts('all', function(success, products){
				if(success){
					mainShopWindow.doneLoading();
					
					var delay = setTimeout(function(){
						loadingWindow.close();
					}, 600);
				}else{
					alert(error);
				}
			});
			
			function closeShop(){
			mainShopWindow.removeEventListener('touchstart', shopWindowTouchstart);
				
				mainShopWindow.close();
				
				mainShopWindow = null;
				
				mainDisplayWindow.addEventListener('click', mainDisplayWindowClick);
				
				mainDisplayWindow.open();
			}
		}
		
})();


