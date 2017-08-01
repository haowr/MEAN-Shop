(function(){

    var app = angular.module('emailServices',[]);
    app.config(function(){

        console.log("Email Services Loaded And Initialized..");

    });

    app.factory('Email', function($http){
        var emailFactory = {};

        //Email.addToMailList(email)
        
        emailFactory.addToMailList = function(email){
            return $http.put('/api/addtoemaillist/'+email);
        }
        
        return emailFactory;

    });



}());