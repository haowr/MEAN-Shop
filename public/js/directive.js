(function(){


    var app = angular.module('shop-directives', []);

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