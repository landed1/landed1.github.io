$(function () {
	//console.log('ready');
	var containerWidth=$('#f4').parent().width();
	var offsetX = 57; //width of the image and padding needed.
	var ratioX= (containerWidth)/500;
	console.log('ratioX (width/height)'+ratioX);
	var jetStart = $("#f4").position().left;
	//console.log(ratioX);

	$(window).scroll(function(e) {
		var y= $(document).scrollTop();
		
		//console.log('start x is '+jetStart);
		
		if(y<=0){y=0};

		//console.log(y);


		if( y <= containerWidth){
			//console.log('start to move jet now');
			var f4 = $("f4");
			//var jetX =(jetStart-(200/ratioX)+y)/ratioX; 
			var jetX = (y*ratioX)-offsetX; 

			//if the height is 200 then we need to advance by width /200 each pixel ?

			$("#f4").css({left:jetX});

			//$("f4").offset({left: y})
		}
});

/*var el = document.getElementById('singularBody');
    console.log(el);
el.addEventListener('onscroll',function(e){
	//console.log('e');
	return false;
},false);*/
});


