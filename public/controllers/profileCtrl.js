(function(){

var app = angular.module('profileController', ['userServices','heartServices', 'shopServices','authServices',]);

app.config(function(){
    console.log("profile controller loaded and initialized...");
})

app.controller('profileCtrl',function(Shop,Auth,User,$scope){
/*
var names = 
Shop.getMensShoe()
*/

 $scope.user ;
 $scope.whoisthis;

    Auth.getUser().then(function(data){

        console.log(data.data.username);
        $scope.whoisthis = data.data.username;
                   User.getUserProfile($scope.whoisthis).then(function(data){

        console.log(data.data.user);
        $scope.user = data.data.user;
        $scope.orders = data.data.user.orders[0];

    });


    });
 
    //console.log($scope.whoisthis);
    /*
*/
});



}());