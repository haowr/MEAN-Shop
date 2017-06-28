// app/routes.js

//load the gem model.

var Gem = require('./models/gem');
var Product = require('./models/gem');
var Shoe = require('./models/shoe');
var Heart = require('./models/heartscount');
var heart = 8;
var id ="";

//expose the routes to our app with module.exports

module.exports = function(app){// passed when we required the routes.js file in server.js
    
    //use mongoose to get all the 
    //api ------------------------------------------
    //get all gemes
    app.get('/api/shoes', function(req,res){

        Shoe.find(function(err,shoes){

              // if there is an error in receiving. send the error. nothing after res.send(err);
        if(err)
            res.send(err)
        
        res.json(shoes) // return all gems in JSON format


        });
      


    });

    app.get('/api/heartscounts',function(req,res){

        Heart.find(function(err,hearts){

                      if(err)
            res.send(err)
        
        res.json(hearts) // return all gems in JSON format


        });

        


    });

        // create todo and send back all todos after creation
    app.put('/api/shoes/:shoe_id', function(req,res){

 console.log(req.params);
 heart++
  id = req.params.shoe_id;
        //create a todo, information comes from AJAX request from Angular
const doc ={
           
           
            hearts: heart
};

        Shoe.update({_id: req.params.shoe_id},doc, function(err,shoes){

            if(err){
              res.send(err);
            }
              // get and return all the todos after you create another
              Shoe.find(function(err,shoes){

                if (err)
                   res.send(err)
                   res.json(shoes);

              });
        });

    });
    app.put('/api/heartscounts/', function(req,res){

 console.log(req.params);
 //heart++
        //create a todo, information comes from AJAX request from Angular
const doc ={
           
           
            hearts: req.params.shoe_id
};

        Shoe.update({_id: req.params.id},doc, function(err,shoes){

            if(err){
              res.send(err);
            }
              // get and return all the todos after you create another
              Shoe.find(function(err,shoes){

                if (err)
                   res.send(err)
                   res.json(shoes);

              });
        });

    });

    app.delete('/api/shoes/:shoe_id', function(req, res){

        Shoe.remove({
             _id: req.params.shoe_id
            }, function(err,shoe){

            if(err)
                res.send(err);

            // get and return all the products after you delete
            Shoe.find(function(err,shoes){

                if(err)
                    res.send(err)
                    res.json(shoes);
            });
        });
    });
};