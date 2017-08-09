(function(){


    var app = angular.module('shop-directives', ['shopServices','authServices','userServices']);

    app.directive('funcWrapper',function(){

        return{
            restrict: 'A',
            scope:{


            }
        }


    })

    app.directive('stripeCheckoutJquery',function(Auth,Shop,User,$location,$window,$timeout){

        return{
            restrict: 'A',
            require:'form',
            scope: {
                'addCreditCardFunc': '&',
                'finalCheckoutData':'=',
                'grandTotal': '=',
                'paymentLoading': '='
            },
            link: function(scope,elem,attrs,formCtrl){
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
                        var ccData = {
                            cardname: elem[0][0].value,
                            stripeToken: elem[0][6].value,
                            grandTotal: scope.grandTotal

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
                                                        checkoutData[4] = JSON.parse($window.localStorage.getItem('checkoutArrayy'));
                                                       // for(var i =0; i<checkoutArray.length; i++){
                                                       //        order{
                                                       //            i: checkoutArray[i]
//
                                                        //}
                                                        //console.log(order);
                                                        //checkoutData[4]=order;
                                                        console.log(checkoutData);
                                                        User.addOrdersToUser(checkoutData).then(function(data){

                                                            if(data.data.success){
                                                                $window.localStorage.removeItem('checkoutArrayy');
                                                                User.sendEmail(checkoutData[0].email).then(function(data){

                                                                console.log(data.data.message);

                                                            });
                                                                $timeout(function(){
                                                                        $location.path('/profile');

                                                                },2000);
                                                                

                                                            }

                                                        })

                                                })

                                        }else{

                                            User.sendEmail(checkoutData[0].email).then(function(data){
                                                    console.log(data.data.message);
                                                    $window.localStorage.removeItem('checkoutArrayy');
                                                     $timeout(function(){
                                                                        $location.path('/home');

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