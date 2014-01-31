var videoControllers = angular.module('videoControllers', []);


videoControllers.controller('VideoCtrl', function($scope,$http,myGetService,myAuthService,myPostService) {

  $scope.Gauth=false; //user flag set to indicate if the user has allowed access to Google during the session.

  $scope.SUBMIT_COMMENT="Login and Submit";

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
    if (!$scope.which) $scope.which =0; //default to 0 if unset
    if (!$scope.currentVideoId) $scope.currentVideoId=$scope.videoObject.videos[$scope.which].vId;

    //console.log('current video id is ' + $scope.currentVideoId);

    $scope.renderComments();

  	});
  
  $scope.fRefreshVideo=function(which){

      $scope.currentVideoId=$scope.videoObject.videos[which].vId;

  }
  $scope.renderComments=function(){

    console.log('render comments for '+ $scope.currentVideoId);

      myGetService.async('https://gdata.youtube.com/feeds/api/videos/'+ $scope.currentVideoId +'/comments?alt=json').then(function(d){
        //myGetService.async('https://gdata.youtube.com/feeds/api/videos/EOdYfekfh1U/comments?alt=json').then(function(d){
           //console.log(d.feed.entry);
           //if no comments we will need to provide a default comment or fallback..

          if(!d.feed.entry){
            //console.log('i reste the comments');
             $scope.comments=[];
           }else{
            $scope.comments=d.feed.entry;
           }
          
        if($scope.comments.length > 7)    $scope.comments.length=7;
      
      });


  }


  $scope.comment=function(){
    //console.log('custom form - run once [TODO need to block]');
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
    
    if (!$scope.which) $scope.which =0; //default to 0 if unset
    //if (!$scope.currentVideoId) $scope.which =0; 

    //console.log('current video id is '+$scope.videoObject.videos[$scope.which].vId);
    //todo - switch based on type for now we just have the one.
    //console.log($scope.commentText);
    //https://gdata.youtube.com/feeds/api/videos/ngeSUixDEyI/comments
    postXml='<?xml version="1.0" encoding="UTF-8"?><entry xmlns="http://www.w3.org/2005/Atom" xmlns:yt="http://gdata.youtube.com/schemas/2007"><content>' + $scope.commentText + '</content></entry>';
    //console.log(postXml);
    myPostService.async('https://gdata.youtube.com/feeds/api/videos/'+$scope.videoObject.videos[$scope.which].vId+'/comments',$scope.token,postXml).then(function (response) {
      // alert('promise');
      $scope.commentText="Your comment has been added - thanks.";
      //TODO - refresh the new comments so they can be seen.
    });
  }

	$scope.swapVideo=function(which){

    //todo - update the comments too !
    $scope.which=which;
    $scope.fRefreshVideo(which);
    $scope.renderComments();

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



