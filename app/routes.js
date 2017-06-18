// app/routes.js

//load the gem model.

var Gem = require('./models/gem');

//expose the routes to our app with module.exports

module.exports = function(app){// passed when we required the routes.js file in server.js
    
    //use mongoose to get all the 
    //api ------------------------------------------
    //get all gemes
    app.get('/api/gems', function(req,res){

        Gem.find(function(err,gems){

              // if there is an error in receiving. send the error. nothing after res.send(err);
        if(err)
            res.send(err)
        
        res.json(gems) // return all gems in JSON format


        });
      


    });

        // create todo and send back all todos after creation
    app.post('/api/gems', function(req,res){

        //create a todo, information comes from AJAX request from Angular
        Gem.create({

            text : req.body.text,
            //review : 
           
            done: false
        }, function(err,todo){

            if(err)
              res.send(err);

              // get and return all the todos after you create another
              Todo.find(function(err,todos){

                if (err)
                   res.send(err)
                   res.json(todos);

              });
        });

    });


};