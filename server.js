// server.js

    // setup =======================

    var express = require('express');
    var app     = express();
    var mongoose= require('mongoose');
    var morgan  = require('morgan');
    var bodyParser = require('body-parser');
    var methodOverride = require('method-override');
    var database = require('./config/database');
    var port    = process.env.PORT || 8888;