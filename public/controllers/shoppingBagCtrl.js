(function(){

var app = angular.module('shoppingBagController',['shopServices','authServices','userServices']);

app.config(function(){

    console.log("shoppingBagController loaded and intialized...");

});
app.controller('shoppingBagCtrl', function($scope,Shop,$window,Auth,User,$rootScope){

    $scope.shoppingBagShoes=[];
    $scope.individualTotals = [];
    $scope.total=false;
    $scope.grandTotal = false;
    $scope.oldtotal=false;
    $scope.hello = "hello";
    $scope.number;
    $scope.shippingChoice = 0;
   
    $scope.beginCheckout = false;
    $scope.shippingTime = false;
    $scope.couponCodeError = false;
    $scope.couponCodeAdded = false;
    $scope.totalWithShipping = false;
    $scope.currentUser; 
    $scope.totalaftercoupon = false;
    $scope.shoppingCartEmpty = false;
    $scope.newShoppingBagQty;
    console.log($scope.chooseShipping);
    console.log($scope.total);
    


   var changeTitle = function(){

        $rootScope.title ="HOJ | Shopping Bag";

    }
    changeTitle();


    $scope.hello= function(){
        console.log("hello");
    }

    $scope.addCouponCode = function(couponCode, valid){

        console.log(couponCode.code);
        $scope.grandTotal=0;
        if(couponCode.code == "ping"){ 
           // $scope.oldtotal = $scope.total;
            $scope.total = $scope.oldtotal - ($scope.oldtotal *0.1);
            $scope.couponCodeAdded = true;
            if($scope.beginCheckout){

                $scope.grandTotal = $scope.total + $scope.shippingChoice;

            }
            if(Auth.isLoggedIn()){

            
            User.addTotalToUser($scope.currentUser,$scope.total).then(function(data){
                console.log(data.data.user.totalaftercoupon);
                
                $scope.total = data.data.user.totalaftercoupon;
                $scope.totalaftercoupon = true;
                couponCode.code = "...";
            });
            }

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
                    console.log($scope.oldtotal);
                     

                });


        })

        

    }else if (window.localStorage.getItem('checkoutArray') !== null){
    $scope.shoppingBagShoes = JSON.parse($window.localStorage.getItem('checkoutArray'));

                         for(var i =0; i<$scope.shoppingBagShoes.length; i++){
                            $scope.individualTotals.push($scope.shoppingBagShoes[i].amt * $scope.shoppingBagShoes[i].price);
                           // $scope.shoppingBagShoes[i].invTotal= $scope.individualTotals[i];
                           console.log($scope.shoppingBagShoes[i].amt);

                            }
                         $scope.oldtotal=$scope.individualTotals.reduce(function(sum, value) {
                            return sum + value;

                        }, 0);
                        console.log($scope.individualTotals);
                        console.log($scope.oldtotal);
    }
    console.log($scope.shoppingBagShoes);

    Shop.getAllShoes().then(function(data){

        console.log(data.data.allshoes);


    });
   // $scope.shoppingBagShoes = JSON.parse($window.localStorage.getItem('checkoutArray'));
    console.log($scope.shoppingBagShoes);

    $scope.increaseQuantity = function(index,quantity){
        console.log(index,quantity);
        console.log($scope.shoppingBagShoes);
        console.log($scope.shoppingBagShoes[index]);
        console.log($scope.shoppingBagShoes[index].amt);
        //console.log($scope.newShoppingBagQty);
        console.log(Auth.isLoggedIn());
        if(Auth.isLoggedIn()){

        console.log('increase@!');
            User.addOneItem($scope.currentUser,index).then(function(data){

                console.log(data.data);
                console.log($scope.oldtotal);
                $scope.shoppingBagShoes[index].amt = data.data.user.shoppingbag[index].amt;
                $scope.oldtotal = $scope.oldtotal + Number($scope.shoppingBagShoes[index].price);

            }) 
        }else{
            if($scope.grandTotal && $scope.total){
                                            console.log("OY");
                                            $scope.oldtotal = $scope.oldtotal + $scope.shoppingBagShoes[index].price;
                                            $scope.total    = $scope.total + $scope.shoppingBagShoes[index].price;

                                            $scope.grandTotal = $scope.grandTotal+ $scope.shoppingBagShoes[index].price;
                                            $scope.shoppingBagShoes[index].amt++;
                                            $window.localStorage.setItem('checkoutArray',JSON.stringify($scope.shoppingBagShoes));
                                            //$scope.total = $scope.total + ($scope.shoppingBagShoes[index].amt * $scope.shoppingBagShoes[index].price);
                                            //$scope.oldtotal = $scope.oldtotal + ($scope.shoppingBagShoes[index].amt * $scope.shoppingBagShoes[index].price);
                                            //$scope.grandTotal = $scope.grandTotal + ($scope.shoppingBagShoes[index].amt * $scope.shoppingBagShoes[index].price);


                                        }else if($scope.grandTotal){
                                            console.log("grandTotal is truthy");
                                            $scope.oldtotal = $scope.oldtotal+ $scope.shoppingBagShoes[index].price;

                                            $scope.grandTotal = $scope.grandTotal+ $scope.shoppingBagShoes[index].price;
                                            $scope.shoppingBagShoes[index].amt++;
                                            $window.localStorage.setItem('checkoutArray',JSON.stringify($scope.shoppingBagShoes));                                            

                                        }else if($scope.total){
                                            console.log("total is true");
                                            $scope.oldtotal = $scope.oldtotal+ $scope.shoppingBagShoes[index].price;
                                            $scope.total = $scope.total +  $scope.shoppingBagShoes[index].price;

                                            
                                            $scope.shoppingBagShoes[index].amt++;
                                            $window.localStorage.setItem('checkoutArray',JSON.stringify($scope.shoppingBagShoes));

                                        }else{

                                            $scope.oldtotal = $scope.oldtotal-$scope.shoppingBagShoes[index].price;
                                            $scope.shoppingBagShoes[index].amt++
                                            $window.localStorage.setItem('checkoutArray',JSON.stringify($scope.shoppingBagShoes));

                                            //$scope.oldtotal= $scope.oldtotal +($scope.shoppingBagShoes[index].amt * $scope.shoppingBagShoes[index].price);
                                            console.log($scope.oldtotal);

                                        }
        }
    }
        $scope.reduceQuantity = function(index,quantity){

            console.log(quantity);
            console.log(index);
            console.log($scope.grandTotal);
            console.log($scope.total);
            console.log($scope.oldtotal);

            if(Auth.isLoggedIn()  && quantity >= 2){
                        console.log( $scope.shoppingBagShoes[index].amt);
                        $scope.total = $scope.total- $scope.shoppingBagShoes[index].price;

                        User.removeOneItem($scope.currentUser,index).then(function(data){
                            console.log(data.data);
                            $scope.shoppingBagShoes[index].amt = data.data.user.shoppingbag[index].amt;
                            console.log(data.data);

                        });

            }else if(Auth.isLoggedIn() && quantity <2){

                            console.log("Hello");
                            console.log($scope.oldtotal);
                            User.pullOneItem($scope.currentUser,index).then(function(data){

                                console.log(data.data.user.shoppingbag);
                                $scope.total = $scope.total-$scope.shoppingBagShoes[index].price;

                                $scope.shoppingBagShoes = data.data.user.shoppingbag;
                                
                                $rootScope.cartItems = $scope.shoppingBagShoes.length;

                            })


            }else if(Auth.isLoggedIn() && quantity === 1){
                            console.log("Hello");
                            User.pullOneItem($scope.currentUser,index).then(function(data){

                                console.log(data.data.user.shoppingbag);
                                $scope.shoppingBagShoes = data.data.user.shoppingbag;
                                $rootScope.cartItems = $scope.shoppingBagShoes.length; 
                                $scope.total = $scope.shoppingBagShoes[index].amt * $scope.shoppingBagShoes[index].price;

                               // $scope.oldtotal = 0;
                                })
                
                
                
                }else{
                            console.log("ELSEO!");
                            if(!Auth.isLoggedIn() && quantity == 1 ||!Auth.isLoggedIn() && quantity == 0){

                                                   // $scope.shoppingBagShoes = JSON.parse($window.localStorage.getItem('checkoutArray'));
                                                    console.log("shoppingBagShoes before Splice...");
                                                    console.log(JSON.stringify($scope.shoppingBagShoes));
                                                    console.log("HELLO!!!");
                                                    console.log(index);
                                                    //console.log($scope.oldtotal);
                                                    $scope.total = $scope.total - ($scope.shoppingBagShoes[index].amt * $scope.shoppingBagShoes[index].price);
                                                    $scope.oldtotal = $scope.oldtotal - ($scope.shoppingBagShoes[index].amt * $scope.shoppingBagShoes[index].price)
                                                    console.log($scope.oldtotal);
                                                    
                                                    $scope.shoppingBagShoes[index].amt--;
                                                    console.log($scope.shoppingBagShoes[index-1]);
                                                    console.log($scope.shoppingBagShoes[index]);
                                                    console.log($scope.shoppingBagShoes[index+1]);
                                                    
                                                    console.log(JSON.stringify($scope.shoppingBagShoes));
                                                    $scope.oldtotal = $scope.oldtotal - ($scope.shoppingBagShoes[index].amt * $scope.shoppingBagShoes[index].price)
                                                    $scope.shoppingBagShoes.splice(index,1);
                                                    console.log("shoppingBagShoes after Splice...");
                                                    console.log(JSON.stringify($scope.shoppingBagShoes));
                                                    $rootScope.cartItems = $scope.shoppingBagShoes.length;
                                                    $window.localStorage.setItem('checkoutArray', JSON.stringify($scope.shoppingBagShoes));

                            }else{
                                        console.log("TOTALITY!");

                                        if($scope.grandTotal && $scope.total){
                                            console.log("OY");
                                            $scope.oldtotal = $scope.oldtotal- $scope.shoppingBagShoes[index].price;
                                            $scope.total = $scope.total -  $scope.shoppingBagShoes[index].price;

                                            $scope.grandTotal = $scope.grandTotal- $scope.shoppingBagShoes[index].price;
                                            $scope.shoppingBagShoes[index].amt--;
                                            $window.localStorage.setItem('checkoutArray',JSON.stringify($scope.shoppingBagShoes));
                                            //$scope.total = $scope.total + ($scope.shoppingBagShoes[index].amt * $scope.shoppingBagShoes[index].price);
                                            //$scope.oldtotal = $scope.oldtotal + ($scope.shoppingBagShoes[index].amt * $scope.shoppingBagShoes[index].price);
                                            //$scope.grandTotal = $scope.grandTotal + ($scope.shoppingBagShoes[index].amt * $scope.shoppingBagShoes[index].price);


                                        }else if($scope.grandTotal){
                                            console.log("grandTotal is truthy");
                                            $scope.oldtotal = $scope.oldtotal- $scope.shoppingBagShoes[index].price;

                                            $scope.grandTotal = $scope.grandTotal- $scope.shoppingBagShoes[index].price;
                                            $scope.shoppingBagShoes[index].amt--;
                                            $window.localStorage.setItem('checkoutArray',JSON.stringify($scope.shoppingBagShoes));                                            

                                        }else if($scope.total){
                                            console.log("total is true");
                                            $scope.oldtotal = $scope.oldtotal- $scope.shoppingBagShoes[index].price;
                                            $scope.total = $scope.total -  $scope.shoppingBagShoes[index].price;

                                            
                                            $scope.shoppingBagShoes[index].amt--;
                                            $window.localStorage.setItem('checkoutArray',JSON.stringify($scope.shoppingBagShoes));

                                        }else{
                                                    console.log("Final Else");
                                                    console.log($scope.oldtotal);
                                                    $scope.oldtotal = $scope.oldtotal - ($scope.shoppingBagShoes[index].amt * $scope.shoppingBagShoes[index].price);
                                                    console.log($scope.oldtotal);
                                                    $scope.shoppingBagShoes[index].amt--;
                                                    console.log($scope.shoppingBagShoes);
                                                    $window.localStorage.setItem('checkoutArray',JSON.stringify($scope.shoppingBagShoes));
                                                    $scope.oldtotal = $scope.oldtotal + ($scope.shoppingBagShoes[index].amt * $scope.shoppingBagShoes[index].price);
                                                    console.log($scope.oldtotal);
                                                    //$scope.shoppingBagShoes = $window.localStorage.getItem('checkoutArray');
                                                    console.log($scope.shoppingBagShoes);
                                                    console.log($scope.shoppingBagShoes.length);
                                                    console.log($scope.individualTotals);
                                                    console.log($scope.individualTotals);
                                                    $scope.individualTotals =[];
                                        }
                            }

    

            }




    }

    $scope.clearShoppingBag = function(){
      
      if(Auth.isLoggedIn()){

      
        User.clearShoppingBag($scope.currentUser).then(function(data){

            console.log(data.data.success);
            $rootScope.cartItems=0;
            $scope.shoppingBagShoes = data.data.user.shoppingbag;
            $scope.shoppingCartEmpty = true;
            $scope.total =0;
            

        });
      }else{

        $scope.shoppingBagShoes = [];
        $window.localStorage.setItem('checkoutArray', JSON.stringify($scope.shoppingBagShoes));
        $scope.oldtotal=0;
        $scope.total = 0;

      }

    }
    $scope.removeOneItem = function(index){
        console.log(index);
        if(Auth.isLoggedIn()){

            User.pullOneItem($scope.currentUser,index).then(function(data){

            console.log(data.data.user.shoppingbag);
            $scope.shoppingBagShoes = data.data.user.shoppingbag;
            $rootScope.cartItems = $scope.shoppingBagShoes.length;


            })


        }else{
            $scope.shoppingBagShoes = JSON.parse($window.localStorage.getItem('checkoutArray'));
            console.log($scope.shoppingBagShoes);
            $scope.total = $scope.total - ( $scope.shoppingBagShoes[index].amt * $scope.shoppingBagShoes[index].price);
            console.log($scope.total);
            $scope.shoppingBagShoes.splice($scope.shoppingBagShoes[index],1);
            
            console.log($scope.shoppingBagShoes);
            $window.localStorage.setItem('checkoutArray',JSON.stringify($scope.shoppingBagShoes));
            $rootScope.cartItems = $scope.shoppingBagShoes.length;



        }


    }
    $scope.chooseShipping= function(number){
        if(number == 1){
            $scope.shippingChoice = 7.95;
            if(Auth.isLoggedIn()){
            User.addShippingChoiceToUser($scope.currentUser,"1-7 Days Expedited").then(function(data){

                console.log(data.data.user);

            });

            }else{

                 //$scope.shoppingBagShoes = JSON.parse($window.localStorage.getItem('checkoutArray'));
                 $window.localStorage.setItem('shippingChoice',7.95);


            }


        }else{
            $scope.shippingChoice = 15.00;
           
           if(Auth.isLoggedIn()){
            User.addShippingChoiceToUser($scope.currentUser,"2days Xpresspost").then(function(data){

                console.log(data.data.user);

            });

            }else{

                 //$scope.shoppingBagShoes = JSON.parse($window.localStorage.getItem('checkoutArray'));
                 $window.localStorage.setItem('shippingChoice',15.00);
                 


            }
        }
        
        console.log($scope.shippingChoice);
        console.log(number);
         getTotal();
    };
    //THIS MIGHT BE MESSED UP... MIGHT NEED TO UNCOMMENT;
/*
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
*/

    var getTotal = function(){
   
    
        console.log($scope.total);
        if($scope.total == 0){
            if($scope.beginCheckout){
                $scope.grandTotal= $scope.grandTotal - $scope.shippingChoice;
                $scope.total = $scope.oldtotal -($scope.oldtotal * 0.1);
                $scope.grandTotal = $scope.total + $scope.shippingChoice;
            }
            $scope.grandTotal = $scope.oldtotal + $scope.shippingChoice;
        }else{
            $scope.grandTotal = $scope.total + $scope.shippingChoice;
        }
        //$scope.grandTotal = $scope.total + $scope.shippingChoice;
        $window.localStorage.setItem('grandTotal', $scope.grandTotal);
        $scope.totalWithShipping = true;
        $scope.beginCheckout = true;
        
    }
   

    var addShipping = function(total,shippingChoice){
        
        var newTotal = total + shippingChoice;
        $window.localStorage.setItem('grandTotal', $scope.newTotal);



    }


});




}());