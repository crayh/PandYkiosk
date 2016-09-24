/**
 * Holds exported functions that each perform a GET, POST, PUT, or DELETE against the WooCommerce API
 * @author Cole Halverson
 */
var httpClient = require('/lib/HttpClient');
var config = require('config');

exports.getIndex = function(){
	var endpoint = '/wp-json/wc/v1';
	
	httpClient.doGet(config.woo_commerce_base_url, endpoint, function(success, res){
		Ti.API.info(res);
	});
};
