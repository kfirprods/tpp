var express = require('express');
var expressValidation = require('express-validation');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require("./models").User;
var Project = require("./models").Project;
var validators = require("./validators");
var constants = require("./consts");

var router = express.Router();

// ==========
// Passport configuration
// ==========
passport.use(new LocalStrategy(
    function(username, password, done) {
        User.getUserByCredentials(username, password, function(err, user) {
            if (!user) {
                return done(null, false, {message: 'Incorrect username or password.'});
            }
            else {
                return done(null, user);
            }
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

// ==========
// Authentication API
// ==========
function isAuthenticatedMiddleware(req,res,next){
    if(req.user)
        return next();
    else
        return res.status(401).json({
            error: 'User not authenticated'
        });
}

router.post('/login', expressValidation(validators.login), function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
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
});

router.post('/register', expressValidation(validators.register), function(req, res, next) {
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
});

router.get("/projects", isAuthenticatedMiddleware, function(req, res, next) {
    Project.getProjectsByUsername(req.user.username, function (err, projects) {
        if (err) {
            console.log("getProjectsByUsername error:", err);
            res.sendStatus(500);
        }
        else {
            res.json(projects);
        }
    });
});

router.post("/projects", [isAuthenticatedMiddleware, expressValidation(validators.project)],
    function(req, res, next) {
        var permissionsIncludingUser = [...req.body.userPermissions,
            {username: req.user.username, permission: constants.PROJECT_USER_PERMISSIONS.FULL}];

        Project.createProject(req.body.title, req.body.rules, permissionsIncludingUser, function(err, project) {
           if (err) {
               console.log("createProject error:", err);
               res.sendStatus(500);
           }
           else {
               res.sendStatus(200);
           }
        });
});

module.exports = router;
