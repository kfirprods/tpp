var passport = require('passport');

var User = require("../models").User;


module.exports.login = function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            console.log("Login error", err);
            res.sendStatus(400);
            return;
        }

        if (!user) {
            res.status(401).json(info);
        }
        else {
            req.logIn(user, function (err) {
                res.sendStatus(200);
            });
        }
    })(req, res, next);
};

module.exports.register = function(req, res, next) {
    User.createUser(req.body.username, req.body.email, req.body.password, function(err, user) {
        if (err) {
            res.status(403).json(err);
            return;
        }

        req.login(user, function(err) {
            if (err) {
                console.log("Error during register", err);
                res.status(500);
                return;
            }

            res.sendStatus(200);
        });
    });
};
