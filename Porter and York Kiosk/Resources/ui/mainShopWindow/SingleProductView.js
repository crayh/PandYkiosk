/**
 * Opens when a product is clicked from a Category View.  Displays all the info about the product and allows user to add it to cart
 * 
 * @author Cole Halverson
 */

function SingleProductView(args){
	var mainScrollView = Ti.UI.createScrollView({
		height: Ti.UI.FILL,
		width: Ti.UI.FILL,
	});
	
	var blur = Ti.UI.iOS.createBlurView({
		height: Ti.UI.FILL,
		width: Ti.UI.FILL,
		effect: Ti.UI.iOS.BLUR_EFFECT_STYLE_LIGHT
	});
	
	
	mainScrollView.add(blur);
	
	var mainView = Ti.UI.createView({
		top: 30,
		width: '75%',
		height: 2000,
		backgroundColor: 'white',
		borderRadius: 20
	});
	
	mainScrollView.add(mainView);
	
	
	return mainScrollView;
}

module.exports = SingleProductView;