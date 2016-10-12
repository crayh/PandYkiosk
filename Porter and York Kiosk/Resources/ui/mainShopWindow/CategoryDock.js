/**
 * Displays the available product categories in the MainShopWindow
 * 
 * @author Cole Halverson
 */

function CategoryDock(args){
	
	var categoryDock = Ti.UI.createView({
		bottom: 0,
		width: Ti.UI.SIZE,
		height: '15%',
		opacity: 0.0,
		layout: 'horizontal',
		clipMode: Ti.UI.iOS.CLIP_MODE_DISABLED
	});
	
	function categoryDockPostLayoutCallback(){
		categoryDock.animate({opacity: 1.0, duration: 250});
	}
	categoryDock.addEventListener('postlayout', categoryDockPostLayoutCallback);
	
	var categoryViews = [];
	
	for (var i=0; i<args.categories.length; i++){
		
		categoryViews[i] = Titanium.UI.createView({
			left: 20,
			top: '15%',
			width: args.parentWidth * .10,
			height: '70%',
			backgroundColor: 'white',
			opacity: 0.75,
			index: i
		});
		//If last category, set right property on view
		if(i == args.categories.length -1){
			categoryViews[i].setRight(20);
		}
		
		categoryViews[i].addEventListener('singletap', function(e){
			args.scrollableView.scrollToView(e.source.index);
		});
		
		var label = Ti.UI.createLabel({
			text: args.categories[i]
		});
		
		categoryViews[i].add(label);
		
		categoryViews[i].activate = function(){
			var matrix = Ti.UI.create2DMatrix();
				matrix = matrix.scale(1.3,1.3);
			var a = Ti.UI.createAnimation({
				transform: matrix,
				duration: 250
			});
			this.animate(a);
			this.setOpacity(1.0);
		};
		
		categoryViews[i].deactivate = function(){
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
	
	for(var j=0; j<categoryViews.length; j++){
		categoryDock.add(categoryViews[j]);
	}
	
	//on launch, first category is active
	categoryViews[0].activate();
	
	categoryDock.scrollCallback = function(e){
			var currentPageAsFloat = e.currentPageAsFloat - Math.trunc(Number(e.currentPageAsFloat));
			
			if(currentPageAsFloat > .75){
				categoryViews[e.currentPage].setOpacity(currentPageAsFloat);
			}else if(currentPageAsFloat < .25){
				categoryViews[e.currentPage].setOpacity(1 - currentPageAsFloat);
			}
	};
	
	categoryDock.scrollEndCallback = function(e){
		if(!e.source.nested){   							//This nested check prevents a vertical scrollend from calling this event and messing up the docks active index
			for(var k=0; k<categoryViews.length; k++){
				if(k == e.currentPage){
					categoryViews[k].activate();
				}else{
					categoryViews[k].deactivate();
				}
			}
		}
	};
	
	return categoryDock;
}

module.exports = CategoryDock;