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

    //Shop.getPages();
    shopFactory.getPages = function(){

        return $http.put('api/pages');
    };

    //Shop.getAllSHoes();
    shopFactory.getAllShoes = function(){

        return $http.put('/api/allshoes');

    };
    //Shop.getMensShoe();
    shopFactory.getMensShoe = function(name){
        return $http.put('/api/shoes/mensshoes/'+name);

    };

return shopFactory;





});




}());