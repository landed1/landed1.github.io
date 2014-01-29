var videoControllers = angular.module('videoControllers', []);

videoControllers.controller('AuthCtrl', ['$scope', '$routeParams','myGetService','myPostService',
  function($scope, $routeParams, myGetService, myPostService) {

  	//alert("helo");

   /* var authenticate=function(){
      alert('authenticate in AuthCtrl'+Notify);
    };*/

    var client_id=encodeURI("client_id=77917340123.apps.googleusercontent.com&");
  	var redirect_uri=encodeURI("redirect_uri=http://www.gamerdj.net.gridhosted.co.uk/callback.html&");
  	//var redirect_uri="redirect_uri=http://www.gamerdj.net.gridhosted.co.uk/oauth2callback&";
  	var scope=encodeURI("scope=https://www.googleapis.com/auth/youtube&");
  	var response_type=encodeURI("response_type=token");
  	str = "https://accounts.google.com/o/oauth2/auth?" + client_id + redirect_uri + scope + response_type
  	//console.log("login to "+str);
  	var win = window.open(str,"windowname1", 'width=800, height=600');


  	var pollTimer   =   window.setInterval(function() { 
  		//console.log('poll '+win.document.URL);
                            try {
                                //console.log('trying');
                                if (win.document.URL.indexOf("callback.html") != -1) {
                                	//console.log(win.document.URL+ " and " +win.document.URL.indexOf("callback.html"));
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
                            } catch(e) {}
                        }, 100);

          function validateToken(token) {
            
            //https://developers.google.com/accounts/docs/OAuth2UserAgent#validatetoken
            myGetService.async('https://www.googleapis.com/oauth2/v1/tokeninfo?access_token='+token).then(function(d) {
            //console.log(d);/*d= {issued_to: "77917340123.apps.googleusercontent.com", audience: "77917340123.apps.googleusercontent.com", scope: "https://www.googleapis.com/auth/youtube", expires_in: 3600, access_type: "online"…}*/
            
            //check audience matches my app id : 77917340123.apps.googleusercontent.com
            //($scope.data.issued_to == "77917340123.apps.googleusercontent.com" ? return true : return false);

            });

          }

          function getTokenFromString(str){

            var fStr=str.split("&");
            var sStr=fStr[0].split("#");
            var t=sStr[1].split("=")[1];
            return t;
          }


  }]);

/*videoControllers.controller('CommentsCtrl',['$scope', 'myGetService',
	function($scope,myGetService){
		// /alert('loading comments');

     
  }
	

]);*/


videoControllers.controller('VideoCtrl', function($scope,$http,myGetService,myAuthService,myPostService) {

  $scope.Gauth=false; //user flag set to indicate if the user has allowed access to Google during the session.

  $scope.SUBMIT_COMMENT="Login aand Submit";

 	$scope.swapDisabled=true; //we didnt yet initialise and get the data properly yet : latency issues...
 	
 	$scope.ix=0; //set a defualt video for the initial load
   
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

    //get the comments
     myGetService.async('https://gdata.youtube.com/feeds/api/videos/ngeSUixDEyI/comments?alt=json').then(function(d){
          // console.log(d.feed.entry);
          $scope.comments=d.feed.entry;
      });

  	});


  $scope.comment=function(){
    console.log('custom form - run once [TODO need to block]');
    $scope.comment=null; // quick maybe decent hack blocking button after first use.
    //check to see if user has already authorised - this will be useful all over
    if( ! $scope.Gauth){
        myAuthService.authorise($scope.authorisedDone,'comment'); //will deal with saving user agreement later not sure how this is handled.
    }
    else{
        //we should already have a token to use from previous - [TODO]
    }
  }



  $scope.authorisedDone=function(leData,type){
    //console.log('auth done ready to continue, type was '+type);
    //console.log(leData);
    $scope.token=leData.token;
    $scope.Gauth=true;
    console.log($scope.videoObject.videos[0].vId);
    //todo - switch based on type for now we just have the one.
    //console.log($scope.commentText);
    myPostService.async('https://gdata.youtube.com/feeds/api/videos/'+$scope.videoObject.videos[0].vId+'/comments?alt=json',$scope.token);
    /*.then(function(d){
          // success ? 
      });*/
    //so all what we want to do is set the token on the scope to get it from anywhere...so that any controller can use it for needs.
  }

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



