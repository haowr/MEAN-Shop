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
$scope.orders =[];
    Auth.getUser().then(function(data){

        console.log(data.data.username);
        $scope.whoisthis = data.data.username;
                   User.getUserProfile($scope.whoisthis).then(function(data){

        console.log(data.data.user);
        $scope.user = data.data.user;
        for(var i= 0; i<data.data.user.orders.length; i++){
            for(var j = 0; j< data.data.user.orders[i].length; j++){

                $scope.orders.push(data.data.user.orders[i][j]);
            }
            

        }
        

    });
console.log($scope.orders);

    });
 
    //console.log($scope.whoisthis);
    /*
*/
});



}());