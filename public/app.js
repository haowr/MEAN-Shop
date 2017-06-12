(function(){

var app = angular.module('store',[]);


app.controller('StoreController', function(){

    this.products = gems;


});
/*
app.controller('PanelController', function(){
	this.tab = 1;


    this.selectTab = function(setTab){

      this.tab = setTab;

	};
	this.isSelected = function(checkTab){

		return this.tab === checkTab;
	};

});
*/
app.controller("ReviewController",function(){

	this.review ={};

	this.addReview= function(product){

		product.reviews.push(this.review);
		this.review={};
	};

});

app.directive('productTitle',function(){

	return{

		restrict: 'E',
		templateUrl: 'product-title.html'
		

	};

});

app.directive('productPanels',function(){

	return{

		restrict: 'E',
		templateUrl:'product-panels.html',
		//move controller functionality into directive.
		controller: function(){
       this.tab = 1;

       this.selectTab = function(setTab){

       this.tab = setTab;

	   };
	   this.isSelected = function(checkTab){

		return this.tab === checkTab;
    	};


		},
		controllerAs: 'panel'

	};


});
app.directive('reviewsSection', function(){

	return{

		restrict: 'E',
		templateUrl: 'reviews-section.html',
		controller: function(){

				this.review ={};

	this.addReview= function(product){

		product.reviews.push(this.review);
		this.review={};
	};


		},
		controllerAs: 'reviewCtrl'


	};



});

var gems = [{
	"name": "Dodecahedron",
	"price": 2.95,
	"description": "This is the shape of the universe... shh",
	"canPurchase": true,
	"images": [{

		 "full": "./img/jupiter.png",
		 "thumb":"./img/jupiterthumb.jpg"
			
			  }],
	"reviews": [
		{
	     "stars": 5,
		 "body":"Oak Evolution!!!",
		 "author": "Zeus@Romans.com"

		},
		{
		 "stars": 4,
		 "body":"Docked one cause favorite number",
		 "author":"MoonlightKnight@CrystalPalace.com"	


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
			],
	"reviews": [
		{
	     "stars": 5,
		 "body":"She's always by my side!!!",
		 "author": "Sun@one.com"

		},
		{
		 "stars": 5,
		 "body":"Love that tone..",
		 "author":"Sun@one.com"	


		}]


}]
}());