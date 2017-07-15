// app/routes.js

//load the gem model.

var Gem = require('./models/gem');
var Product = require('./models/gem');
var Shoe = require('./models/shoe');
var Page = require('./models/pagesschema');
var Heart = require('./models/heartscount');
var User = require('./models/user');
var jwt  = require('jsonwebtoken');
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');

var options = {
  auth: {
    api_user: 'ohrha',
    api_key: 'tchuva2ed'
  }
}

var client = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "t.brixton@gmail.com",
        pass: "5613111111"
    }
});
  /* var client = nodemailer.createTransport({
        service: 'Zoho',
        auth: {
            user: 'cruiserweights@zoho.com', // Your email address
            pass: 'PAssword123!@#' // Your password
        },
        tls: { rejectUnauthorized: false }
    });
*/

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
        user.name = req.body.name;
        user.temporarytoken = jwt.sign({ username: user.username, email: user.email },secret,{ expiresIn: '24h'});
       // console.log(err);

        //console.log(req);
        console.log(user);

        if (req.body.username == null || req.body.username == "" || req.body.password == null || req.body.password == ""||
         req.body.email == null || req.body.email == ""|| req.body.name== null || req.body.name == ''){
            res.json({success: false, message:"Ensure username, email, name and password are provided"});
            

        }else{

        user.save(function(err){
            console.log(err);
            if(err){
                
               if(err.errors != null){

                    if(err.errors.name){
                        res.json({success:false,message:err.errors.name.message});
                    }else if(err.errors.email){
                        res.json({success:false,message:err.errors.email.message});
                    }else if(err.errors.username){
                        res.json({success:false, message: err.errors.username.message})
                    }else if(err.errors.password){
                        res.json({success: false, message: err.errors.password.message});
                    }else{
                    res.json({ success:false, message: err});
                    }
               } else if (err) {

                   if(err.code == 11000){
                       if(err.errmsg[61]=='u'){
                        res.json({success: false, message: "That username is already taken..."});
                       }else if(err.errmsg[61]=="e"){
                        res.json({success:false, message: "That email is already taken..."});j
                       }
                    }else{
                        res.json({success:false, message: err});
                    }
               }
            }else{
                        var email = {
                            from: 'A House Of Jewels, admin@hoj.com',
                            to: user.email,
                            subject: 'Activation Link Request',
                            text: 'Hello ' + user.name + ', You recently requested a new account activation link. Please click on the following link to complete your activation: https://immense-dusk-71112.herokuapp.com/activate/' + user.temporarytoken,
                            html: 'Hello<strong> ' + user.name + '</strong>,<br><br>You recently requested a new account activation link. Please click on the link below to complete your activation:<br><br><a href="http://localhost:8888/activate/' + user.temporarytoken + '">http://localhost:8888/activate/</a>'
                        };

                    // Function to send e-mail to user
                    client.sendMail(email, function(err, info) {
                        if (err) {
                            console.log(err); // If error in sending e-mail, log to console/terminal
                        } else {
                            console.log(info); // Log confirmation to console
                        }
                    });


                res.json({success:true,message:"Account registerd, please check your email for activation"});
            }
        });
        }
 });

 app.post('/api/shoes',function(req,res){

     var shoe = new Shoe();
     shoe.name = req.body.name;
     shoe.page = req.body.page;
     console.log(req.body.name);
     
    // shoe.

    shoe.save(function(err){

            if (err){
                    
                    res.send(err.message);
                
            }else{

                res.json({success: true, message: "Saved Mofo!"});
                
            }

        });

    });
                
      
app.get('/api/shoes',function(req,res){

    console.log(res);

            Shoe.find(function(err,shoes){

                res.json(shoes);

            });

        });

        app.post('/api/checkusername',function(req,res){
            // res.send("Testing new route");
            User.findOne({ username: req.body.username}).select('username').exec(function(err,user){

                if(user){

                    res.json({success: false, message: 'That username is already taken' });

                }else{

                    res.json({success: true, message: 'Valid username'});

                }

            });
        });

        app.post('/api/checkemail',function(req,res){
            // res.send("Testing new route");
            User.findOne({ email: req.body.email}).select('email').exec(function(err,user){

                if(user){

                    res.json({success: false, message: 'That e-mail is already taken' });

                }else{

                    res.json({success: true, message: 'Valid e-mail'});

                }

            });
        });


        //USER LOGIN ROUTE
        // HTTP://LOCALHOST:PORT/API/AUTHENTICATE
        app.post('/api/authenticate',function(req,res){
            // res.send("Testing new route");
            User.findOne({ username: req.body.username}).select('email username password active').exec(function(err,user){

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
                   }else if (!user.active){
                       res.json({success: false, message:'Account not yet activated, please check your email for activation link...', expired:true});

                   }else{
                       
                      var token = jwt.sign({ username: user.username, email: user.email },secret,{ expiresIn: '24h'});
                       res.json({success: true, message:'User authenticated', token: token});
                   }

                }

            })


        });
        app.post('/api/resend',function(req,res){
            // res.send("Testing new route");
            User.findOne({ username: req.body.username}).select('username password active').exec(function(err,user){

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
                   }else if (user.active){
                       res.json({success: false, message:'Account is already activated...'});

                   }else{
                                           
                       res.json({success:true,user:user});
                   }

                }

            });


        });

        app.put('/api/resend',function(req,res){

            User.findOne({username: req.body.username}).select('username name email temporarytoken').exec(function(err,user){
                if(err) throw err;
                var temporarytoken = jwt.sign({ username: user.username, email: user.email },secret,{ expiresIn: '24h'});
                user.save(function(err){
                    if(err){
                        console.log(err);
                    }else{
                    var email = {
                            from: 'A House Of Jewels, admin@hoj.com',
                            to: user.email,
                            subject: 'Activation Link Request',
                            text: 'Hello ' + user.name + ', You recently requested a new account activation link. Please click on the following link to complete your activation: https://immense-dusk-71112.herokuapp.com/activate/' + user.temporarytoken,
                            html: 'Hello<strong> ' + user.name + '</strong>,<br><br>You recently requested a new account activation link. Please click on the link below to complete your activation:<br><br><a href="http://localhost:8888/activate/' + user.temporarytoken + '">http://localhost:8888/activate/</a>'
                        };

                    // Function to send e-mail to user
                    client.sendMail(email, function(err, info) {
                        if (err) {
                            console.log(err); // If error in sending e-mail, log to console/terminal
                        } else {
                            console.log(info); // Log confirmation to console
                        }
                    });

                    res.json({success:true, message: "Activation link has been sent to "+user.email+"!"});
                    }
                    



                })

            })


        });

        app.put('/api/activate/:token',function(req,res){
            console.log("OY");
            User.findOne({temporarytoken: req.params.token}, function(err, user){

                if(err) throw err;
                var token = req.params.token;
                jwt.verify(token, secret, function(err, decoded){

                    if(err) {
                    res.json({success: false, message:"Activation link has expired..."});
                }else if(!user){ // token is true but doesn't match
                    res.json({success: false, message: "Activation link has expired..."});

                }else{

                    user.temporarytoken = false;
                    user.active = true;
                    user.save(function(err){

                        if(err){
                            console.log(err);

                        }else{
                        var email = {
                            from: 'A House of Jewels, admin@hoj.com',
                            to: user.email,
                            subject: 'Localhost Account Activated',
                            text: 'Hello ' + user.name + ', Your account has ben successfully activated!',
                            html: 'Hello<strong> ' + user.name + '</strong>,<br><br>Your account has been successfully activated!'
                        };

                    // Function to send e-mail to user
                    client.sendMail(email, function(err, info) {
                        if (err) {
                            console.log(err); // If error in sending e-mail, log to console/terminal
                        } else {
                            console.log(info); // Log confirmation to console
                        }
                    });

                        }

                    });

                    res.json({success: true, message:"Account Activated"});

               }

            });

        });
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