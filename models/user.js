var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');


var userSchema = mongoose.Schema({
    username: {
        type: String,
        validate: {
            validator: function(val, next) {
                User.find({username: val}, function (err, matches) {
                    next(matches.length == 0);
                });
            },
            message: "The selected username is already in use"
        }
    },
    email: {
        type: String,
        validate: {
            validator: function(val, next) {
                User.find({email: val}, function (err, matches) {
                    next(matches.length == 0);
                });
            },
            message: "The selected email is already in use"
        }
    },
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
    var hashedPassword = bcrypt.hashSync(rawPassword, 8);
    User.create({ username: username, email: email, password: hashedPassword, projectIds: [] }, callback);
};

module.exports.getAllUsernames = function(callback) {
    User.find({}, function(err, users) {
        if (err) {
            callback(err, []);
        }
        else {
            let usernames = [];
            for (let user of users) {
                usernames.push(user.username);
            }

            callback(null, usernames);
        }
    });
};
