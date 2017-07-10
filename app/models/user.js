var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

//keep validations on the backend...frontend they can be bypassed by a hacker


var UserSchema = new Schema({

    username: { type: String, lowercase: true, required: true, unique: true, dropDups: true },
    password: { type: String, required: true},
    email: { type: String, required: true, lowercase: true, unique: true, dropDups: true}


});
UserSchema.plugin(uniqueValidator);

UserSchema.pre('save',function(next){

    var user = this;
    bcrypt.hash(user.password,null,null,function(err,hash){
        if(err) return next(err);
        user.password = hash;
        next();

    });
});

UserSchema.methods.comparePassword = function(password){

    return bcrypt.compareSync(password,this.password);
};

//var Model = mongoose.model('User', UserSchema);
module.exports = mongoose.model('User', UserSchema);

var User = mongoose.model('User', UserSchema);

//User.on('index', function(err) { 
  //  console.log(err); 
//});
