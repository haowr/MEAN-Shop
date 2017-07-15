console.log("routes.js loaded");

(function(){

var app = angular.module('appRoutes', ['ngRoute']);

app.config(function($routeProvider,$locationProvider){

    $routeProvider
    .when('/',{

        templateUrl: '../views/pages/home.html'

    })
    .when('/about',{

        templateUrl: '../views/pages/about.html'

    })
    .when('/register',{

        templateUrl: '../views/pages/users/register.html',
        controller: 'regCtrl',
        controllerAs: 'register',
        authenticated: false

    })
    .when('/login',{

        templateUrl: '../views/pages/users/login.html',
        authenticated: false


    })
        .when('/logout',{

        templateUrl: '../views/pages/users/logout.html',
        authenticated: true


    })
        .when('/profile',{

        templateUrl: '../views/pages/users/profile.html',
        authenticated: true


    })
         .when('/mensshoes',{

        templateUrl: '../views/pages/Mens/shoes.html',
        controller:'shoesCtrl',
        controllerAs: 'shoes',
        authenticated: false


    })
    .when('/activate/:token', {
        templateUrl: '../views/pages/users/activation/activate.html',
        controller: 'emailCtrl',
        controllerAs: 'email',
        authenticated: false
    })
        .when('/resend', {
        templateUrl: '../views/pages/users/activation/resend.html',
        controller: 'resendCtrl',
        controllerAs: 'resend',
        authenticated: false
    })
    .otherwise({redirectTo: '/'});



$locationProvider.html5Mode({
  enabled: true,
  requireBase: false
}); //now no more # before route


});
app.run(['$rootScope','Auth','$location',function($rootScope,Auth,$location){

    $rootScope.$on('$routeChangeStart', function(event,next,current){
        console.log(Auth.isLoggedIn());

        if(next.$$route.authenticated == true){
            console.log("Requires authentication!")
            if(!Auth.isLoggedIn()){
                event.preventDefault();
                $location.path('/');
            }

        }else if (next.$$route.authenticated== false){

            console.log("Does not require authentication!")
                if(Auth.isLoggedIn()){
                event.preventDefault();
                $location.path('/profile');
            }
        } else{
            console.log("Authenticated does not matter");
        }
        console.log(next.$$route.authenticated);

    });
    

}]);


}());