/**
 * Displays the available product categories in the MainShopWindow
 * 
 * @author Cole Halverson
 */

function CategoryDock(args){
	
	var categoryDock = Ti.UI.createView({
		bottom: 15,
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		opacity: 1.0,
		layout: 'horizontal',
		horizontalWrap: false,
		clipMode: Ti.UI.iOS.CLIP_MODE_DISABLED
	});
	
	function categoryDockPostLayoutCallback(){
		categoryDock.animate({opacity: 1.0, duration: 250});
	}
	categoryDock.addEventListener('postlayout', categoryDockPostLayoutCallback);
	
	
	var dockViews = [];
	
	for (var i=0; i < args.storedProducts.length; i++){
		 
		dockViews[i] = Titanium.UI.createView({
			left: 20,
			width: args.parentWidth * .075,
			height: Ti.UI.SIZE,
			opacity: 0.75,
			index: i
		});
		//If last category, set right property on view
		if(i == args.storedProducts.length -1){
			dockViews[i].setRight(20);
		}
		
		dockViews[i].addEventListener('singletap', function(e){
			args.scrollableView.scrollToView(e.source.index);
		});
		
		var label = Ti.UI.createLabel({
			text: args.storedProducts[i].name
		});
		
		//TODO  get proper image by args.storedProducts[i].name
		var imageView = Ti.UI.createImageView({
			width: Ti.UI.FILL,
			image: 'ui/images/knives.png'
		});
		dockViews[i].add(imageView);
		
		dockViews[i].activate = function(){
			var matrix = Ti.UI.create2DMatrix();
				matrix = matrix.scale(1.3,1.3);
			var a = Ti.UI.createAnimation({
				transform: matrix,
				duration: 250
			});
			this.animate(a);
			this.setOpacity(1.0);
		};
		
		dockViews[i].deactivate = function(){
			var matrix = Ti.UI.create2DMatrix();
				matrix = matrix.scale(1,1);
			var a = Ti.UI.createAnimation({
				transform: matrix,
				duration: 250
			});
			
			this.animate(a);
			this.setOpacity(.75);
		};
	}
	
	for(var j=0; j<dockViews.length; j++){
		categoryDock.add(dockViews[j]);
	}
	
	//on launch, first category is active
	dockViews[0].activate();
	
	categoryDock.scrollCallback = function(e){
			var currentPageAsFloat = e.currentPageAsFloat - Math.trunc(Number(e.currentPageAsFloat));
			
			if(currentPageAsFloat > .75){
				dockViews[e.currentPage].setOpacity(currentPageAsFloat);
			}else if(currentPageAsFloat < .25){
				dockViews[e.currentPage].setOpacity(1 - currentPageAsFloat);
			}
	};
	
	categoryDock.scrollEndCallback = function(e){
		if(!e.source.nested){   							//This nested check prevents a vertical scrollend from calling this event and messing up the docks active index
			for(var k=0; k<dockViews.length; k++){
				if(k == e.currentPage){
					dockViews[k].activate();
				}else{
						dockViews[k].deactivate();
				}
			}
		}
	};
	
	return categoryDock;
}

module.exports = CategoryDock;