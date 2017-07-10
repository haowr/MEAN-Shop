// app/routes.js

//load the gem model.

var Gem = require('./models/gem');
var Product = require('./models/gem');
var Shoe = require('./models/shoe');
var Heart = require('./models/heartscount');
var User = require('./models/user');
var jwt  = require('jsonwebtoken');

//var admin 
var heart = 8;
var id ="";
var secret= "haileselassie";

//expose the routes to our app with module.exports

module.exports = function(app){// passed when we required the routes.js file in server.js
    
  app.get('/api/users',function(req,res){

        console.log(res);
        User.find(function(err,users){

            res.json(users);

        });

    });

    app.post('/api/users', function(req,res){

        var user = new User();
        user.username = req.body.username;
        user.password = req.body.password;
        user.email = req.body.email;
       // console.log(err);
        //console.log(req);
        console.log(user);

        if (req.body.username == null || req.body.username == "" || req.body.password == null || req.body.password == ""|| req.body.email == null || req.body.email == ""){
            res.json({success: false, message:"Ensure username, email and password are provided"});
            

        }else{

        user.save(function(err){
            //console.log(err);
            if(err){
                res.json({success:false,message:"Username Or Email Already Exists"});
            }else{
                res.json({success:true,message:"Successful Save!"});
            }
        });
        }
      

        //
   
         });

        //USER LOGIN ROUTE
        // HTTP://LOCALHOST:PORT/API/AUTHENTICATE
        app.post('/api/authenticate',function(req,res){
            // res.send("Testing new route");
            User.findOne({ username: req.body.username}).select('email username password').exec(function(err,user){

                if(err) throw err;

                if(!user){
                    res.json({success:false, message:"Could not authenticate user"});
                } else if (user){
                    if(req.body.password){
                            var validPassword =  user.comparePassword(req.body.password);
                    }else{
                        res.json({success:false, message:"No password provided"});
                    }
//create password validation
                   
                   if(!validPassword){
                       res.json({ success: false, message:'Could  not authenticate password'});
                   }else{
                       
                      var token = jwt.sign({ username: user.username, email: user.email },secret,{ expiresIn: '24h'});
                       res.json({success: true, message:'User authenticated', token: token});
                   }

                }

            })


        });



        //EXPRESS MIDDLEWARE
        app.use(function(req,res,next){

           var token = req.body.token || req.body.query || req.headers['x-access-token'];
           //from jwt documentation
           if(token){
               // verify token
               jwt.verify(token, secret, function(err, decoded){

                    if(err) {
                    res.json({success: false, message:"Token invalid"})
                    }else{
                    req.decoded = decoded;
                    next(); //continue to post method...
                    }

               })

           }else{
               res.json({succes: false, message:"No token provided"});
           }


        });

                //GET CURRENT USER
        //HTTPS://LOCALHOST:8888/API/ME
        app.post('/api/me',function(req,res){

            res.send(req.decoded);
            


        });
        jwt.sign({
            data: 'foobar'
        }, 'secret', { expiresIn: '1h'});


        //res.send('testing users rout'); test

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
/*const doc ={
           
           
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
*/
    });

    app.get('/api/shoes/:shoe_id/:shoe_heart',function(req,res){
     var  data = {
        "info": {
            "id": req.params.shoe_id,
            "hearts": req.params.shoe_heart
        }
    };
    console.log(data);



});

   
       app.put('/api/shoes/:shoe_id/:shoe_heart', function(req,res){

 console.log(req.params);
 console.log(req.params.shoe_id);
 console.log(req.params.shoe_heart);
 heart++
  id = req.params.shoe_id;
        //create a todo, information comes from AJAX request from Angular
const doc ={
           
           
            hearts: req.params.shoe_heart
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
    app.put('/api/heartscounts/:heartNum', function(req,res){

 console.log(req.params);
 console.log(id);
 //heart++
        //create a todo, information comes from AJAX request from Angular
const doc ={
           
           
            hearts: req.params.heartNum
};

        Shoe.update({_id: id},doc, function(err,shoes){

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