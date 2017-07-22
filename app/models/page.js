var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PageSchema = new Schema({

    pages: Array

});

module.exports = mongoose.model('Page', PageSchema);
