/**
 * Holds exported functions that each perform a GET, POST, PUT, or DELETE against the WooCommerce API
 * @author Cole Halverson
 */
var httpClient = require('/lib/HttpClient');
var config = require('config');
var localStorage = require('local-storage');

exports.getIndex = function(){
	var endpoint = '/wp-json/wc/v1';
	
	httpClient.doGet(buildUrl(endpoint), function(success, res){
		Ti.API.info(res);
	});
};

exports.getOrders = function(){
	var endpoint = '/wp-json/wc/v1/orders';
	
	httpClient.doGet(buildUrl(endpoint), function(success, res){
		Ti.API.info(res);
	});
};

exports.getProducts = function(productId, callback){
	//var endpoint = '/wp-json/wc/v1/products/';
	var endpoint = '/wc-api/v3/products/';
	
	if(productId !== 'all'){endpoint += productId;};

	var url = buildUrl(endpoint);
	//Tell API to include product meta data in the JSON return
	url += '&filter[meta]=true';
	//Tell the API to not limit the results (default is 10)
	url += '&filter[limit]=100';
	
	httpClient.doGet(url, function(success, res){
		if(success){
			callback(filterAndStoreProducts(res.products));
		}else{
			//TODO error handler
		}
		
	});
};

// Appends endpoint to config.woo_commerce_base_url and authorization string
function buildUrl(endpoint){
	var url = config.woo_commerce_base_url + endpoint;
		url = url + '?' + 'consumer_key=' + config.wooKey + '&' + 'consumer_secret=' + config.wooSecret;
	return url; 
}

/*
 * woo-commerce api products GET doesn't have a filter, so we filter the response here.
 * In dev, all products are returned.  Prod is only published and in-stock products.
 * 
 */ 
function filterAndStoreProducts(products){
	
	products = products.filter(function(product){
		if (product.status === 'publish' && product.product_meta.grocery_kiosk_product){
			return true;
		}else{
			return false;
		};
	});
	
	products = localStorage.storeProducts(products);
	
	return products;
}
