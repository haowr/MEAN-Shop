(function(){

var app =  angular.module('checkoutController',[]);

app.config(function(){

console.log("checkoutController loaded and initialized...");

});

app.controller('checkoutCtrl', function($scope, $window){
    $scope.country="Canada";
    $scope.shoppingBagShoes=[];

       $scope.shoppingBagShoes = JSON.parse($window.localStorage.getItem('checkoutArray'));
    console.log($scope.shoppingBagShoes);


    $scope.selectCountry = function(number){
            console.log("button pressed");
            if(number === 1){
                $scope.country = "Canada";

            }else{
                $scope.country = "United States";

            }

    };



});




}());