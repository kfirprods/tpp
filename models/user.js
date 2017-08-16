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
    User.findOne({ username: username }, function(err, user) {
        if (user == null) {
            callback(null, null);
            return;
        }

        var isMatch = bcrypt.compareSync(rawPassword, user.password);
        if (isMatch) {
            console.log(username, "logged in!");
            callback(null, user);
            return;
        }
        else {
            console.log("A failed login attempt to user", username);
        }

        callback(null, null);
    });
};

module.exports.createUser = function(username, email, rawPassword, callback) {
    if (User.any({ username: username })) {
        callback({ message: "The selected username is already in use" }, null);
        return;
    }
    if (User.any({ email: email })) {
        callback({ message: "The selected email is already in use" }, null);
        return;
    }

    var hashedPassword = bcrypt.hashSync(rawPassword, 8);
    User.create({ username: username, email: email, password: hashedPassword, projectIds: [] }, callback);
};

// TODO: Export more functions here
