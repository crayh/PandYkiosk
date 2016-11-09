/**
 * Sits at the top of each CategoryView to give an overall description of the product category.
 * 
 * @author Cole Halverson
 */

function CategoryDescription(productArray){
	
	var config = require('config');
	
	var categoryDescriptionView = Ti.UI.createView({
		//top: 10,
		//left: 10,
		//right: 10,
		top: 0,
		width: '100%',
		height: Ti.UI.SIZE,//config.screenHeight * .75,
		//opacity: 0.95,
		backgroundColor: 'white'
	});
	
		function categoryDescriptionViewPostlayout(e){
			categoryDescriptionView.removeEventListener('postlayout', categoryDescriptionViewPostlayout);
			
			//e.source.setHeight(e.source.size.height + 10);
		}
		categoryDescriptionView.addEventListener('postlayout', categoryDescriptionViewPostlayout);
	
	var backgroundImage = Ti.UI.createImageView({
		top: 0,
		width: Ti.UI.FILL,
		image: 'ui/images/beefBackground.png'
	});
	categoryDescriptionView.add(backgroundImage);
	
	var imageView = Ti.UI.createImageView({
		top: 0,
		width: Ti.UI.FILL,
		image: 'ui/images/blurCategoryDescription.png',
		opacity: 0.0
	});
	categoryDescriptionView.add(imageView);
	
	categoryDescriptionView.showDetails = function(){
		var delay = setTimeout(function(){
			imageView.animate({opacity: 1.0, duration: 1000});
		}, 500);
	};
	
	categoryDescriptionView.reset = function(){
		imageView.setOpacity(0.0);
	};
	
	
	return categoryDescriptionView;
}

module.exports = CategoryDescription;