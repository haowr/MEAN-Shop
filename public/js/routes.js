console.log("routes.js loaded");

(function(){

var app = angular.module('appRoutes', ['ngRoute','userServices']);

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
        .when('/shop',{

        templateUrl: '../views/pages/shop.html',
        controller: 'shoesCtrl',
        controllerAs:'shoes'

        


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
    .when('/resetusername', {
        templateUrl: '../views/pages/users/reset/username.html',
        controller: 'usernameCtrl',
        controllerAs: 'username',
        authenticated: false
    })
    .when('/resetpassword', {
        templateUrl: '../views/pages/users/reset/password.html',
        controller: 'passwordCtrl',
        controllerAs: 'password',
        authenticated: false
    })
    .when('/reset/:token', {
        templateUrl: '../views/pages/users/reset/newpassword.html',
        controller: 'resetCtrl',
        controllerAs: 'reset',
        authenticated: false
    })
    .when('/management', {
        templateUrl: '../views/pages/management/management.html',
        controller: 'managementCtrl',
        controllerAs:'management',
        authenticated: true,
        permission: ["admin", "moderator"]
    })
    .when('/edit/:id', {
        templateUrl: '../views/pages/management/edit.html',
        controller: 'editCtrl',
        controllerAs:'edit',
        authenticated: true,
        permission: ["admin", "moderator"]
    })
    .when('/search', {
        templateUrl: '../views/pages/management/search.html',
        controller: 'managementCtrl',
        controllerAs:'management',
        authenticated: true,
        permission: ["admin", "moderator"]
    })
    .otherwise({redirectTo: '/'});



$locationProvider.html5Mode({
  enabled: true,
  requireBase: false
}); //now no more # before route


});
app.run(['$rootScope','Auth','$location','User',function($rootScope,Auth,$location,User){

    $rootScope.$on('$routeChangeStart', function(event,next,current){
        console.log(Auth.isLoggedIn());

        if(next.$$route !== undefined){

        if(next.$$route.authenticated == true){
            console.log("Requires authentication!")
            if(!Auth.isLoggedIn()){
                event.preventDefault();
                $location.path('/');
            }else if (next.$$route.permission){
                User.getPermission().then(function(data){
                    //console.log(data);
                    if(next.$$route.permission[0]!= data.data.permission){
                        if(next.$$route.permission[1]!= data.data.permission){

                            $location.path('/');
                        }
                    }
                });

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
        }

    });
    

}]);


}());