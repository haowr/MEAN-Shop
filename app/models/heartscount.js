var mongoose = require('mongoose');

module.exports = mongoose.model('Heartcount',{

        count:Number,
     
        done:Boolean


});