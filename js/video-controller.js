var videoControllers = angular.module('videoControllers', []);


videoControllers.controller('AuthCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {

    var client_id=encodeURI("client_id=77917340123.apps.googleusercontent.com&");
  	var redirect_uri=encodeURI("redirect_uri=http://landed1.github.io/oauth2callback.html&");
  	var scope=encodeURI("scope=https://www.googleapis.com/auth/youtube&");
  	var response_type=encodeURI("response_type=token");
  	str = "https://accounts.google.com/o/oauth2/auth?" + client_id + redirect_uri + scope + response_type
  	//window.open(str);
  }]);


videoControllers.controller('VideoCtrl', function($scope,$http) {

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
		
		$scope.swapDisabled=false;

  	});


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



