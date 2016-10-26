/**
 * The view to display a product category.  Parent is the mainShopWindow scrollableView.
 * 
 * @author Cole Halverson
 */

function CategoryView(productArray){
	
	var config = require('config');
	
	Ti.API.info('ARRAY ' + JSON.stringify(productArray));
	
	var mainView = Ti.UI.createScrollView({
		height: Ti.UI.FILL,
		left: 10,
		right: 10,
		opacity: 1.0,
		layout: 'vertical',
		nested: true
	});
	
	var categoryDescription = Ti.UI.createView({
		top: 5,
		width: Ti.UI.FILL,
		height: config.screenHeight * .50,
		opacity: 0.95,
		backgroundColor: 'white'
	});
	mainView.add(categoryDescription);
	
	for(var i=0; i<productArray.length; i++){
	
		var view = Ti.UI.createView({
			top: 5,
			width: Ti.UI.FILL,
			height: config.screenHeight * .35,
			opacity: 0.95,
			backgroundColor: 'white'
		});
		
			function viewPostLayoutCallback(){
				
			}
			view.addEventListener('postlayout', viewPostLayoutCallback);
		
		var label = Ti.UI.createLabel({
			height: 30,
			width: Ti.UI.SIZE,
			text: productArray[i].title
		});
		view.add(label);
		
		mainView.add(view);
	}
	
	var spacer = Ti.UI.createView({
		width: Ti.UI.FILL,
		height: 200,
		top: 0
	});
	
	mainView.add(spacer);
	
	return mainView;
}

module.exports = CategoryView;