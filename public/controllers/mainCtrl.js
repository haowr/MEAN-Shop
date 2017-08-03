(function(){

    var app = angular.module("mainController",['authServices','mainServices','userServices','infinite-scroll','heartServices','shopServices','emailServices']);

    app.config(function(){

        console.log("mainController module loaded");

    });


  app.controller('mainCtrl',function($http,$location,$timeout,Auth,$rootScope,$interval,$window,Main,$route,$scope,User,AuthToken,Heart,Shop,Email){


     var scope= this;
     scope.loadme =false;
     //scope.username="";
     $rootScope.commercials=["../img/SummerSale.jpg","../img/ADS.jpg","../img/DSG.jpg"];
     $rootScope.slides = [
         {image: "../img/SummerSale.jpg", description: "Image 00"},
         {image: "../img/ADS.jpg", description: "Image 01"},
         {image: "../img/DSG.jpg", description: "Image 02"}
     ];
     $rootScope.currentIndex = 0;
     $rootScope.commercial = 0;
     $rootScope.myLoves =[];
     $rootScope.personalMyLoves=[];
     $rootScope.usernamey;
     $scope.shoeThumbs = [];
     $scope.looper={};
     $scope.whatsNewThumbs = [];
     $scope.longAd =["../img/longad80.jpg"];
     $scope.whatsNew = ["../img/blackshoeside.jpg","../img/pinkshoeside.jpg","../img/blackshoeside.jpg","../img/pinkshoeside.jpg","../img/blackshoeside.jpg","../img/pinkshoeside.jpg","../img/blackshoeside.jpg","../img/pinkshoeside.jpg"];
     $scope.translate = 0;
     $scope.translateY = 0;
     $rootScope.opacityOn =false;
     $rootScope.opacityOn2 =false;
     //$scope.new=0;
     //var dataArray = [];
    //var valueArray = [];
    /*$(".adnext").click(function(){
        $(".slide").fadeOut(2000);

    });*/
        $rootScope.setCurrentSlideIndexAdd = function () {
            console.log( $rootScope.currentIndex);
            $rootScope.opacityOn = true;
            if($rootScope.currentIndex === 0){
                $rootScope.currentIndex = 1;
            }else if($rootScope.currentIndex === 1){
                $rootScope.currentIndex = 2;
            }else{
                $rootScope.currentIndex =2;
            }
            
            $timeout(function(){
              $rootScope.opacityOn = false;
            },200);
    };
       $rootScope.setCurrentSlideIndexSubtract = function () {
           console.log( $rootScope.currentIndex);
           $rootScope.opacityOn2 =true;
            if($rootScope.currentIndex === 2){
                $rootScope.currentIndex = 1;
            }else if($rootScope.currentIndex === 1){
                $rootScope.currentIndex = 0;
            }else{
                $rootScope.currentIndex =0;
            }
            $timeout(function(){
              $rootScope.opacityOn2 = false;
            },200);
    };
    $rootScope.isCurrentSlideIndex = function (index) {
        return $rootScope.currentIndex === index;
    };

    Shop.getAllShoes().then(function(data){

        console.log(data.data.allshoes);
         console.log(data.data.allshoes[0].perspectives[1]);

       for(var i = 0; i<data.data.allshoes.length; i++){
            $scope.whatsNewThumbs.push(data.data.allshoes[i].perspectives[1]);

        }
        console.log($scope.whatsNewThumbs);

    });
    
 /*Auth.getUser().then(function(data){
                console.log(data.data.username);
                 //scope.username = data.data.username;
                 $rootScope.usernamey = data.data.username;
                 //scope.useremail= data.data.email;
                 scope.loadme= true;

                 User.getLoves($rootScope.usernamey).then(function(data){
                    console.log(data.data.message);
                    console.log(data.data.loves);
                    var unique = data.data.loves.loves.filter(function(elem, index, self) {
                        return index == self.indexOf(elem);
                    });
                    $rootScope.personalMyLoves = unique;
                    //$rootScope.personalMyLoves = data.data.loves.loves;
                    //$scope.looper.personalMyLoves = data.data.loves.loves;
                   console.log($rootScope.personalMyLoves);
                   console.log(data.data.loves.loves);
                 });
 });
     
 */   
    //$window.localStorage.removeItem('myLoves');
    $rootScope.EmailListEmail;
     $rootScope.localStorageMyLovesString = $window.localStorage.getItem('myLoves');// retrieves myLoves from local storage as string....
            console.log($rootScope.localStorageMyLovesString);
            if($rootScope.localStorageMyLovesString != null){
                 $rootScope.myLovesStringSplit = $rootScope.localStorageMyLovesString.split(",");// splits string into an array, with each shoe at its own index. Or returns shoe at zero index if one seperator exists..
    
                    var unique =  $rootScope.myLovesStringSplit.filter(function(elem, index, self) {
            return index == self.indexOf(elem);
    });

     $rootScope.myLoves= unique;
            }
            //most recent change might havebroken...
            //$rootScope.myLovesStringSplit = $rootScope.localStorageMyLovesString.split(",");// splits string into an array, with each shoe at its own index. Or returns shoe at zero index if one seperator exists..
    
 
     console.log($rootScope.myLoves);
     $rootScope.heartss = $window.localStorage.getItem('cookieHearts');
     $rootScope.cartItems = $window.localStorage.getItem('shoppingCartNumber');
     if($rootScope.myLoves[0] == null){
         $rootScope.myLoves=[];
     }
     console.log("LOL");
     console.log($rootScope.myLoves);
    if($rootScope.myLoves[0] != undefined ){
        $rootScope.myLovesSeparated=  $rootScope.myLoves;
        
    }
    //console.log($rootScope.myLovesSeparated);
    //$rootScope.myLovesSeparated.slice($rootScope.myLovesSeparated.indexOf(""),1);
    //console.log($rootScope.myLovesSeparated);
 
       /* if($scope.myLoves[0]== ""){
            $scope.shoeThumbs = [];
        }else{
        $scope.shoeThumbs.push(data.data.thumbnails[0].thumbnail);
        $scope.shoeThumbs.push(data.data.thumbnails[1].thumbnail);
        }
    });
*/
     $scope.addToEmailList = function(emailListData, valid){

        console.log("form submitted");
        console.log(valid);
        console.log(emailListData);
        console.log(emailListData.email);
        $rootScope.EmailListEmail = emailListData;

        if(valid){
            Email.addToMailList(emailListData.email).then(function(data){

                console.log(data.data.message);
                console.log(data.data);
            });
        }

     };
$rootScope.checkEmail = function(emailListData){

            $rootScope.checkingEmail = true;
            $rootScope.emailMsg = false;
            $rootScope.emailInvalid = false;
        User.checkEmail($rootScope.EmailListEmail).then(function(data){

           // console.log(data);
           if (data.data.success){
               $rootScope.checkingEmail = false;
               $rootScope.emailInvalid = false;
               $rootScope.emailMsg = data.data.message;
           }else{
               $rootScope.checkingEmail = false;
              $rootScope.emailInvalid = true;
              $rootScope.emailMsg = data.data.message;
           }

        });
    }

     scope.checkSession = function(){

        if(Auth.isLoggedIn()){

            scope.checkingSession = true;
            var interval = $interval(function(){
                //console.log("test");
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
                    //console.log(expireTime.exp);
                    //console.log(timeStamp);

                    //console.log(expireTime.exp - timeStamp);
                    var timeCheck = expireTime.exp - timeStamp;
                    //console.log(timeCheck);
                    if(timeCheck <= 350){
                        console.log("Token has expired...");
                        showModal(1);
                        $interval.cancel(interval);
                    }else{
                        //console.log("Token is not yet expired...")
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
         for(var i =0; i< $rootScope.personalMyLoves.length; i++){
             $window.localStorage.removeItem($rootScope.personalMyLoves[i]);
         }
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
                 $rootScope.usernamey = data.data.username;
                 scope.useremail= data.data.email;
                 scope.loadme= true;

                 User.getLoves($rootScope.usernamey).then(function(data){
                    console.log(data.data.message);
                    console.log(data.data.loves);
                    var unique = data.data.loves.loves.filter(function(elem, index, self) {
                        return index == self.indexOf(elem);
                    });
                    $rootScope.personalMyLoves = unique;
                    //$rootScope.personalMyLoves = data.data.loves.loves;
                    //$scope.looper.personalMyLoves = data.data.loves.loves;
                   console.log($rootScope.personalMyLoves);
                   console.log(data.data.loves.loves);
                 });
                 console.log($rootScope.personalMyLoves);
                    Shop.getThumbnails().then(function(data){

        console.log(data.data.thumbnails);
        for (var i = 0; i< $rootScope.myLoves.length; i++){

            for (var j = 0; j< data.data.thumbnails.length; j++){
                if (data.data.thumbnails[j].name == $rootScope.myLoves[i]){
                    $scope.shoeThumbs.push(data.data.thumbnails[j].thumbnail);
                   // $scope.looper.shoeThumbs.push(data.data.thumbnails[j].thumbnail);
                }

            }

        }
    });
    

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

    

  /*

      $http.get('/api/shoes').then(function(response){

        console.log("hello");
        console.log(response);

      });
   */

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


     $scope.commercialChange = function(){

        if($scope.commercial === 0){
            $scope.commercial =1;
        }else if($scope.commercial === 1){
            $scope.commercial = 2;
        }else{
            $scope.commercial = 0;
        }

     };
$scope.newChange = function(){
    console.log($scope.translate);
    if($scope.translate ===0 ){
        $scope.translate = 1;
    }else{
        $scope.translate = 0;
    }


}
$scope.newChangeY = function(){
    console.log($scope.translateY);
    if($scope.translateY ===2 ){
         $scope.translateY = 1;
          
    }
     else{
        $scope.translateY = 2;
    }


}

});





}());