(function(){

var app = angular.module('store',['store-products']);


app.controller('StoreController', ['$http','$scope', function($http,$scope) {

    var  store = this;
	store.products = [];
	$scope.formData ={};
	console.log($scope.formData);

	$http.get('/products.json').then(success);
//$http.get('/api/products/').then(success);
	function success(response){
		console.log(response);
		console.log(response.data);
		//$scope.products = response.data;
		store.products = response.data;
		//console.log($scope.products);

	};

	$http.get('/api/products/').then(success1);

	function success1(response){
		//console.log(response.data);
		$scope.products = response.data;
		console.log($scope.products);

		

	};
		function success2(response){
		//console.log(response.data);
		//$scope.products = response.data;
		console.log(response.data);

		

	};

	//$http.get('/api/gems').then(success);

	$scope.deleteGem = function(id){
		$http.delete('/api/products/'+id).then(success2);
			
		

	};

	$scope.createGem = function(){

		console.log($scope.formData.text);

	$http.post('/api/products', $scope.formData)
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