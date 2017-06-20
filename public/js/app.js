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

	$scope.createGem = function(){

	$http.post('/api/gems', $scope.formData).then(success);

	function success(response){

			$scope.formData ={};
			$scope.gems = response;
			console.log(response);


		 };
		 //.error(function(data){

		//	console.log('Error: '+data);

		 //});
};

}]);

app.controller("ReviewController",function(){

	this.review ={};

	this.addReview= function(product){

		product.reviews.push(this.review);
		this.review={};
	
};

});





//var gems = 
}());