// server.js

    // setup =======================

    var express = require('express');
    var app     = express();  // create the app with express.
    var mongoose= require('mongoose'); // mongoose ODM(object data mapper) for mongodb.
    var morgan  = require('morgan'); //logs requests to the console
    var bodyParser = require('body-parser'); // pull information from html POST
    var methodOverride = require('method-override');// Simulate delete and put
    var database = require('./config/database');
    var port    = process.env.PORT || 8888;
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var UserModel = require('./app/models/user');
    // configuration ===============================================================
    mongoose.connect(database.url);     // connect to mongoDB database on modulus.io

    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());
    app.use(passport.initialize());
    passport.use(new LocalStrategy(

            function(username,password,done){

              
                UserModel.findOne({username: username, password: password},function(err,user){

                        if(user){

                            return done(null,user);

                        }
                        return done(null,false,{message: 'Unable to login'});

                });

            }
    ));

    passport.serializeUser(function(user,done){

        done(null,user);
    });

    passport.deserializeUser(function(user, done){

        done(null,user);
    });
    //app.use() Binds a middleware function with a specific path.
    //bodyParse pulls posted information
    // routes ======================================================================
    require('./app/routes.js')(app);
   // var admin = new UserModel({username: 'Leon', password: "Leon", firstName:'Leon',lastName:"De Leon", role:["admin"]});
    //var student = new UserModel({username: 'bob', password: "bob", firstName:'Bob',lastName:"Marley", role:["student"]});
    //admin.save();
    //student.save();
    app.post("/views/login/login.html",passport.authenticate('local'),function(req,res){// add passport as preprocessor

        console.log("/views/login/login.html");
       // console.log(request.body); //works because of bodyParser.
        console.log(req.user);
        res.json(req.user); //send it back to the promise as json.

    });

    app.post("/views/register.html",function(req,res){

        UserModel.findOne({usernme: req.body.username},function(err,user){

            if(user){

                res.json(null);
                return;


            }else{

                var newUser = new UserModel(req.body);
                newUser.save(function(err,user){

                    req.login(user,function(err){//currently logged in user (passport method)

                        if(err){ return next(err); }
                        res.json(user);

                    });
                    
                });

            }
        });
        var newUser = req.body;
        console.log(newUser);

    })
    // listen (start app with node server.js) ======================================
    app.listen(port);
    console.log("App listening on port : " + port);