(function(){

var app =  angular.module('checkoutController',['shopServices','angularPayments']);

app.config(function(){

console.log("checkoutController loaded and initialized...");

});

app.controller('checkoutCtrl', function($scope, $window,Shop){
    $scope.country="Canada";
    $scope.expmonth = "Jan";
    $scope.expyear = "2017";
    $scope.shoppingBagShoes=[];
    $scope.grandTotal;
    $scope.errorMsg;
    $scope.shipPhase= false;
    $scope.addNewShippingAddress = false;
    $scope.checkoutDataa=[];
    $scope.shippingFormDataa=[];
    $scope.creditFormDataa = [];
    $scope.finalCheckoutData =[];
    $scope.invalid = false;
    $scope.addShippingAddressPhase = false;
    $scope.useBillingAddressSelected= false;
    $scope.finalCheckoutButton = false;
    $scope.ccPhase = false;
    $scope.checkoutPhase = true;
    $scope.creditCardDataAdded= false;
       $scope.shoppingBagShoes = JSON.parse($window.localStorage.getItem('checkoutArrayy'));
       $scope.grandTotal = Number($window.localStorage.getItem('grandTotal'));
    console.log($scope.shoppingBagShoes);
   /* var stripe = Stripe('pk_test_aE3UDuxFXzcslBrNanFIIi6Q');
    console.log(stripe);
    //$scope.formName.inputName.$card=[];
*/
    var getTotal = function(){


        
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
        
        }else{
            $scope.errorMsg = "Please properly complete form...";
            $scope.invalid = true;
        }
    };
    $scope.addCreditCardFunc = function(creditData, valid){
        console.log(creditData);
        if(valid){
            $scope.creditFormDataa.push(creditData)
            $scope.finalCheckoutData[2]= $scope.creditFormDataa[0];
            $scope.creditCardDataAdded= true;
            $scope.finalCheckoutButton= true;
            $scope.ccPhase = false;
        }{
            $scope.errorMsg = "Invalid Credit-Card Entry...";
        }
        

    };

    $scope.finalCheckout= function(){
        $ccFormReqValidation = $('#ccFormReqValidation');
        console.log($ccFormReqValidation);
        
              Shop.checkout($scope.finalCheckoutData).then(function(data){

                console.log(data.data);

            });

    };
    




});




}());