console.log("testing userCrtl");
(function(){

var app = angular.module("userControllers",['userServices']);

app.controller('regCtrl',function($http,$location,$timeout,User){

    

    this.regUser = function(regData){

        console.log("form submitted");
        var scope= this;
        scope.errorMsg=false;
        scope.loading= true;
        User.create(scope.regData).then(function(data){

            console.log(data.data.success);
            console.log(data.data.message);
            
            if(data.data.success){
                //CREATE SUCCESS MESSAGE
                //REDIRECT TO HOMEPAGE  
                scope.loading= false;
                scope.successMsg= data.data.message;
                $timeout(function(){
                    $location.path('/');

                },2000);
                
                

            }else{
                //CREATE ERROR MESSAGE
                scope.loading=false;
                scope.errorMsg=  data.data.message;
                $location.path('/register');
                

            }

        });

    }
    //console.log("testing registration controller");


});

app.config(function(){

    console.log("testing new module");
    
});







}());