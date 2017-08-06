(function(){

var app = angular.module('shoppingBagController',['shopServices']);

app.config(function(){

    console.log("shoppingBagController loaded and intialized...");

});
app.controller('shoppingBagCtrl', function($scope,Shop,$window){

    $scope.shoppingBagShoes=[];
    $scope.individualTotals = [];
    $scope.total;
    $scope.hello = "hello";
    $scope.number;
    $scope.shippingChoice = 0;
    $scope.grandTotal;

    console.log("Hello");
    $scope.hello= function(){
        console.log("hello");
    }

    $scope.shoppingBagShoes = JSON.parse($window.localStorage.getItem('checkoutArray'));
    console.log($scope.shoppingBagShoes);
    Shop.getAllShoes().then(function(data){

        console.log(data.data.allshoes);


    });
    $scope.shoppingBagShoes = JSON.parse($window.localStorage.getItem('checkoutArray'));
    console.log($scope.shoppingBagShoes);

    $scope.chooseShipping= function(number){
        if(number == 1){
            $scope.shippingChoice = 7.95;
        }else{
            $scope.shippingChoice = 15.00;
        }
        
        console.log($scope.shippingChoice);
        console.log(number);
         getTotal();
    };
         for(var i =0; i<$scope.shoppingBagShoes.length; i++){
                $scope.individualTotals.push($scope.shoppingBagShoes[i].amt * $scope.shoppingBagShoes[i].price);
                $scope.shoppingBagShoes[i].invTotal= $scope.individualTotals[i];

        }
    console.log($scope.individualTotals);
    console.log($scope.shoppingBagShoes);
    $window.localStorage.setItem('checkoutArrayy',JSON.stringify($scope.shoppingBagShoes));
          //$scope.total= $scope.individualTotals.r
          $scope.total=$scope.individualTotals.reduce(function(sum, value) {
            return sum + value;

        }, 0);
    var getTotal = function(){
   
    
        console.log($scope.total);
        $scope.grandTotal = $scope.total + $scope.shippingChoice;
        $window.localStorage.setItem('grandTotal', $scope.grandTotal);
        
    }
   

    var addShipping = function(total,shippingChoice){
     
        var newTotal = total + shippingChoice;



    }


});




}());