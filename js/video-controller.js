var videoApp = angular.module('videoApp', []);

//old syntax seems a bit too simple 
//function VideoCtrl($scope){

	
	/*$scope.header="I don't have time for Battlefield 4";
	$scope.blurb="I wish I did !";
	$scope.vidno="1";*/



//need to swap the video in depending on the video id given in the router...

	

//}



//alt syntax - 
//angular.module('videoCtrl', [videoModel])

 videoApp.controller('VideoCtrl', function($scope,$http) {
   
	$scope.header="Some poor Call Of Duty (COD) gameplay.";
	$scope.blurb="I find it weird how I can watch gameplay of others and in fact I find myself observing what I did during gameplay. Spotting areas of stupidity for example rushing at tanks with small arms.";

	$http.get('http://landed1.github.io/js/videoStore.json?cb='+new Date().getTime()).success(function(data) {
   		console.log('got videos loaded ok');
    	//$scope.videos = data;
  	});

   $scope.swapVideo=function($vid,$vidno,$header,$blurb){
		//alert("swap which video");
		//can I access the video player ?
		//alert(window.player);
		//console.log("loading"+riDUCw4BuMQ);
		var myPlayer=window.player;
		myPlayer.loadVideoById({'videoId': $vid});
		myPlayer.playVideo();

		//swap the text in.
		$scope.vidno=$vidno;
		$scope.header=$header;
		$scope.blurb=$blurb;

	};

  });



