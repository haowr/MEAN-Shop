// app/routes.js

//load the gem model.

var Gem = require('./models/gem');
var Product = require('./models/gem');
var Shoe = require('./models/shoes');

//expose the routes to our app with module.exports

module.exports = function(app){// passed when we required the routes.js file in server.js
    
    //use mongoose to get all the 
    //api ------------------------------------------
    //get all gemes
    app.get('/api/products', function(req,res){

        Product.find(function(err,gems){

              // if there is an error in receiving. send the error. nothing after res.send(err);
        if(err)
            res.send(err)
        
        res.json(gems) // return all gems in JSON format


        });
      


    });

        // create todo and send back all todos after creation
    app.post('/api/shoes', function(req,res){

 //console.log(req.body.text);
        //create a todo, information comes from AJAX request from Angular
        Shoe.create({
           
            name : req.body.name,
            price: req.body.price,
            shoecolor: req.body.shoecolor,
            colors: req.body.colors,
            stars: true,
            hearts:"Test",
           // name: formData.text,
            //review : 
           
            done: false
        }, function(err,gem){

            if(err)
              res.send(err);

              // get and return all the todos after you create another
              Product.find(function(err,gems){

                if (err)
                   res.send(err)
                   res.json(gems);

              });
        });

    });


    app.delete('/api/products/:product_id', function(req, res){

        Product.remove({
             _id: req.params.product_id
            }, function(err,product){

            if(err)
                res.send(err);

            // get and return all the products after you delete
            Product.find(function(err,product){

                if(err)
                    res.send(err)
                    res.json(product);
            });
        });
    });
};