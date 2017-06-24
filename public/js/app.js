(function(){

var app = angular.module('store',['store-products']);


app.controller('StoreController', ['$http','$scope','$filter',  function($http,$scope,$filter) {

    var  store = this;
	store.products = [];
	store.jewels =[];
	$scope.formData ={};
	$scope.reverse = false;
	$scope.propertyName = 'price';
	console.log($scope.formData);

	$http.get('/products.json').then(success);
//$http.get('/api/products/').then(success);
	function success(response){
		console.log(response);
		console.log("hello");
		console.log(response.data);
		//$scope.products = response.data;
		store.products = response.data;
		//console.log($scope.products);

	};

	
	$http.get('/jewels.json').then(success3);

	function success3(response){
		console.log("hello");
		console.log(response.data);
		console.log(response);
		store.jewels = response.data;
		console.log("hello");
		console.log(store.jewels.length);


	}
	
	$http.get('/api/shoes').then(success4);

	function success4(response){
		console.log('hello');
		console.log(response.data);
		store.shoes = response.data;

	}

	//$http.get('/api/products/').then(success1);
    
	function success1(response){
		//console.log(response.data);
		$scope.products = response.data;
		console.log($scope.products);

		

	};
		function success2(response){
		//console.log(response.data);
		//$scope.products = response.data;
		console.log(response.data);
		$http.get('/api/shoes/').then(success4);

		

	};
	

	//$http.get('/api/gems').then(success);

	$scope.highToLow = function(){

		if($scope.reverse){

			$scope.reverse = false;

		}else{

			$scope.reverse = true;
		}

		
	}

	$scope.deleteShoe = function(id){
		$http.delete('/api/shoes/'+id).then(success2);
			
		

	};

	$scope.createShoe= function(){

		//console.log($scope.formData.text);

	$http.post('/api/shoes', $scope.formData)
		 .then(success);

	function success(response){
			
			/*console.log($scope.formData);
			$scope.formData ={};
			$scope.gems = response;
			console.log($scope.formData);
			*/
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