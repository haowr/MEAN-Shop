var mongoose = require('mongoose');
module.exports = mongoose.model('Shoe',{

        name:String,
        price:Number,
        shoecolor:Array,
        colors:String,
        stars:Number,
        hearts:Number,
        done:Boolean


});