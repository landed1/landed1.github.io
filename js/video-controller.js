var videoControllers = angular.module('videoControllers', []);


videoControllers.controller('VideoCtrl', function($scope,$http) {
	console.log('ini');
 	$scope.swapDisabled=true; //we didnt yet initialis and get the data properly yet : latency issues...

 	//set a defualt video for the initial load
 	$scope.ix=0;
   
	$scope.header="Some poor Call Of Duty (COD) gameplay.";
	$scope.blurb="I find it weird how I can watch gameplay of others and in fact I find myself observing what I did during gameplay. Spotting areas of stupidity for example rushing at tanks with small arms.";

	
	//$http.defaults.useXDomain = true;
	//delete $http.defaults.headers.common['X-Requested-With'];

	//$http.get('http://landed1.github.io/js/videoStore.json?cb='+new Date().getTime()).success(function(data) {
	$http.get('js/videoStore.json?cb='+new Date().getTime()).success(function(data) {
   		//console.log('got videos loaded ok');
    	$scope.videoObject = data;
    	$scope.thumb = "images/" + $scope.videoObject.videos[$scope.ix].thumb;

    	//now enable the swap video feed to be active...
    	for (var i = 3 - 1; i >= 0; i--) {
			//console.log("i = "+i);
			var s=$scope.videoObject.videos[i].thumb;
			$scope["thumbAlt"+i]=$scope.videoObject.videos[i].thumb.substring(0, s.length - 4);
		};

		//enable the click function(s)
		console.log("enabling");
		$scope.swapDisabled=false;

  	});

   $scope.swapVideoOld=function($vid,$vidno,$header,$blurb){
		var myPlayer=window.player;
		myPlayer.loadVideoById({'videoId': $vid});
		myPlayer.playVideo();
		$scope.vidno=$vidno;
		$scope.header=$header;
		$scope.blurb=$blurb;

	};

	$scope.swapVideo=function(which){

		if(!$scope.swapDisabled){

			var myPlayer=window.player;
			var particle=$scope.videoObject.videos[which];

			$scope.vidno=particle.vId;
			$scope.header=particle.title;
			$scope.blurb=particle.blurb;

			myPlayer.loadVideoById({'videoId': $scope.vidno});
			myPlayer.playVideo();
		}
		
	};

  });



