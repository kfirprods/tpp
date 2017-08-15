var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');


var userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    projectIds: [mongoose.Schema.Types.ObjectId]
});

var User = module.exports = mongoose.model('User', userSchema);
module.exports.getUserByCredentials = function(username, rawPassword, callback) {
    console.log("getUserByCredentials();");
    User.findOne({ username: username }, function(err, user) {
        console.log("User.findOne");
        if (user == null) {
            console.log("Username not found: ", username);
            callback(null, null);
            return;
        }

        var isMatch = bcrypt.compareSync(rawPassword, user.password);
        if (isMatch) {
            callback(null, user);
            return;
        }
        else {
            console.log("Password did not match:", rawPassword);
        }

        callback(null, null);
    });

};

module.exports.createUser = function(username, email, rawPassword, callback) {
    var hashedPassword = bcrypt.hashSync(rawPassword, 8);
    User.create({ username: username, email: email, password: hashedPassword, projectIds: [] }, callback);
};

// TODO: Export more functions here
