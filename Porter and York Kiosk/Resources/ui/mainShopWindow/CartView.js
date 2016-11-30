/**
 * The first view in the MainShopWindow scrollableView.
 * @author Cole Halverson
 */

function CartView(){
	
	var cartView = Ti.UI.createView({
		top: 10,
		left: 10,
		right: 10,
		bottom: '12%',
		backgroundColor: 'white'
	});
	
	return cartView;
}

module.exports = CartView;