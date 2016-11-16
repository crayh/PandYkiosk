/**
 * Simply stores information returned from the woocommerce API
 * 
 * @author Cole Halverson
 */

var storedProducts = [];

exports.storeProducts = function(products){
	storedProducts = [];
		
	//Create an array for each main product category that exists
	var beef = [];
	var pork = [];
	var chicken = [];
	var seafood = [];
	var lamb = [];
	
	for(var i=0; i < products.length; i++){
		
		Ti.API.info('Product = ' + JSON.stringify(products[i]));
		
		if(products[i].categories.indexOf('Beef') > -1){
			beef.push(products[i]);
			beef.name = 'Beef';
		}else if(products[i].categories.indexOf('Chicken') > -1){
			chicken.push(products[i]);
			chicken.name = 'Chicken';
		}else if(products[i].categories.indexOf('Pork') > -1){
			pork.push(products[i]);
			pork.name = 'Pork';
		}else if(products[i].categories.indexOf('Seafood') > -1){
			seafood.push(products[i]);
			seafood.name = 'Seafood';
		}else if(products[i].categories.indexOf('Lamb') > -1){
			lamb.push(products[i]);
			lamb.name = 'Lamb';
		}
		
	}
	
	if(beef.length > 0){
		storedProducts.push(beef);
	}
	if(chicken.length > 0){
		storedProducts.push(chicken);
	}
	if(pork.length > 0){
		storedProducts.push(pork);
	}
	if(seafood.length > 0){
		storedProducts.push(seafood);
	}if(lamb.length >0){
		storedProducts.push(lamb);
	}
		
	return storedProducts;
};

exports.getStoredProducts = function(){
	return storedProducts;
};
