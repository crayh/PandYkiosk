/**
 * The first view in the MainShopWindow scrollableView.
 * @author Cole Halverson
 */

function HomeView(){
	
	var homeView = Ti.UI.createView({
		top: 10,
		left: 10,
		right: 10,
		bottom: '12%',
		backgroundColor: 'white'
	});
	
	return homeView;
}

module.exports = HomeView;