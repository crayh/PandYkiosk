/**
 * The main display context window
 * 
 * @author Cole Halverson
 */
function MainDisplayWindow(){
	
	var win = Ti.UI.createWindow({
		width: Ti.UI.FILL,
		height: Ti.UI.FILL,
		backgroundColor: 'pink',
		opacity: 0.0
	});
	
		function winOpenCallback(e){
			win.animate({duration: 250, opacity: 1.0});
		}
		
		win.addEventListener('open', winOpenCallback);
		
	return win;
}

module.exports = MainDisplayWindow;