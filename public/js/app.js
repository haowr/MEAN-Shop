(function(){

var app = angular.module('store',['store-products']);


app.controller('StoreController', ['$http','$scope', function($http,$scope) {

    var  store = this;
	store.products = [];
	$scope.formData ={};
	console.log($scope.formData);

	$http.get('/products.json').then(success);
	function success(response){
		console.log(response);
		store.products = response.data;
		console.log(store.products);

	};

	//$http.get('/api/gems').then(success);

	$scope.createGem = function(){

		console.log($scope.formData.text);

	$http.post('/api/gems', $scope.formData)
		 .then(success);

	function success(response){
			
			console.log($scope.formData);
			$scope.formData ={};
			$scope.gems = response;
			console.log($scope.formData);
			
			console.log(response);
			//console.log(response.data.name);


		 };
		 //.error(function(data){

		//	console.log('Error: '+data);

		 //});
};

}]);
app.controller("SpecificationsController", function(){

	this.specifications ="";
	this.addSpec = function(product){
		product.specifications.push(this.specifications);
	this.specifications ="";

	};


});

app.controller("ReviewController",function(){

	this.review ={};

	this.addReview= function(product){

		product.reviews.push(this.review);
		this.review={};
	
};

});





//var gems = 
}());