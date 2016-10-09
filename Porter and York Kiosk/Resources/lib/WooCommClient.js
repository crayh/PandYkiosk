/**
 * Holds exported functions that each perform a GET, POST, PUT, or DELETE against the WooCommerce API
 * @author Cole Halverson
 */
var httpClient = require('/lib/HttpClient');
var config = require('config');

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
	var endpoint = '/wp-json/wc/v1/products/';
	
	if(productId !== 'all'){endpoint += productId;};

	var url = buildUrl(endpoint);
	
	//Tell the API to not limit the results (default is 10)
	url += '&per_page=100';
	
	httpClient.doGet(url, function(success, res){
		if(success){
			callback(filterProducts(res));
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
function filterProducts(products){
	
	Ti.API.info(products.length);
	
	//TODO change to config.mode_production
	if(config.mode === config.mode_production){
			products = products.filter(function(product){
				if (product.status === 'publish' && product.in_stock){
					return true;
				}else{
					return false;
				};
			});
	}
	
	Ti.API.info(products.length);
	return products;
}
