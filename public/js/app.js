(function(){

var app = angular.module('store',['store-products']);


app.controller('StoreController', ['$http','$scope', function($http,$scope) {

    var  store = this;
	store.products = [];
	$http.get('/products.json').then(success);
	function success(response){
		console.log(response);
		store.products = response.data;
		console.log(store.products);

	};

}]);

app.controller("ReviewController",function(){

	this.review ={};

	this.addReview= function(product){

		product.reviews.push(this.review);
		this.review={};
	
};

});


$scope.createGem = function(){

	$http.post('/api/todos', $scope.formData)
		 .success(function(data){

			$scope.formData ={};
			$scope.gems = data;
			console.log(data);


		 })
		 .error(function(data){

			console.log('Error: '+data);

		 });
};


//var gems = 
}());