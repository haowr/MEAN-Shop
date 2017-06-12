(function(){

var app = angular.module('store',[]);


app.controller('StoreController', function(){

    this.products = gems;


});

  app.controller('GalleryController', function() {
    this.imageIndex = 0;
    this.currentImageChange = function(imageNumber) {
      console.log(imageNumber);
      this.imageIndex = imageNumber || 0;
    };
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
//Custom element directive w/no controller.
app.directive('productTitle',function(){

	return{

		restrict: 'E',
		templateUrl: 'product-title.html'
		

	};

});
//Custom controller directive w/PanelController controller
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
	"images": [
      "./img/gem-02.gif",
      "./img/gem-05.gif",
      "./img/gem-09.gif"
    ],
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
    "images": [
      "./img/gem-01.gif",
      "./img/gem-03.gif",
      "./img/gem-04.gif",
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