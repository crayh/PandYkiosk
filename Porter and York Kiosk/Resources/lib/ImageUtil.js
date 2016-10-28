/**
 *  Utility for manipulating images
 * 
 *  @author Cole Halverson
 */

exports.assertSquare = function(blob){
	
	if(blob.height > blob.width){
		blob = blob.imageAsCropped({height: blob.width});
	}else if(blob.width > blob.height){
		blob = blob.imageAsCropped({width: blob.height});
	}
	
	return blob;
};
