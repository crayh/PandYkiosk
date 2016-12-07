/**
 * Opens when a product is clicked from a Category View.  Displays all the info about the product and allows user to add it to cart
 * 
 * @author Cole Halverson
 */

function SingleProductView(args){
	
	var cart = require('cart');
	
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
	
	var closeButton = Ti.UI.createLabel({
		top: 20,
		right: 20,
		height: Ti.UI.SIZE,
		width: Ti.UI.SIZE,
		text: "X",
		font: {fontSize: 30}
	});
	closeButton.addEventListener('click', function(e){
		args.parentWindow.hideProduct(mainScrollView);
	});
	mainView.add(closeButton);
	
	var addToCartButton = Ti.UI.createLabel({
		top: 20,
		left: 20,
		height: Ti.UI.SIZE,
		width: Ti.UI.SIZE,
		text: "Add to Cart",
		font: {fontSize: 30}
	});
	addToCartButton.addEventListener('click', addToCart);
	mainView.add(addToCartButton);
	
	function addToCart(e){
		//Ti.API.info(args.productObject.variations);
		
		var cartItemArgs = {
			productId: 1,
			variationId: 2,
			displayName: 'filet mignon',
			count: 3,
			productObject: {}
		};
		
		var cartItem = cart.createCartItem(cartItemArgs);
		
		cart.addToCart(cartItem);
	}
	
	var addToCart2Button = Ti.UI.createLabel({
		top: 150,
		left: 20,
		height: Ti.UI.SIZE,
		width: Ti.UI.SIZE,
		text: "Add to Cart",
		font: {fontSize: 30}
	});
	addToCart2Button.addEventListener('click', addToCart2);
	mainView.add(addToCart2Button);
	
	function addToCart2(e){
		//Ti.API.info(args.productObject.variations);
		
		var cartItemArgs = {
			productId: 5,
			variationId: 6,
			displayName: 'ribeye steak',
			count: 2,
			productObject: {}
		};
		
		var cartItem = cart.createCartItem(cartItemArgs);
		
		cart.addToCart(cartItem);
	}
	
	
	mainScrollView.add(mainView);
	
	return mainScrollView;
}

module.exports = SingleProductView;