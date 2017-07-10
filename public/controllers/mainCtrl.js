(function(){

    var app = angular.module("mainController",['authServices']);

    app.config(function(){

        console.log("mainController module loaded");

    });


  app.controller('mainCtrl',function($http,$location,$timeout,Auth,$rootScope){


     var scope= this;
     scope.loadme =false;//dont load html until true;

     $rootScope.$on('$routeChangeStart',function(){

        if(Auth.isLoggedIn()){
            scope.isLoggedIn = true;
            Auth.getUser().then(function(data){
                console.log(data.data.username);
                 scope.username = data.data.username;
                 scope.useremail= data.data.email;
                 scope.loadme= true;
             });
                console.log('Success: User is logged in.');
        }else{
                console.log('Failure: User is not logged in.')
                scope.username = "";
                scope.isLoggedin= false;
                scope.loadme= true;
        }


     });

    

    this.doLogin = function(loginData){

        console.log("form submitted");
       
        scope.errorMsg=false;
        scope.loading= true;
        Auth.login(scope.loginData).then(function(data){

            console.log(data.data.success);
            console.log(data.data.message);
            
            if(data.data.success){
                //CREATE SUCCESS MESSAGE
                //REDIRECT TO HOMEPAGE  
                scope.loading= false;
                scope.successMsg= data.data.message + '...Redirecting';
                $timeout(function(){
                    app.loginData = '';
                    app.success = false;
                    $location.path('/about');
                    app.loginData = '';
                    app.success = false;

                },2000);
                
                

            }else{
                //CREATE ERROR MESSAGE
                scope.loading=false;
                scope.errorMsg=  data.data.message + '...Redirecting';
                $timeout(function(){
                    $location.path('/about');

                },3000);
                    
            }

        });

    };
    this.logout = function(){
            Auth.logout();
            $location.path('/logout');
            $timeout(function(){
                $location.path('/');
            }, 2000);

    };
    //console.log("testing registration controller");


});




}());