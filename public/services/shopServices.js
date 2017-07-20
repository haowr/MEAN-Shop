(function(){


var app = angular.module('shopServices', []);

app.factory('Shop', function($http){

    shopFactory = {};

    //Shop.create();
    shopFactory.create = function(){
       return $http.post('/api/shoes');

    };

    //Shop.getShoes();
    shopFactory.getShoes = function(){

       return $http.put('api/shoes');


    };

return shopFactory;





});




}());