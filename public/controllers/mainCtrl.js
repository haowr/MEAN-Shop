(function(){

    var app = angular.module("mainController",['authServices','mainServices','userServices']);

    app.config(function(){

        console.log("mainController module loaded");

    });


  app.controller('mainCtrl',function($http,$location,$timeout,Auth,$rootScope,$interval,$window,Main,$route,User,AuthToken){


     var scope= this;
     scope.loadme =false;//dont load html until true;
     scope.checkSession = function(){

        if(Auth.isLoggedIn()){

            scope.checkingSession = true;
            var interval = $interval(function(){
                console.log("test");
                var token = $window.localStorage.getItem('token');
                if(token === null){
                    $interval.cancel(interval);
                }else{
                    self.parseJwt = function(token){
                        var base64Url = token.split('.')[1];
                        var base64 = base64Url.replace('-','+').replace('_','/');
                        return JSON.parse($window.atob(base64));
                    }
                    var expireTime = self.parseJwt(token);
                    var timeStamp = Math.floor(Date.now()/1000);// convert javascript date object into a timestamp
                    console.log(expireTime.exp);
                    console.log(timeStamp);

                    //console.log(expireTime.exp - timeStamp);
                    var timeCheck = expireTime.exp - timeStamp;
                    console.log(timeCheck);
                    if(timeCheck <= 350){
                        console.log("Token has expired...");
                        showModal(1);
                        $interval.cancel(interval);
                    }else{
                        console.log("Token is not yet expired...")
                    }
                }
            },2000);
        }

     };
     scope.checkSession();// INITIATE SESSION CHECKING....

     var  showModal= function(option){
         scope.choiceMade = false;
         scope.modalHeader = undefined;
         scope.modalBody = undefined;
         scope.hideButton = false;
         if(option === 1){
         scope.modalHeader = "Timeout Warning";
         scope.modalBody = "Your session will expire in 5 minutes... Would you like to keep shopping?";    
        $("#myModal").modal({backdrop: "static"});


         }else if (option ===2){
         scope.hideButton=true;
         scope.modalHeader = "Logging Out...";
         $("#myModal").modal({backdrop: "static"});
         $timeout(function(){
            Auth.logout();
            $location.path('/');
            hideModal();
            //$route.reload();

         },2000)
         //scope.modalBody = "Your session will expire in 5 minutes... Would you like to keep shopping?";
         //scope.choiceMade = false;
        }

        $timeout(function(){
            if(!scope.choiceMade){
                
                hideModal();
            }


        },5000);



     };

     $rootScope.$on('$routeChangeStart',function(){
         if(!scope.checkingSession) scope.checkSession()

        if(Auth.isLoggedIn()){
            scope.isLoggedIn = true;
            Auth.getUser().then(function(data){
                console.log(data.data.username);
                 scope.username = data.data.username;
                 scope.useremail= data.data.email;
                 scope.loadme= true;

                 User.getPermission().then(function(data){

                    if(data.data.permission == "admin"|| data.data.permission == "moderator" ){

                        scope.authorized = true;
                        scope.loadme = true;
                    }else{
                        scope.authorized = false;
                        scope.loadme = true;
                    }

                 });




             });
                console.log('Success: User is logged in.');
        }else{
                console.log('Failure: User is not logged in.')
                scope.username = "";
                scope.isLoggedIn= false;
                scope.loadme= true;
        }


     });

    

  

      $http.get('/api/shoes').then(function(response){

        console.log("hello");
        console.log(response);

      });
   

    this.doLogin = function(loginData){

        console.log("form submitted");
       
        scope.errorMsg=false;
        scope.loading = true;
        scope.expired = false;
        scope.disabled = true;
        Auth.login(scope.loginData).then(function(data){

            console.log(data.data.success);
            console.log(data.data.message);
            
            if(data.data.success){
                //CREATE SUCCESS MESSAGE
                //REDIRECT TO HOMEPAGE  
            
                scope.loading= false;
                scope.successMsg= data.data.message + '...Redirecting';
                $timeout(function(){
                    scope.loginData = '';
                    scope.success = false;
                    $location.path('/about');
                    scope.loginData = '';
                    scope.successMsg= "";
                    scope.disabled= false;
                    scope.success = false;
                    scope.checkSession();

                },2000);
                
                

            }else{
                if(data.data.expired){
                scope.expired=true;
                scope.loading=false;
                scope.errorMsg=  data.data.message + '...Redirecting';

                }else{
                
                scope.loading = false;
                scope.disabled = false;
                scope.errorMsg=  data.data.message;
                //$timeout(function(){
                   // $location.path('/login');

                //},2000);

                }
                //CREATE ERROR MESSAGE

                    
            }

        });

    };
    scope.logout = function(){
        showModal(2);
    };
    //console.log("testing registration controller");

     scope.renewSession = function(){
        scope.choiceMade = true;
        User.renewSession(scope.username).then(function(data){
            console.log(data);
            if(data.data.success){
                AuthToken.setToken(data.data.token);
                scope.checkSession();

            }else{
                scope.modalBody = data.data.message;

            }
        });
        hideModal();
    };

     scope.endSession = function(){
         scope.choiceMade = true;
         hideModal();
         $timeout(function(){
            showModal(2);
        },1000);

     };
     var hideModal= function(){
        $("#myModal").modal('hide');

     }

});




}());