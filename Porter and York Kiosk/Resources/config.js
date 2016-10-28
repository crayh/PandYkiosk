/**
 * @author Cole Halverson
 */

//WooCommerce REST API auth
exports.wooKey = "ck_bc547ebde42c1d3f72ede54cc83b51b047707f53";
exports.wooSecret = "cs_05312de38f84f03f1c3ab85400cc0988737894c6";

// The mode of the app
var mode;
var mode_production = 'production';
var mode_development = 'development';


//app colors
exports.darkBrown = "#2C2318";

//the screen height of the device
exports.screenHeight = Ti.Platform.displayCaps.platformHeight;
exports.screenWidth = Ti.Platform.displayCaps.platformWidth;

/**
 * Set the application mode - this can be used to add code that does not run in simulation
 * Also it is used to set specific runtime config variables below
 */
if (Ti.Platform.model === 'Simulator' || Ti.Platform.model.indexOf('sdk') !== -1)
	{
	mode = mode_development;
	}
else
	{
	mode = mode_production;
	}
	
exports.mode = mode;
exports.mode_production = mode_production;
exports.mode_development = mode_development;


// Set the services base url for testing and production
if(mode === mode_development)
	{
		exports.woo_commerce_base_url = 'https://porterandyork.staging.wpengine.com';
	}
else
	{
		//exports.woo_commerce_base_url = 'https://www.porterandyork.com';
		exports.woo_commerce_base_url = 'https://porterandyork.staging.wpengine.com';
	}
	
exports.namespace_header = 'WebApplicationMode';
exports.namespace = (Ti.App.deployType !== 'production') ? 'dev' : 'prod';

	
// Export the font names
exports.avenir_next_light = 'AvenirNext-Light';
exports.avenir_next_medium = 'AvenirNext-Medium';
exports.avenir_next_regular = 'AvenirNext-Regular';
exports.avenir_next_demibold = 'AvenirNext-DemiBold';
exports.opensans_semibold = 'OpenSans-Semibold';
exports.ptserif_regular = 'PTSerif-Regular';

// Set the version for the platform
// Currently used to set the top of a window for iOS 7
// http://docs.appcelerator.com/titanium/latest/#!/guide/iOS_7_Migration_Guide
var version = Titanium.Platform.version.split(".");
exports.major = parseInt(version[0],10);

