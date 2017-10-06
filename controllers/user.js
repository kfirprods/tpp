const User = require("../models").User;

module.exports.getAllUsernames = function(req, res) {
    User.getAllUsernames(req.query.q, function(err, usernames) {
        res.json(usernames);
    });
};

module.exports.getCurrentUser = function(req, res) {
    res.json({ username: req.user.username });
};
