var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

//create the schema for the user
var Schema = mongoose.Schema;
var userSchema = new Schema({
    username: String,
    password: String
});

/*-------HASH METHOD TO ENCRYPT USER PASSWORD-------*/
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

/*-----COMPARE ENCRYPTED PASSWORD TO USER PASSWORD--------*/
userSchema.methods.validPassword = function(password) {
	//allows user to login if password entered is the same as the encrypted version
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);