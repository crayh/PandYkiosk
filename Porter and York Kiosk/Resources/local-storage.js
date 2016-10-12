/**
 * Simply stores information returned from the woocommerce API
 * 
 * @author Cole Halverson
 */

var storedProducts = {};

exports.storeProducts = function(products){
	storedProducts = {};
		
	//Create an array for each main product category that exists
	var beef = [];
	var pork = [];
	var chicken = [];
	var seafood = [];
	var lamb = [];
	
	for(var i=0; i < products.length; i++){
		
		if(products[i].categories.indexOf('Beef') > -1){
			beef.push(products[i]);
		}else if(products[i].categories.indexOf('Chicken') > -1){
			chicken.push(products[i]);
		}else if(products[i].categories.indexOf('Pork') > -1){
			pork.push(products[i]);
		}else if(products[i].categories.indexOf('Seafood') > -1){
			seafood.push(products[i]);
		}else if(products[i].categories.indexOf('Lamb') > -1){
			lamb.push(products[i]);
		}
		
	}
	
	if(beef.length > 0){
		storedProducts.beef = beef;
	}
	if(chicken.length > 0){
		storedProducts.chicken = chicken;
	}
	if(pork.length > 0){
		storedProducts.pork = pork;
	}
	if(seafood.length > 0){
		storedProducts.seafood = seafood;
	}if(lamb.length >0){
		storedProducts.lamb = lamb;
	}
		
	return storedProducts;
};
