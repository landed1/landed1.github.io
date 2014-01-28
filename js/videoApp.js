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



videoApp.factory('myService', function($http) {  
  var myService = {
    async: function() {
      // $http returns a promise, which has a then function, which also returns a promise
      var promise = $http.get('test.json').then(function (response) {
        // The then function here is an opportunity to modify the response
        console.log(response);
        // The return value gets picked up by the then in the controller.
        return response.data;
      });
      // Return the promise to the controller
      return promise;
    }
  };
  return myService;
});