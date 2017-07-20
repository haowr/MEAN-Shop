(function(){

var app = angular.module('productsController',['shopServices']);

app.config(function(){

    console.log("shoesCtrl loaded");

});

app.controller('shoesCtrl',function(Shop,$scope){

    var scope = this;
    var name = "Z!";
    scope.imageIndex=0;
    $scope.shoes;
    $scope.hearts = 1;
    $scope.loadme = false;

    function getShoes(){

                Shop.getShoes().then(function(data){
                    console.log("getshoes");
                     console.log(data);
                     if(data.data.success){
                         $scope.shoes = data.data.shoes;
                         $scope.loadme = true;
                     }else{
                        console.log("Something went wrong getting shoe filepaths...");
                        console.log(data.data.message);

                    }
        

            });

    };
            getShoes();

      //      function() {
    //	this.imageIndex = 0;
    	$scope.currentImageChange = function(imageNumber) {
        console.log("Hello");
      	console.log(imageNumber);
         $scope.imageIndex = imageNumber || 0;
    	};

});
app.controller('galleryCtrl',function(){
        this.imageIndex=0;

        	this.currentImageChange = function(imageNumber) {
        console.log("Hello");
      	console.log(imageNumber);
         this.imageIndex = imageNumber || 0;
    	};

});

app.controller('heartCtrl',function(){
        this.hearts=1;

       // this.currentImageChange = function(imageNumber) {
       // console.log("Hello");
      //	console.log(imageNumber);
        // this.imageIndex = imageNumber || 0;
    	//};

});

}());