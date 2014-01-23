var videoApp = angular.module('videoApp', [
  'ngRoute',
  'videoControllers'
]);
 
videoApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/notauthorised', {
        templateUrl: 'partials/phone-list.html',
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