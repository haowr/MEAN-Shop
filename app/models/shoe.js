var mongoose = require('mongoose');


//var shoePages = new Schema({


//})

module.exports = mongoose.model('Shoe',{

        name:String,
        price:Number,
        shoecolor:Array,
        dago:String,
        page:Array,
        colors:Array,
        stars:Number,
        hearts:Number,
        done:Boolean


});