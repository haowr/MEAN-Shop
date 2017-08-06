(function(){

var app =  angular.module('checkoutController',['shopServices']);

app.config(function(){

console.log("checkoutController loaded and initialized...");

});

app.controller('checkoutCtrl', function($scope, $window,Shop){
    $scope.country="Canada";
    $scope.shoppingBagShoes=[];
    $scope.grandTotal;
    $scope.errorMsg;
    $scope.shipPhase= false;
    $scope.addNewShippingAddress = false;
    $scope.checkoutDataa=[];
    $scope.shippingFormDataa=[];
    $scope.finalCheckoutData =[];
    $scope.invalid = false;
    $scope.addShippingAddressPhase = false;
    $scope.useBillingAddressSelected= false;
    $scope.finalCheckoutButton = false;
       $scope.shoppingBagShoes = JSON.parse($window.localStorage.getItem('checkoutArrayy'));
       $scope.grandTotal = Number($window.localStorage.getItem('grandTotal'));
    console.log($scope.shoppingBagShoes);
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
         $scope.finalCheckoutButton = true;


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
        }else{
            $scope.errorMsg = "Please properly complete form...";
            $scope.invalid = true;
        }


    };
    $scope.finalCheckout= function(){
        
              Shop.checkout($scope.finalCheckoutData).then(function(data){

                console.log(data.data);

            });

    };
    




});




}());