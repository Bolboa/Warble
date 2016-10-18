var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;
var userSchema = new Schema({
    username: String,
    password: String
});

//takes care of hashing
userSchema.methods.generateHash = function(password) {
	console.log("pass");
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
userSchema.methods.validPassword = function(password) {
	console.log(password+"func");
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);