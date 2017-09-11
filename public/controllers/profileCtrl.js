(function(){

var app = angular.module('profileController', ['userServices','heartServices', 'shopServices','authServices',]);

app.config(function(){
    console.log("profile controller loaded and initialized...");
})

app.controller('profileCtrl',function(Shop,Auth,User,$scope, $rootScope,$window){
/*
var names = 
Shop.getMensShoe()
*/

 $scope.user ;
 $scope.whoisthis;
 $scope.currentUser;
$scope.orders =[];
$scope.loves=[];
$scope.lovesLength;
$scope.loveObjectArray = [];
$scope.loveObjects= [];
$scope.allShoes;
$scope.grandTotal = $window.localStorage.getItem('grandTotal');
console.log($scope.grandTotal);
$scope.totals = [];
   User.getProducts().then(function(data){

    console.log(data.data.user.products);

   })
    Auth.getUser().then(function(data){

        console.log(data.data.username);
        $scope.currentUser = data.data.username;

        $scope.whoisthis = data.data.username;
        User.getUserProfile($scope.whoisthis).then(function(data){

           /* User.getOrders($scope.whoisthis).then(function(data){

                console.log(data.data);
                $scope.orders= data.data.orders.orders;

            })*/
            console.log(data.data.user);
            console.log(data.data.user.loves);
            $scope.loves = data.data.user.loves;
            $scope.lovesLength = $scope.loves.length;
            console.log($scope.loves);
            console.log($scope.lovesLength)
            $scope.user = data.data.user;
            Shop.getAllShoes().then(function(data){

                console.log(data.data.allshoes);
                $scope.allShoes = data.data.allshoes;
                console.log($scope.allShoes);
                console.log($scope.allShoes[0]);
                console.log($scope.allShoes.length);
                console.log($scope.allShoes[0].name);
                for(var i = 0; i < $scope.allShoes.length; i++){

                    $scope.loveObjects.push({ name: $scope.allShoes[i].name,
                                              thumbnail: $scope.allShoes[i].perspectives[1],
                                              available: $scope.allShoes[i].available,
                                              description: $scope.allShoes[i].description});

                    console.log($scope.loveObjects);
                    
             

                }

                for(var i = 0; i < $scope.loves.length; i ++){

                    for(var j = 0; j < $scope.loveObjects.length; j++){

                            if($scope.loveObjects[j].name == $scope.loves[i]){

                                console.log("I love "+$scope.loveObjects[j].name);
                                $scope.loveObjectArray.push($scope.loveObjects[j]);
    
                            }
                    }



                }
                var unique = $scope.loveObjectArray.filter(function(elem, index, self) {
                        return index == self.indexOf(elem);
                })    
                $scope.loveObjectArray = unique;  
                $rootScope.heartss = $scope.loveObjectArray.length;
                

            });
            //for(var i = 0; i < data.data.user.loves; i ++){

              //  $scope.loves.push(data.data.user.loves[i]);

            //}
            console.log(data.data.user.orders);
        for(var i= 0; i<data.data.user.orders.length; i++){

            $scope.orders.push(data.data.user.orders[i]);
            //$scope.orders[i].timestamp= 
            /*var d= new Date();
            console.log(d.getFullYear());
            console.log(d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2));
*/

            

        }
        User.getTotalsFromUser($scope.whoisthis).then(function(data){

            console.log(data.data);
            console.log(data.data.history.totalhistory);
            $scope.totals = data.data.history.totalhistory;
          
            //$scope.order.push(data.data.history.totalhistory);

        })
        //$scope.totals.push($scope.grandTotal);
        //$scope.totals = [];
                       // var unique = $scope.totals.filter(function(elem, index, self) {
                        //return index == self.indexOf(elem);
                //})    
               // $scope.totals = unique;  
       // console.log($scope.totals);
        

    });
    $scope.removeOneLove = function(index){

       

        User.removeLove($scope.currentUser,$scope.loveObjectArray[index].name).then(function(data){
           console.log($scope.currentUser);
            console.log(data.data);
                    Shop.decrementHearts($scope.loveObjectArray[index].name).then(function(data){

            console.log(data.data);
             $scope.loveObjectArray.splice($scope.loveObjectArray[index],1);
             $rootScope.heartss = $scope.loveObjectArray.length;

        })


        })


    }
    $scope.removeOrder = function(index){

        console.log($scope.currentUser);
        User.removeOneOrder($scope.currentUser,index).then(function(data){
      

            console.log(data.data.order);
             console.log($scope.orders);
             console.log(index);
             //$scope.orders.splice(index,1);
           //$scope.orders = data.data.order.orders;
            //console.log(data.data.)
            console.log($scope.orders);
            $scope.orders= data.data.order.orders;



        })

    }
    $scope.clearLoves = function(){
        console.log($scope.currentUser);
        User.clearHearts($scope.currentUser).then(function(data){

                console.log(data.data.user.loves);
                $rootScope.heartss = data.data.user.loves.length;
                 $scope.loveObjectArray= data.data.user.loves;
                 $rootScope.heartactivated = false;
                 //Shop.decrementHeartsBy()
            

        })

    }
console.log($scope.orders);

    });
 
    //console.log($scope.whoisthis);
    /*
*/
});



}());