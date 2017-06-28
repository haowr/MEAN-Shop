(function(){

var app = angular.module('store',['store-products']);


app.controller('StoreController', ['$http','$scope','$filter',  function($http,$scope,$filter) {

    var  store = this;
	var status=0;
	store.heartlink= "./img/heartsmall.jpg";
	store.hearto= 5;
	store.products = [];
	store.shango = [];
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
		//store.colors = response.data.colors;
		console.log('hello1');
		console.log(store.shoes);
		//store.shango.push(store.shoes);
		//console.log(store.shango);
		
	}

	//$http.get('/api/products/').then(success1);
    
	function success1(response){
		//console.log(response.data);
		$scope.products = response.data;
		console.log($scope.products);

		

	};
		function success2(response){
		console.log(response);
		//$scope.products = response.data;
		//console.log(response.data);
		$http.get('/api/shoes/').then(success4);

		

	};
	function success6(response){

		console.log(response.data);
		console.log("joy");
		console.log(store.shoes);
		for(var i=0; i<response.data.length; i++){

		store.shoes[i].hearts= response.data[i].hearts;

	}
	console.log(store.shoes[0].hearts);
	console.log(response.data[0].hearts);
	}
	function success5(response){

		$http.get('/api/shoes').then(success6);

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

	/*store.addHeart = function(id,heartNum){
         console.log(heartNum);

		 if(status===0){
				
				store.hearto++;
				status= 1;
		}else{

			//this.status=1;
			store.hearto--;
			status=0;
		}
		//store.hearto++
		console.log(status);
		console.log(id);
		//console.log(params.id);
			$http.put('/api/shoes/'+id).then(success2);
			$http.put('/api/heartscounts/'+heartNum).then(success2);
			//$http.put('/api/heartscounts/'+id).then(success2);



	}
	*/
	store.addHeart = function(id,heartNum){
		console.log("hello");
         console.log(heartNum);
		 console.log(id);
		 console.log(status);

		 if(status===0 && heartNum !==1){
				
				//store.hearto++;
				heartNum = heartNum + 1;
				status= 1;
		}
		else if(status===1 && heartNum === 0){

			//this.status=1;
			//store.hearto--;
			heartNum = heartNum + 1;
			status=0;
		}else{

			heartNum =heartNum - 1;
			//status=0
		}
		
		//store.hearto++
		
		console.log(heartNum);
		console.log(id);
		console.log(status);
		//console.log(params.id);
			//$http.put('/api/shoes/'+id).then(success5);
			$http.put('/api/shoes/'+id+'/'+heartNum).then(success5);
			//$http.put('/api/heartscounts/'+id).then(success2);
}
	

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

}());