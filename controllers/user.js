var User = require("../models").User;

module.exports.getAllUsernames = function(req, res, next) {
    User.getAllUsernames(function(err, usernames) {
        res.json(usernames);
    });
};
