(function(){

    var app = angular.module('mensController', ['shopServices','authServices','userServices','heartServices','cookieServices']);

    app.config(function(){

        console.log("mensController loaded and initialized...");

    });

    app.controller('mensCtrl',function($routeParams,$route,Shop,$scope, $rootScope,Heart,Auth,$timeout,$location,User,$window,Cookie){
    console.log($routeParams.name);
    $scope.imageIndex = 0;
    $scope.size = "S";
    $scope.selection = 0;
    $scope.hearts =false;
    $scope.fit =0;
    $rootScope.heartss =$window.localStorage.getItem('cookieHearts');
    console.log($rootScope.heartss);
    $scope.loadme = false;
    //$scope.loading ;
    $scope.amt = 0;
    $scope.newHeartValue=false;
    $scope.heartActivated;
    $scope.activatedByName;
    $scope.addCookieHeart = 1;
    $scope.removeCookieHeart = 0;
    //$scope.mensShoe;
    
    Shop.getMensShoe($routeParams.name).then(function(data){
        $scope.mensShoe = data.data.allshoe[0];
        $scope.loadme=true;

        console.log(data.data.allshoe);
        console.log("SCOPEHEARTACTIVATED");
        console.log($scope.mensShoe.heartactivated);
    });
    Heart.isActivated($routeParams).then(function(data){

        console.log("heartActivated "+data.data.success);
        console.log(data.data);
                        if(data.data.active.heartactivated){
                    $scope.heartActivated = true;
                }else{
                     $scope.heartActivated = false;
                }
        console.log("$scope.heartActivated "+$scope.heartActivated);

    });


    console.log("$scope.heartActivated: "+$scope.heartActivated);
    $scope.imageChange = function(index){
        $scope.imageIndex = index;
        console.log($scope.imageIndex);
    };
    $scope.changeSize = function(size){
        $scope.size = size;

    };
    $scope.changeQty = function(amt){
        $scope.amt = amt;

    };
    $scope.openDetails = function(){
        if($scope.selection === 0){
            $scope.selection = 1;
        }else{
            $scope.selection = 0;
        }
    };
    $scope.openFit = function(){
        if($scope.fit === 0){
            $scope.fit = 1;
        }else{
            $scope.fit = 0;
        }
    };
    $scope.heartAdder = function(){
        $scope.loading = true;
        console.log($scope.loading);
        console.log($window.localStorage.getItem('page'));
        console.log($window.localStorage.getItem($routeParams.name));
        
        Cookie.setHearto($scope.removeCookieHeart);
        //Cookie.setCookieHearts($scope.removeCookieHeart);
        //$window.localStorage.setItem($routeParams.name,$scope.removeCookieHeart);
        //$window.localStorage.removeItem('hearto');
       // $scope.cookiePages.push($routeParams.name);
        //$window.localStorage.setItem($sope.cookiePages,$scope.cookiePages)
        if($window.localStorage.getItem($routeParams.name) != 1){
              $window.localStorage.setItem($routeParams.name,$scope.addCookieHeart);
              $scope.cookieHearts = $window.localStorage.getItem('cookieHearts');
              $scope.cookieHearts = Number($scope.cookieHearts);
              console.log($scope.cookieHearts+$scope.addCookieHeart);
              $scope.newCookieHeart = $scope.cookieHearts + $scope.addCookieHeart;
              $window.localStorage.setItem('cookieHearts',$scope.newCookieHeart);
        }else if($window.localStorage.getItem('cookieHearts') !=0 && window.localStorage.getItem($routeParams.name) != 1){
            $window.localStorage.setItem($routeParams.name,$scope.removeCookieHeart);
            $scope.cookieHearts = $window.localStorage.getItem('cookieHearts');
            $scope.cookieHearts = Number($scope.cookieHearts);
            console.log($scope.cookieHearts-$scope.addCookieHeart);
            $scope.newCookieHeart = $scope.cookieHearts - $scope.addCookieHeart;
            $window.localStorage.setItem('cookieHearts',$scope.newCookieHeart);
        }else{
            $window.localStorage.setItem($routeParams.name,$scope.removeCookieHeart);
            $window.localStorage.setItem('cookieHearts',$scope.removeCookieHeart);
        }
        
       // Heart.whoActivated().then

       //$scope.activatedByName =  $window.localStorage.getItem($routeParams.name);
       console.log($routeParams.name);
        Heart.whoActivated().then(function(data){
            console.log(data.data);

        });

        if( !$scope.heartActivated){

                Heart.activateHeart($routeParams).then(function(data){
                    console.log("did it work?");
                    console.log("shoe.heartactivated = true");
                    //console.log(data.data.success);
                    console.log(data.data.shoe);
                    $scope.heartActivated = true;
                    console.log("$scope.heartActivated "+$scope.heartActivated);

                });
                   Heart.addHeart().then(function(data){
           console.log(data.data.value);
           $scope.newHeartValue = true;
           

        });
                       Heart.getHearts().then(function(data){
        console.log("getHearts has run...");
        console.log(data.data.hearts[0].hearts);
        $rootScope.heartss =$window.localStorage.getItem('cookieHearts');
       // $window.localStorage.setItem('cookieHearts',$rootScope.heartss);
       // $scope.loading = false;
    });

    }else {
            Heart.deactivateHeart($routeParams).then(function(data){
                    console.log("did it work?");
                    console.log("activated");
                    console.log(data.data.success);
                    console.log(data.data.shoe);
                     $scope.heartActivated = false;
                     console.log("$scope.heartActivated "+$scope.heartActivated);

            });

            Heart.removeHeart().then(function(data){
                console.log(data.data.success);
            })
            //$scope.newHeartValue = false;
                Heart.getHearts().then(function(data){
        console.log("getHearts has run...");
        console.log(data.data.hearts[0].hearts);
        $rootScope.heartss = $window.localStorage.getItem('cookieHearts');
       // $window.localStorage.setItem('cookieHearts',$rootScope.heartss);
        
       // $scope.loading = false;
    });
        }

       if( Auth.isLoggedIn()){
           console.log("logged in");
       }else{
            console.log("Not logged in!");
            $timeout(function(){
                $location.path('/login');

            },2000);

       }


        
  
        //console.log(Heart.hearts);
        //Heart.hearts = $scope.newHeartValue + Heart
        //console.log($scope.newHeartValue);
      // $scope.newHeartValue = Heart.hearts++;
        //console.log($scope.newHeartValue);



//console.log($route);
    }

});



}());