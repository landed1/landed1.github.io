var videoControllers = angular.module('videoControllers', []);

videoControllers.controller('AuthCtrl', ['$scope', '$routeParams','myService',
  function($scope, $routeParams, myService) {

  	//alert("helo");

    var client_id=encodeURI("client_id=77917340123.apps.googleusercontent.com&");
  	var redirect_uri=encodeURI("redirect_uri=http://www.gamerdj.net.gridhosted.co.uk/callback.html&");
  	//var redirect_uri="redirect_uri=http://www.gamerdj.net.gridhosted.co.uk/oauth2callback&";
  	var scope=encodeURI("scope=https://www.googleapis.com/auth/youtube&");
  	var response_type=encodeURI("response_type=token");
  	str = "https://accounts.google.com/o/oauth2/auth?" + client_id + redirect_uri + scope + response_type
  	console.log("login to "+str);
  	var win = window.open(str,"windowname1", 'width=800, height=600');


  	var pollTimer   =   window.setInterval(function() { 
  		//console.log('poll '+win.document.URL);
                try {
                    //console.log('trying');
                    if (win.document.URL.indexOf("callback.html") != -1) {
                    	//console.log(win.document.URL);
                    	//console.log(win);
                    	
                    	//#access_token=ya29.1.AADtN_VF0lVfakRQj6fehwsxr_s4RVVFnWH73O5YWK0hBWjt_EG_oI75WYOT5c1I&token_type=Bearer&expires_in=3600
                     
                        //var myToken=;
                      
                        validateToken(getTokenFromString(win.document.URL));

                        window.clearInterval(pollTimer);
                        //var url =   win.document.URL;
                        //console.log(url);
                        //acToken =   gup(url, 'access_token');
                        //tokenType = gup(url, 'token_type');
                        //expiresIn = gup(url, 'expires_in');
                        win.close();
                    }
                } catch(e) {
                }
            }, 100);
        

          function validateToken(token) {
            //https://developers.google.com/accounts/docs/OAuth2UserAgent#validatetoken
            myService.async('https://www.googleapis.com/oauth2/v1/tokeninfo?access_token='+token).then(function(d) {
              //console.log(d);/*d= {issued_to: "77917340123.apps.googleusercontent.com", audience: "77917340123.apps.googleusercontent.com", scope: "https://www.googleapis.com/auth/youtube", expires_in: 3600, access_type: "online"…}*/
            $scope.data = d;
          });
			    // console.log(token);
        }


        function getTokenFromString(str){

          var fStr=str.split("&");
          var sStr=fStr[0].split("#");
          var t=sStr[1].split("=")[1];
          return t;
          //console.log();

        }


  }]);

videoControllers.controller('CommentsCtrl',['$scope','$routeParams',
	function($scope,$routeParams){
		// /alert('loading comments');
	}
]);


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



