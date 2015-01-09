$(function () {
	//console.log('ready');
	var containerWidth=$('#f4').parent().width();
	var offsetX = 57; //width of the image and padding needed.
	// height - at what height do you want the jet to have gone full width of the screen
	var ratioX= (containerWidth)/500;
	//console.log('container width is '+containerWidth+' , ratioX (width/height)'+ratioX);
	var jetStart = $("#f4").position().left;
	var y; //a value to get the current scroll position as an input

	var tempGlobalInput=360;

	//when will the jets nose touch the edge of the viewport ?
	//when jetX >= containerWidth


	//the following will work for mobile events
	/*$('body').on({
	    'touchmove': function(e) {
	    	$( ".debug" ).append( "<p>Touchmove</p>" );
	    	//console.log('touch move so mobile..');
	        //console.log($(this).scrollTop());
	        y= $(document).scrollTop();
	        fAnimatePlane(y);
	    }
	});*/

var fRotateShield=function(input){
	//console.log(input); // so we get values from say 0-250 we need a revolution now...
	var rotateDelta=250/360;
	var delta=input/rotateDelta;//-tempGlobalInput;
	//tempGlobalInput=tempGlobalInput*-1;

	TweenMax.to($('.iconFrame'), 1, {
	    rotationY:delta,
	    //transformOrigin:"left 50% -200"
	});
};
TweenLite.set($('.iconFrame'), {css:{transformPerspective:800, y:10}});
/*TweenMax.to($('.section1.row'), 1, {
    transformPerspective:200
});*/


//http://stackoverflow.com/questions/6316503/how-to-get-continuous-mousemove-event-when-using-android-mobile-browser
	$(window).scroll(function(e) {
		//e.preventDefault();
		//$( ".debug" ).append( "<p>normal scroll</p>" );
		 y= $(document).scrollTop();
		 fAnimatePlane(y);

		 //do spinoffs - maybe use a switch
		 if(y >= 250 && y<=500){
		 	//skew the values to more meaningful input
		 	//console.log(y);
			fRotateShield(y-250);
		}
	});


	var fAnimatePlane=function(input){
		
		var jetX = (input*ratioX)-offsetX;

		//console.log('input (y) is '+input+ 'but jetX is '+jetX +' containerWidth is '+containerWidth);
		
		if(input<=0){input=0}; //maybe should use jetX

		//console.log(y);
		var checkwidth = containerWidth-offsetX;

		if( jetX <= checkwidth){
			var f4 = $("f4");
			$("#f4").css({left:jetX});
		}
		if(jetX >= checkwidth){
			//swap in the explosion gif
			//console.log('explode');
		}

		/*if(jetX>=containerWidth){
			console.log(containerWidth);

		}*/
	}

/*var el = document.getElementById('singularBody');
    console.log(el);
el.addEventListener('onscroll',function(e){
	//console.log('e');
	return false;
},false);*/
});


