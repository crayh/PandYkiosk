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

exports.getProducts = function(){
	var endpoint = '/wp-json/wc/v1/products';
	
	httpClient.doGet(buildUrl(endpoint), function(success, res){
		Ti.API.info(res);
	});
};

// Appends endpoint to config.woo_commerce_base_url and authorization string
function buildUrl(endpoint){
	var url = config.woo_commerce_base_url + endpoint;
		url = url + '?' + 'consumer_key=' + config.wooKey + '&' + 'consumer_secret=' + config.wooSecret;
	return url; 
}
