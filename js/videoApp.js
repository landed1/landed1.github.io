var videoApp = angular.module('videoApp', [
  'ngRoute',
  'videoControllers'
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

    async: function(url,leToken) {
      //console.log('post async function');
       $http({
            url: url,
            method: "POST",
            data: "",
            headers: {'Content-Type': 'JSON','Bearer':leToken}
        }).success(function(data) {
            console.log('data '+data);

            if (!data.success) {
              // if not successful, bind errors to error variables
                $scope.errorName = data.errors.name;
                $scope.errorSuperhero = data.errors.superheroAlias;
            } else {
              // if successful, bind success message to message
                $scope.message = data.message;
            }
        });

        //do more...or will the above send ?
      // Return the promise to the controller
      //return promise;
    }
  };
  return myPostService;

});

videoApp.factory('myGetService', function($http) {  
  var myGetService = {
   
    async: function(url) {
       //console.log($http.defaults.headers);
      //console.log("GET : "+url);
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
                            if (win.document.URL.indexOf("callback.html") != -1) {
                              //console.log(win.document.URL+ " and " +win.document.URL.indexOf("callback.html"));
                              //#access_token=ya29.1.AADtN_VF0lVfakRQj6fehwsxr_s4RVVFnWH73O5YWK0hBWjt_EG_oI75WYOT5c1I&token_type=Bearer&expires_in=3600
                              //var myToken=;
                             
                              var tok=getTokenFromString(win.document.URL);
                              validateToken(tok);
                              //console.log(validateToken);
                              //validateToken();
                              window.clearInterval(pollTimer);
                              win.close();
                            }
                        } catch(e) {
                        }
            }, 100);

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

      function getTokenFromString(str){

              var fStr=str.split("&");
              var sStr=fStr[0].split("#");
              var t=sStr[1].split("=")[1];
              return t;
      }

    }

  };



  return myAuthService;
});

videoApp.factory('Notify',function(){

return {message:"saadsasd"};

});