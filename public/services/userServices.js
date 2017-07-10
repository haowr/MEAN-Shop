console.log("userServices loaded");
(function(){

var app = angular.module('userServices',[]);

app.config(function(){

    console.log("testing services module");

});

app.factory('User', function($http){  //a way to organize the code..

 userFactory ={};

//User.create(regData);
 userFactory.create = function(regData){

     return $http.post('/api/users',regData); //no need for "this.regData"
 }

 return  userFactory;

});


}());