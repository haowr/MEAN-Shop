(function(){

var app = angular.module('store',[]);


app.controller('StoreController', function(){

    this.products = gems;


});

var gems = [{
	"name": "Dodecahedron",
	"price": 2.95,
	"description": "This is the shape of the universe... shh",
	"canPurchase": true


},
{
	"name": "Dodecahedron",
	"price": 2.95,
	"description": "This is the shape of the universe... shh",
	"canPurchase": true


}]
}());