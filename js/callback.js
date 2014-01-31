/*var callbackControllers = angular.module('callbackControllers', []);

var callbackFactory.factory('myFactory', 
  function() { alert("running callback controller function") }
  );

callbackControllers.controller('CallbackCtrl', function($scope,$http) {

    
   	$scope.ix=0; //set a defualt video for the initial load 
  	$scope.header="";
  

  });*/

function CallbackCtrl($scope) {
  console.log(window.document.URL);
  vUrl=window.document.URL;

  if (vUrl.indexOf("callback.html") != -1) {

  window.close();

}





};

function getTokenFromString(str){

              var fStr=str.split("&");
              var sStr=fStr[0].split("#");
              var t=sStr[1].split("=")[1];
              return t;
}

function validateToken(token) {
               
}