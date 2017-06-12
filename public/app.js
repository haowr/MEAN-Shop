(function(){

var app = angular.module('store',[]);


app.controller('StoreController', function(){

    this.products = gems;


});

var gems = [{
	"name": "Dodecahedron",
	"price": 2.95,
	"description": "This is the shape of the universe... shh",
	"canPurchase": true,
	"images": [{

		 "full": "./img/jupiter.png",
		 "thumb":"./img/jupiterthumb.jpg"
			
			  }]
},
{
	"name": "Dodecahedron",
	"price": 3.95,
	"description": "This is the shape of the universe... shh",
	"canPurchase": true,
	"images": [{

		 "full": "./img/mercury.jpg",
		 "thumb":"./img/mercurythumb.jpg"
			
				}
			]


}]
}());