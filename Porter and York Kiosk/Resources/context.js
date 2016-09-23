/**
 * @author Cole Halverson
 */

var MainShopWindow = require('ui/MainShopWindow');

exports.launchShop = function(){
	var mainShopWindow = new MainShopWindow(); 
	
	mainShopWindow.open();
	
	return mainShopWindow;
};
