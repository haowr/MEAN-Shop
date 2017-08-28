(function(){


    var app = angular.module('shop-directives', ['shopServices','authServices','userServices',]);

    app.directive('funcWrapper',function(){

        return{
            restrict: 'A',
            scope:{


            }
        }


    })

    app.directive('galleryZoom', function(){
        return{
             restrict: 'A',
             
             link: function(elem){

                  //$(elem).elevateZoom();
                 $('.specificmainzoom').panzoom();
                 $('.specificmainzoom').panzoom("zoom");
                 //$(".specificmainzoom").panzoom({
 // minScale: 2,
 // maxScale:4,
 // $zoomRange: $("input[type='range']")
//});

             }
        }
       



    });
        app.directive('zoomButton', function(){
        return{
             restrict: 'A',
             
             link: function(elem){

var $section = $('.mainshoeview');
          var $panzoom = $section.find('.specificmainzoom').panzoom({
            $zoomIn: $(elem),
            $zoomOut: $section.find(".zoom-out"),
           // $zoomRange: $section.find(".zoom-range"),
            $reset: $section.find(".reset"),
            startTransform: 'scale(0.9)',
            maxScale: 0.9,
            increment: 0.1,
            contain: true
          }).panzoom('zoom', true);
/*
                  //$(elem).elevateZoom();
                $('.mainshoeviewzoom').panzoom();
                 $('.mainshoeviewzoom').panzoom("zoom");
                 $(".mainshoeviewzoom").panzoom({
  minScale: 6,
 maxScale:6,
 $zoomRange: $("input[type='range']")
});
*/

             }
        }
       



    });


    app.directive('stripeCheckoutJquery',function(Auth,Shop,User,$location,$window,$timeout,$rootScope){

        return{
            restrict: 'A',
            require:'form',
            scope: {
                'addCreditCardFunc': '&',
                'finalCheckoutData':'=',
                'totalAfterTax': '=',
                'paymentLoading': '='
            },
            link: function(scope,elem,attrs,formCtrl, $rootScope){
                //On click
                console.log(formCtrl);
                $(elem).submit(function(event){
                    Stripe.setPublishableKey('pk_test_aE3UDuxFXzcslBrNanFIIi6Q');
                    $('#charge-error').addClass('hidden');
                    console.log($('#card-number').val());
                    $(elem).find('button').prop('disabled', true);
                    scope.paymentLoading = true;
                    Stripe.card.createToken({
                        /*number: $(elem).find('#card-number').val(),
                        cvc: $(elem).find('#card-cvc').val(),
                        exp_month: $(elem).find('#card-expiration-month').val(),
                        exp_year: $(elem).find('#card-expiration-year').val(),
                        name: $(elem).find('#card-name').val()
                        */
                        
                     number: "4242 4242 4242 4242",
                       cvc: $(elem).find('#card-cvc').val(),
                        exp_month: $(elem).find('#card-expiration-month').val(),
                        exp_year: $(elem).find('#card-expiration-year').val(),
                        name: $(elem).find('#card-name').val()
 
                        
                    }, stripeResponseHandler);
                    return false;

                    function stripeResponseHandler(status, response){

                        if (response.error) { // Problem!

                            // Show the errors on the form
                        $('#charge-error').text(response.error.message);
                        $('#charge-error').removeClass('hidden');
                        $(elem).find('button').prop('disabled', false); // Re-enable submission

                        } else { // Token was created!

                        // Get the token ID:
                        var token = response.id;
                        console.log(token);

                        // Insert the token into the form so it gets submitted to the server:
                        $(elem).append($('<input type="hidden" name="stripeToken" />').val(token));
                        //return false;
                        // Submit the form:
                        console.log(elem);
                        console.log(elem.length);
                        console.log(elem[0]);
                        console.log(elem[0].assignedSlot);
                        console.log(elem[0][0].value)
                        console.log(elem[0][1].value);
                        console.log(elem[0][2].value);
                        console.log(elem[0][3].value);
                        console.log(elem[0][4].value);
                        console.log(elem[0][6].value);
                        console.log(scope.finalCheckoutData);
                        console.log(scope.totalAfterTax );
                        console.log(scope.totalAfterTax * 100);
                        var ccData = {
                            cardname: elem[0][0].value,
                            stripeToken: elem[0][6].value,
                            grandTotal: (scope.totalAfterTax*100).toFixed(0)

                        };
                        var checkoutData = scope.finalCheckoutData;
                        checkoutData.push(ccData);
                        console.log(checkoutData);
                        Shop.stripeCheckout(checkoutData).then(function(data){
                                console.log(data.data);
                                console.log(data.data.message);
                                console.log(data.data.charge);
                                if(data.data.success == true){

                                    
                                        Shop.checkout(checkoutData).then(function(data){

                                            console.log(data.data);
                                            console.log(data.data.message);
                                            console.log(data.data.order);
                                            //
                                            //$scope.$apply() 
                                        });
                                        if(Auth.isLoggedIn()){

                                                Auth.getUser().then(function(data){
                                                        var order = {};
                                                       
                                                       // console.log(checkoutArray);
                                                        console.log(data);
                                                        console.log(order);
                                                        checkoutData.push(data.data.username);
                                                        checkoutData.push([]);
                                                        User.getShoppingBag(data.data.username).then(function(data){

                                                            checkoutData[4] = data.data.user.shoppingbag;
                                                            console.log(checkoutData);
                                                        User.addOrdersToUser(checkoutData).then(function(data){

                                                            if(data.data.success){
                                                                $window.localStorage.removeItem('checkoutArrayy');
                                                        User.clearShoppingBag(data.data.username).then(function(data){

                                                        console.log(data.data);
                                                //$rootScope.cartItems = data.data.user.shoppingbag;

                                                        });

                                                                User.sendEmail(checkoutData[0].email).then(function(data){

                                                                        console.log(data.data.message);

                                                                });
                                                                $timeout(function(){
                                                                        $location.path('/shop/orderconfirmation');

                                                                },2000);
                                                                

                                                            }

                                                        })

                                                        })
                      

                                                })

                                        }else{

                                            User.sendEmail(checkoutData[0].email).then(function(data){
                                                    console.log(data.data.message);
                                                    $window.localStorage.removeItem('checkoutArrayy');
                                                   // $window.localStorage.setItem('checkoutArray',JSON.stringify([]));
                                                     $timeout(function(){
                                                                        $location.path('/shop/orderconfirmation');

                                                        },2000);
                                                    

                                            })
                                        }
                                }


                        });
                        scope.addCreditCardFunc( creditForm.$valid);
                    }


                    };
                     
                });

            }

        }

    });

    app.directive('heartAdder',function(){

        return {

            restrict: 'E',
            templateUrl: '../views/directives/heart-adder.html'



        }
    });

    app.directive('landingGallery', function(){

        return{

            restrict: 'E',
            templateUrl: '../views/directives/landing-gallery.html'
        }

    });


}());