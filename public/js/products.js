(function(){

    var app = angular.module('store-products',[]);

//var hearto = 0;
//var status =0;
app.directive("heartAdder",function(){

return{

	restrict: 'E',
	templateUrl: 'heart-adder.html',
	controller: function(){ 
		
		
		this.addHeart = function(id){

		 if(status===0){
				
				hearto++;
				status= 1;
		}else{

			//this.status=1;
		hearto--;
			status=0;
		}
console.log(hearto);
		}
     
	},
	controllerAs:'heartCtrl'


}


});

    app.directive('landingGallery',function(){


		return{

			restrict: 'E',
			templateUrl:'landing-gallery.html',
					controller: function() {
    	this.imageIndex = 0;
    	this.currentImageChange = function(imageNumber) {
      	console.log(imageNumber);
      	this.imageIndex = imageNumber || 0;
    	};},
		controllerAs: 'gallery'
		}

	});
	app.directive('landingPage',function(){

		return{

				restrict:'E',
				templateUrl:'landing-page.html'


		}




	});

    app.directive('productGallery', function(){

	return{

		restrict: 'E',
		templateUrl: 'product-gallery.html',
		controller: function() {
    	this.imageIndex = 0;
    	this.currentImageChange = function(imageNumber) {
      	console.log(imageNumber);
      	this.imageIndex = imageNumber || 0;
    	};},
		controllerAs: 'gallery'
		};
});
//Custom element directive w/no controller.
app.directive('productTitle', function() {

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

		return this.tab === checkTab;};},
		controllerAs: 'panel'};
});

app.directive('specificationPanel',function(){

		return{

			restrict: 'E',
			templateUrl: 'specification-panel.html'


		};




});





})();