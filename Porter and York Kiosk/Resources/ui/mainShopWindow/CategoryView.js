/**
 * The view to display a product category.  Parent is the mainShopWindow scrollableView.
 * 
 * @author Cole Halverson
 */

function CategoryView(productArray, parentWindow){
	
	var config = require('config');
	var httpClient = require('lib/HttpClient');
	var imageUtil = require('lib/ImageUtil');
	
	var SingleProductView = require('ui/mainShopWindow/SingleProductView');
	var CategoryDescription = require('ui/mainShopWindow/CategoryDescription');
	
	Ti.API.info('ARRAY ' + JSON.stringify(productArray));
	
	var mainView = Ti.UI.createScrollView({
		height: Ti.UI.FILL,
		width: Ti.UI.FILL,
		opacity: 1.0,
		layout: 'vertical',
		nested: true,
		showVerticalScrollIndicator: true
	});
	
	mainView.showDetails = function(){
		mainView.categoryDescription.showDetails();
	};
	
	mainView.reset = function(){
		mainView.categoryDescription.reset();
		mainView.scrollTo(0,0);
	};
	
	mainView.categoryDescription = new CategoryDescription(productArray);
	
	mainView.add(mainView.categoryDescription);
	
	var productsView = Ti.UI.createView({
		top: 0,
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE,
		layout: 'horizontal'
	});
	mainView.add(productsView);
	
	var productViews = [];
	
	for(var i=0; i<productArray.length; i++){
	
		var view = Ti.UI.createView({
			top: 25,
			left: '3.9%',
			width: '44%',
			height: Ti.UI.SIZE,
			backgroundColor: 'white',
			layout: 'vertical',
			productObject: productArray[i]
		});
		
		view.addEventListener('click', function(e){
			e.source.setTouchEnabled(false);
			
			productViewArgs = {
				parentWindow: parentWindow,
				productObject: e.source.productObject
			};
			
			var singleProductView = new SingleProductView(productViewArgs);
			
			parentWindow.showProduct(singleProductView);
			
			e.source.setTouchEnabled(true);
		});
		
		if(i % 2 == 0)
				{
				  view.setLeft('3.9%');
				}
				else
				{
				  view.setRight('3.9%');
				}
			
		view.imageView = Ti.UI.createImageView({
			top: 3,
			left: 3,
			right: 3,
			image: 'ui/images/imageViewDefault.png',
			imageUrl: productArray[i].featured_src,
			imageTitle: productArray[i].title,
			touchEnabled: false
		});
		
		view.add(view.imageView);
		
		
		var titleView = Ti.UI.createImageView({
			height: Ti.UI.SIZE,
			width: Ti.UI.FILL,
			backgroundColor: 'white',
			layout: 'vertical',
			touchEnabled: false
		});
			
			var titleLabel = Ti.UI.createLabel({
				top: 5,
				left: 10,
				text: productArray[i].title,
				font: {fontSize: 28,
						fontFamily: config.avenir_next_regular}
			});
			titleView.add(titleLabel);
			
			var shortDescription = Ti.UI.createLabel({
				top: 5,
				height: Ti.UI.SIZE,
				bottom: 10,
				left: 10,
				right: 10,
				text: 'The one that made us famous.  Supreme tenderness, but a subtle beef flavor.',
				font: {fontSize: 20,
						fontFamily: config.avenir_next_regular}
			});
			titleView.add(shortDescription);
			
		view.add(titleView);
		
		productViews.push(view);
	}
	
	for(var j = 0; j<productViews.length; j++){
		productsView.add(productViews[j]);
		
		productViews[j].imageView.addEventListener('postlayout', getImage);
		//getImage(productViews[j].imageView);
	}
	
		function getImage(e){
			e.source.removeEventListener('postlayout', getImage);
			
			httpClient.doMediaGet(e.source.imageUrl, function(success, response){
						if(success){
							e.source.setImage(imageUtil.assertSquare(response));
						}
			});
		}
		
	
	var spacer = Ti.UI.createView({
		width: Ti.UI.FILL,
		height: 200,
		top: 0
	});
	
	mainView.add(spacer);
	
	return mainView;
}

module.exports = CategoryView;