/**
 * @author Cole Halverson
 */

var _ = require('lib/underscore-min');

var cartItems = [];

/**
 * 
 * @param {Object} cartItem
 */
exports.addToCart = function(cartItem){
	
	var currentCartItem = cartItemExists(cartItem);
	
	if(currentCartItem != null){	//if a cartItem matching the productObject and variationId is already present in cartItems[], update it's count
		//find the existing cartItem
		var existingItem = _.indexOf(cartItems, currentCartItem);
		cartItems[existingItem].setCount(cartItems[existingItem].getCount() + cartItem.count);
	}else{	    //else create a new cartItem and push it to cartItems 
		
		cartItems.push(cartItem);
	}
	
	writeCart();
};


/**
 * 
 * @param object {productId: int, productObject: , variationId:  , count:  }
 */
exports.createCartItem = function(args){
		var cartItem = {
			productId: args.productId,
			variationId: args.variationId,
			displayName: args.displayName,
			count: args.count,
			productObject: args.productObject
		};
		
		cartItem.setCount = function(count){
			this.count = count;
		};
		
		cartItem.getCount = function(){
			return this.count;
		};
		
		return cartItem;
};

exports.clearCart = function(){
	clearCart();
};

function clearCart(){
	cartItems = [];
}


/**
 * simply checks to see if the productId and variationId already exists in the cartItems array.  Returns true or false.
 * @param {Object} productId
 * @param {Object} variationId
 */
function cartItemExists(args){
	var result;
	
	if(args.variationId){
		result = _.findWhere(cartItems, {productId: args.productId, variationId: args.variationId});
	}else{
		result = _.findWhere(cartItems, {productId: args.productId});
	}
	
	if(result == undefined){
		return null;
	}else{
		Ti.API.info('Result: ' + result);
		return result;
	}

}

function writeCart(){
	for(var i = 0; i < cartItems.length; i++){
		Ti.API.info('prodId: ' + cartItems[i].productId + '   variationId: ' + cartItems[i].variationId + '   count: ' + cartItems[i].count + '   displayName: ' + cartItems[i].displayName );
	}
}
