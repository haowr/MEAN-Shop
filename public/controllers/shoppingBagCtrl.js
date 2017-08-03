(function(){

var app = angular.module('shoppingBagController',['shopServices']);

app.config(function(){

    console.log("shoppingBagController loaded and intialized...");

});
app.controller('shoppingBagCtrl', function($scope,Shop,$window){

    $scope.shoppingBagShoes=[];
    $scope.hello = "hello";
    console.log("Hello");

    $scope.shoppingBagShoes = JSON.parse($window.localStorage.getItem('checkoutArray'));
    console.log($scope.shoppingBagShoes);
    Shop.getAllShoes().then(function(data){

        console.log(data.data.allshoes);


    });
    $scope.shoppingBagShoes = JSON.parse($window.localStorage.getItem('checkoutArray'));
    console.log($scope.shoppingBagShoes);



});




}());