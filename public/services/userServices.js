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
 //User.checkUsername(regData);
  userFactory.checkUsername = function(regData){

     return $http.post('/api/checkusername',regData); //no need for "this.regData"
 }
 //User.checkEmail(regData);
  userFactory.checkEmail= function(regData){

     return $http.post('/api/checkemail',regData); //no need for "this.regData"
 }
 //User.activateAccount(token);
 userFactory.activateAccount= function(token){
     return  $http.put('/api/activate/'+token);
 }
 //User.checkCredentials(LoginData);
 userFactory.checkCredentials = function(loginData){

    return $http.post('/api/resend',loginData);

 }
  //User.resendLink(username);
  userFactory.resendLink = function(username){

    return $http.put('/api/resend',username);

 }

 return  userFactory;

});


}());