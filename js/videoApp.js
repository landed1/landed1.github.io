var videoApp = angular.module('videoApp', [
  'ngRoute',
  'videoControllers',
  'ngSanitize'
]);
 
videoApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/oauth2callback', {
        templateUrl: 'oauth2callback.html',
        controller: 'VideoCtrl'
      }).
      when('/login', {
        templateUrl: 'login.html',
        controller: 'AuthCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);



videoApp.factory('myPostService', function($http) {  
  var myPostService={

    async: function(url,leToken,leXml) {
      //console.log('post async function');
      //dev key for version 2 = AI39si63DgqpftpnvTv4DeHrCXa2dkDUV6-txA-7o2isewPSSg4DyYS6BpkW7SBiJmFuR_-4AF6QtxRW-c0M-3WnMiMXQJs7Sw
       var promise=$http({
            url: url,
            method: "POST",
            data: leXml,
            //headers: {'Content-Type': 'application/atom+xml','Authorization':' Bearer ' +leToken, 'Host': 'gdata.youtube.com', 'GData-Version':'2','X-GData-Key': 'key=AI39si63DgqpftpnvTv4DeHrCXa2dkDUV6-txA-7o2isewPSSg4DyYS6BpkW7SBiJmFuR_-4AF6QtxRW-c0M-3WnMiMXQJs7Sw'}
            headers: {'Content-Type': 'application/atom+xml','Authorization':' Bearer ' +leToken, 'GData-Version':'2','X-GData-Key': 'key=AI39si63DgqpftpnvTv4DeHrCXa2dkDUV6-txA-7o2isewPSSg4DyYS6BpkW7SBiJmFuR_-4AF6QtxRW-c0M-3WnMiMXQJs7Sw'}
        }).success(function(data) {
            if (!data.success) {console.log('error with posting comment '+data);} 
        });
      // Return the promise to the controller
      return promise;
    }
  };
  return myPostService;

});

videoApp.factory('myGetService', function($http) {  
  var myGetService = {
   
    async: function(url) {
       //console.log($http.defaults.headers);
      console.log("GET : "+url);
      // $http returns a promise, which has a then function, which also returns a promise
      var promise = $http.get(url).then(function (response) {
        // The then function here is an opportunity to modify the response
        //console.log(response);
        // The return value gets picked up by the then in the controller.
        return response.data;
      });
      // Return the promise to the controller
      return promise;
    }
  };
  return myGetService;
});

videoApp.factory('myAuthService', function($http,myGetService) {

  var myAuthService = {
   
    authorise: function(callback,type) {

            var client_id=encodeURI("client_id=77917340123.apps.googleusercontent.com&");
            var redirect_uri=encodeURI("redirect_uri=http://www.gamerdj.net.gridhosted.co.uk/lecallback.html&");
            //var redirect_uri="redirect_uri=http://www.gamerdj.net.gridhosted.co.uk/oauth2callback&";
            var scope=encodeURI("scope=https://www.googleapis.com/auth/youtube&");
            var response_type=encodeURI("response_type=token");
            str = "https://accounts.google.com/o/oauth2/auth?" + client_id + redirect_uri + scope + response_type
            //console.log(str);
            var win = window.open(str,"windowname1", 'width=800, height=600');

            window.addEventListener("message", receiveMessage, true);
            function receiveMessage(event){ 

              //console.log(event.origin+" : "+'http://gamerdj.net.gridhosted.co.uk')

              if(event.origin==='http://www.gamerdj.net.gridhosted.co.uk'){

                validateToken(event.data);

              }
                else{return}

            }
            

      function validateToken(token) {
                //https://developers.google.com/accounts/docs/OAuth2UserAgent#validatetoken
                myGetService.async('https://www.googleapis.com/oauth2/v1/tokeninfo?access_token='+token).then(function(d) {
               // console.log(d);/*d= {issued_to: "77917340123.apps.googleusercontent.com", audience: "77917340123.apps.googleusercontent.com", scope: "https://www.googleapis.com/auth/youtube", expires_in: 3600, access_type: "online"…}*/
                d.token=token; // as a convenience add the token so the controller can get it on the data returned.
                callback(d,type);
                //check audience matches my app id : 77917340123.apps.googleusercontent.com
                //($scope.data.issued_to == "77917340123.apps.googleusercontent.com" ? return true : return false);
                });
      }

    }

  };

  return myAuthService;
});

