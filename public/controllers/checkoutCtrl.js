(function(){

var app =  angular.module('checkoutController',['shopServices','authServices','userServices']);

app.config(function(){

console.log("checkoutController loaded and initialized...");

});

app.controller('checkoutCtrl', function($scope, $rootScope,$window,Shop,Auth,User){
    $scope.country="Canada";
    $scope.expmonth = "Jan";
    $scope.expyear = "2017";
    $scope.alberta = .05;
    $scope.britishColumbia = .05;
    $scope.manitoba = .05;
    $scope.newBrunswick =.15;
    $scope.newFoundland = .15;
    $scope.nwT = .05;
    $scope.novaScotia = .05;
    $scope.nunavut = .05;
    $scope.ontario = .05;
    $scope.quebec = .05;
    $scope.pei = .05;
    $scope.saskatchewan = .05;
    $scope.yukon = 0.5;
    $scope.shoppingBagShoes=[];
   // $scope.grandTotal= $window.localStorage.getItem('grandTotal');
    $scope.errorMsg;
    $scope.shipPhase= false;
    $scope.addNewShippingAddress = false;
    $scope.checkoutDataa=[];
    $scope.shippingFormDataa=[];
    $scope.creditFormDataa = [];
    $scope.finalCheckoutData =[];
    $rootScope.finalCheckoutData =[];
    $scope.invalid = false;
    $scope.addShippingAddressPhase = false;
    $scope.showGrandTotal = false;
    $scope.orderItemsArray = [];
    $scope.orderItems;
    $scope.shoppingBagAmountsArray=[];
    $scope.useBillingAddressSelected= false;
    $scope.finalCheckoutButton = false;
    $scope.ccPhase = false;
    $scope.startCheckout = false;
    $scope.checkoutPhase = true;
    $scope.paymentLoading = false;

    $scope.creditCardDataAdded= false;

      var changeTitle = function(){

        $rootScope.title ="HOJ | Checkout";

    }
    changeTitle();

    if(Auth.isLoggedIn()){
        Auth.getUser().then(function(data){

            console.log(data.data.user);
            User.getUserProfile(data.data.username).then(function(data){

                console.log(data.data.user.totalaftercoupon);
                $scope.grandTotal = $window.localStorage.getItem('grandTotal');              
                 $scope.shoppingBagShoes = data.data.user.shoppingbag;
                for(var i = 0; i<$scope.shoppingBagShoes.length; i++){

                      $scope.shoppingBagAmountsArray.push(Number($scope.shoppingBagShoes[i].amt));


                }
                console.log($scope.shoppingBagAmountsArray);
                $scope.orderItems = $scope.shoppingBagAmountsArray.reduce(function(sum,value){

                    return sum + value;
                });
                console.log($scope.orderItems);
                //$scope.orderItems = 
            });
            //$scope.grandTotal = data.data.user.totalaftercoupon;
            //$scope.shoppingBagShoes = data.data.user.shoppingbag;

        })
        

    }else if (window.localStorage.getItem('checkoutArray') !== null){

        $scope.grandTotal = Number($window.localStorage.getItem('grandTotal'));
        $scope.shoppingBagShoes = JSON.parse($window.localStorage.getItem('checkoutArray'));
        console.log($scope.shoppingBagShoes.length);
        for(var i =0; i< $scope.shoppingBagShoes.length; i++ ){
            //console.log($scope.shoppingBagShoes[0].amt);
            $scope.orderItemsArray.push($scope.shoppingBagShoes[i].amt);

        }

        $scope.orderItems = $scope.orderItemsArray.reduce(function(sum,val){

                return sum+val;
        });

    }
      

       
       
       $scope.totalAfterTax;
       console.log($scope.shoppingBagShoes);

    
    $scope.startCheckoutFunc = function(){

        $scope.startCheckout = true;
    }

    $scope.selectCountry = function(number){

            console.log("button pressed");
            if(number === 1){
                $scope.country = "Canada";

            }else{
                $scope.country = "United States";

            }

    };
    $scope.selectExpYear = function(number){
            if(number === 1){
                $scope.expyear = "2017";

            }else if(number === 2){
                $scope.expyear = "2018";
            }else if(number === 3){
                $scope.expyear = "2019";
            }else if(number === 4){
                $scope.expyear = "2020";
            }else if(number === 5){
                $scope.expyear = "2021";
            }else if(number === 6){
                $scope.expyear = "2022";
            }else if(number === 7){
                $scope.expyear = "2023";
            }else if(number === 8){
                $scope.expyear ="2024";
            }else if(number === 9){
                $scope.expyear = "2025";
            }else if(number === 10){
                $scope.expyear = "2026";
            }else if(number === 11){
                $scope.expyear = "2027";
            }else if(number === 12){
                $scope.expyear = "2028";
            }else{
                $scope.expyear = "2029";
            }

    }
    $scope.selectExpMonth = function(number){
        if(number === 1){
                $scope.expmonth = "January";

            }else if(number === 2){
                $scope.expmonth = "February";
            }else if(number === 3){
                $scope.expmonth = "March";
            }else if(number === 4){
                $scope.expmonth = "April";
            }else if(number === 5){
                $scope.expmonth = "May";
            }else if(number === 6){
                $scope.expmonth = "June";
            }else if(number === 7){
                $scope.expmonth = "July";
            }else if(number === 8){
                $scope.expmonth ="August";
            }else if(number === 9){
                $scope.expmonth = "September";
            }else if(number === 10){
                $scope.expmonth = "October";
            }else if(number === 11){
                $scope.expmonth = "November";
            }else{
                $scope.expmonth = "December";
            }
    }
    $scope.addShippingAddress = function(){
        $scope.addNewShippingAddress = true;
        $scope.useBillingAddressSelected = false;
        
        console.log($scope.addNewShippingAddress);

    };
    $scope.useBillingAddress = function(){
         $scope.shippingFormDataa.push( $scope.checkoutDataa[0]);
         $scope.finalCheckoutData[0]= $scope.shippingFormDataa[0];
         $scope.finalCheckoutData[1]= $scope.checkoutDataa[0];
         $rootScope.finalCheckoutData[1]= $scope.checkoutDataa[0];
         console.log($scope.finalCheckoutData);
         $scope.useBillingAddressSelected = false;
        // $scope.finalCheckoutButton = true;
         $scope.ccPhase = true;
         $scope.addNewShippingAddressPhase = false;
         $scope.shipPhase = false;


    };
    $scope.shippingFunc= function(shippingFormData){

         $scope.shippingFormDataa.push(shippingFormData);
         $scope.finalCheckoutData[0]= $scope.shippingFormDataa[0];
         $scope.finalCheckoutData[1]= $scope.checkoutDataa[0];
         $rootScope.finalCheckoutData[1]= $scope.checkoutDataa[0];
         $scope.shipPhase = true;
         $scope.addNewShippingAddress = false;
         $scope.addNewShippingAddressPhase = true;
         $scope.finalCheckoutButton = true;
         $scope.useBillingAddressSelected = false;
         $scope.ccPhase = true;

    };

         /*Shop.checkout($scope.finalCheckoutData).then(function(data){

                console.log(data.data);

            });*/
    $scope.checkOutFunc = function(checkoutData,valid){
        console.log(checkoutData);
        console.log(valid);
        if(valid){
        $scope.checkoutDataa.push(checkoutData);
        $scope.shipPhase = true;
        $scope.invalid = false;
        $scope.useBillingAddressSelected = true;
        $scope.checkoutPhase = false;
        console.log(checkoutData.province);
        console.log($scope.grandTotal);
        $scope.grandTotal = Number($window.localStorage.getItem('grandTotal'));
        console.log($scope.grandTotal);
        if(checkoutData.province == "Alberta"){
            $scope.totalAfterTax =$scope.grandTotal + ( $scope.grandTotal * $scope.alberta);
            $scope.showGrandTotal=true;
            console.log($scope.alberta);
            console.log($scope.grandTotal);
            console.log($scope.totalAfterTax);
        }else if(checkoutData.province == "British Columbia"){
           
            $scope.totalAfterTax = $scope.grandTotal + ( $scope.grandTotal * $scope.britishColumbia);
            $scope.showGrandTotal=true;
            console.log($scope.totalAfterTax);
        }else if(checkoutData.province == "Saskatchewan"){
            $scope.totalAfterTax =$scope.grandTotal+ ( $scope.grandTotal * $scope.saskatchewan);
            $scope.showGrandTotal=true;
        }else if(checkoutData.province == "Manitoba"){
            $scope.totalAfterTax =$scope.grandTotal+ ( $scope.grandTotal * $scope.manitoba);
            $scope.showGrandTotal=true;
        }else if(checkoutData.province == "Quebec"){
            $scope.totalAfterTax =$scope.grandTotal+ ( $scope.grandTotal * $scope.quebec);
            $scope.showGrandTotal=true;
        }else if(checkoutData.province == "Ontario"){
            $scope.totalAfterTax =$scope.grandTotal+ ( $scope.grandTotal * $scope.ontario);
            $scope.showGrandTotal=true;
        }else if(checkoutData.province == "New Brunswick"){
            $scope.totalAfterTax =$scope.grandTotal+ ( $scope.grandTotal * $scope.newBrunswick);
            $scope.showGrandTotal=true;
        }else if(checkoutData.province == "Newfoundland"){
            $scope.totalAfterTax =$scope.grandTotal+ ( $scope.grandTotal * $scope.newFoundland);
            $scope.showGrandTotal=true;
        }else if(checkoutData.province == "Nova Scotia"){
            $scope.totalAfterTax =$scope.grandTotal+ ( $scope.grandTotal * $scope.novaScotia);
            $scope.showGrandTotal=true;
        }else {
            $scope.totalAfterTax =$scope.grandTotal+ ( $scope.grandTotal * $scope.nwT);
            $scope.showGrandTotal=true;
        }
        
        }else{
            $scope.errorMsg = "Please properly complete form...";
            $scope.invalid = true;
        }
    };
    $scope.addCreditCardFunc = function(creditData, valid){
        console.log(creditData);
        console.log(valid);
        creditData.grandTotal = $scope.grandTotal;
        if(valid){
            $scope.creditFormDataa.push(creditData)
            $scope.finalCheckoutData[2]= $scope.creditFormDataa[0];
            $rootScope.finalCheckoutData[2]= $scope.creditFormDataa[0];
            $scope.creditCardDataAdded= true;
            $scope.finalCheckoutButton= true;
            $scope.ccPhase = false;
        }{
            $scope.errorMsg = "Invalid Credit-Card Entry...";
        }
        

    };

    $scope.finalCheckout= function(){

        
             /* Shop.checkout($scope.finalCheckoutData).then(function(data){

                console.log(data.data);

            });*/
              Shop.stripeCheckout($scope.finalCheckoutData).then(function(data){
                    console.log(data.data.charge);

              });

    };
    




});




}());