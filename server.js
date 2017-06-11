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

    // configuration ===============================================================
    //mongoose.connect(database.url);     // connect to mongoDB database on modulus.io

    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());
    //app.use() Binds a middleware function with a specific path.
    //bodyParse pulls posted information
    // routes ======================================================================
    require('./app/routes.js')(app);

    // listen (start app with node server.js) ======================================
    app.listen(port);
    console.log("App listening on port : " + port);