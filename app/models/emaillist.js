var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EmailListSchema = new Schema({

    name: String,
    username: {type:String, unique:true},
    email:String,
    emaillist: Array
    


});

module.exports = mongoose.model('Email', EmailListSchema);