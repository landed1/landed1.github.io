var videoApp = angular.module('videoApp', [
  'ngRoute',
  'videoControllers'
]);
 
/*videoApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/notauthorised', {
        templateUrl: 'partials/phone-list.html',
        controller: 'VideoCtrl'
      }).
      when('/phones/:phoneId', {
        templateUrl: 'partials/phone-detail.html',
        controller: 'VideoCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);*/
