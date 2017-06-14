// app/models/app.js

// load mongoose since we need it to define a model
var mongoose = require('mongoose');

module.exports = mongoose.model('Gem', {
    name : String,
    price: Number,
    description: String,
    canPurchase: Boolean,
    images: Array,
    reviews: Array,
    done : Boolean
});