var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ShoeSchema = new Schema({
  
        name: String,
        price: Number,
        shoecolor: Array,
        page:{type: Array, unique: true, dropDups: true},
        colors:Array,
        hearts: Number,
        done: Boolean
});

module.exports = mongoose.model('Shoe',ShoeSchema );
