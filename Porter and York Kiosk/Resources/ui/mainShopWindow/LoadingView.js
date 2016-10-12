/**
 * Has a high z-index to cover the view while loading
 * 
 * @author Cole Halverson
 */

function LoadingView(){
	
	var loadingView = Ti.UI.createView({
		height: Ti.UI.FILL,
		width: Ti.UI.FILL,
		backgroundColor: 'gray',
		zIndex: 100
	});
	
	return loadingView;
}

module.exports = LoadingView;