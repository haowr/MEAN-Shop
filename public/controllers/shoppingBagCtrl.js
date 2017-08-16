(function(){

var app = angular.module('shoppingBagController',['shopServices','authServices','userServices']);

app.config(function(){

    console.log("shoppingBagController loaded and intialized...");

});
app.controller('shoppingBagCtrl', function($scope,Shop,$window,Auth,User,$rootScope){

    $scope.shoppingBagShoes=[];
    $scope.individualTotals = [];
    $scope.total;
    $scope.hello = "hello";
    $scope.number;
    $scope.shippingChoice = 0;
    $scope.grandTotal;
    $scope.couponCodeError = false;
    $scope.currentUser;
    $scope.totalaftercoupon = false;
    $scope.shoppingCartEmpty = false;
    console.log("Hello");
    $scope.hello= function(){
        console.log("hello");
    }

    $scope.addCouponCode = function(couponCode, valid){

        console.log(couponCode.code);
        if(couponCode.code == "ping"){

            $scope.oldtotal = $scope.oldtotal - ($scope.oldtotal *0.1);
            User.addTotalToUser($scope.currentUser,$scope.oldtotal).then(function(data){
                console.log(data.data.user.totalaftercoupon);
                $scope.total = data.data.user.totalaftercoupon;
                $scope.oldtotal = data.data.user.totalaftercoupon;
                $scope.totalaftercoupon = true;
                couponCode.code = "...";
            });

        }else{

            $scope.couponCodeError = true;
            console.log($scope.couponCodeError );
        }
        console.log(valid);
    }


    if(Auth.isLoggedIn()){

        Auth.getUser().then(function(data){
                 $scope.currentUser = data.data.username;
                 User.getShoppingBag(data.data.username).then(function(data){

                     console.log(data.data.user.shoppingbag);
                     $scope.shoppingBagShoes = data.data.user.shoppingbag;

                     $rootScope.cartItems = data.data.user.shoppingbag.length;
                     for(var i =0; i<$scope.shoppingBagShoes.length; i++){
                            $scope.individualTotals.push($scope.shoppingBagShoes[i].amt * $scope.shoppingBagShoes[i].price);
                           // $scope.shoppingBagShoes[i].invTotal= $scope.individualTotals[i];
                           console.log($scope.shoppingBagShoes[i].amt);

                    }
                    $scope.oldtotal=$scope.individualTotals.reduce(function(sum, value) {
                         return sum + value;

                     }, 0);
                    console.log($scope.individualTotals);
                    console.log($scope.total);
                     

                });


        })

        

    }else{
    $scope.shoppingBagShoes = JSON.parse($window.localStorage.getItem('checkoutArray'));
    }
    console.log($scope.shoppingBagShoes);
    Shop.getAllShoes().then(function(data){

        console.log(data.data.allshoes);


    });
   // $scope.shoppingBagShoes = JSON.parse($window.localStorage.getItem('checkoutArray'));
    console.log($scope.shoppingBagShoes);

    $scope.clearShoppingBag = function(){

        User.clearShoppingBag($scope.currentUser).then(function(data){

            console.log(data.data.success);
            $rootScope.cartItems=0;
            $scope.shoppingBagShoes = data.data.user.shoppingbag;
            $scope.shoppingCartEmpty = true;
            

        });

    }
    $scope.removeOneItem = function(index){
        console.log(index);
        User.removeOneItem($scope.currentUser,index).then(function(data){

            console.log(data.data.user.shoppingbag);
            $scope.shoppingBagShoes = data.data.user.shoppingbag;
            $rootScope.cartItems = $scope.shoppingBagShoes.length;


        })

    }
    $scope.chooseShipping= function(number){
        if(number == 1){
            $scope.shippingChoice = 7.95;
            if(Auth.isLoggedIn()){
            User.addShippingChoiceToUser($scope.currentUser,"1-7 Days Expedited").then(function(data){

                console.log(data.data.user);

            });

            }

        }else{
            $scope.shippingChoice = 15.00;
           if(Auth.isLoggedIn()){
            User.addShippingChoiceToUser($scope.currentUser,"1-7 Days Expedited").then(function(data){

                console.log(data.data.user);

            });

            }
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