/**
 * Sits at the top of each CategoryView to give an overall description of the product category.
 * 
 * @author Cole Halverson
 */

function CategoryDescription(productArray){
	
	var config = require('config');
	
	var categoryDescriptionView = Ti.UI.createView({
		top: 0,
		width: '100%',
		height: Ti.UI.SIZE
	});
	
		function categoryDescriptionViewPostlayout(e){
			categoryDescriptionView.removeEventListener('postlayout', categoryDescriptionViewPostlayout);
			
		}
		categoryDescriptionView.addEventListener('postlayout', categoryDescriptionViewPostlayout);
	
	var backgroundImage = Ti.UI.createImageView({
		top: 2,
		right: 2,
		left: 2,
		width: Ti.UI.FILL,
		image: 'ui/images/beefBackground.png'
	});
	categoryDescriptionView.add(backgroundImage);
	
	var imageView = Ti.UI.createImageView({
		top: 2,
		left: 2,
		right: 2,
		image: 'ui/images/blurLightCategoryDescription.png',
		opacity: 0.0
	});
	categoryDescriptionView.add(imageView);
	
	categoryDescriptionView.showDetails = function(){
		var delay = setTimeout(function(){
			imageView.animate({opacity: 1.0, duration: 1000});
		}, 250);
	};
	
	categoryDescriptionView.reset = function(){
		imageView.setOpacity(0.0);
	};
	
	
	return categoryDescriptionView;
}

module.exports = CategoryDescription;