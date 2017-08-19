// ==================
// Imports
// ==================
var express = require('express');
var session = require('express-session');
var expressValidation = require('express-validation');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var models = require('./models');
var cors = require('cors');

// ==================
// Express
// ==================
var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(session({ secret: 'tea-pee-pee' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(require('./routes'));

// Error handler
app.use(function (err, req, res, next) {
    // specific for validation errors
    if (err instanceof expressValidation.ValidationError) {
        return res.status(err.status).json(err);
    }

    // other type of errors, it *might* also be a Runtime Error
    if (process.env.NODE_ENV !== 'production') {
        console.log(err);
        return res.status(500).send(err.stack);
    } else {
        return res.status(500);
    }
});

app.listen(3001, function () {
    console.log('tpp backend is now listening on port 3001!')
});


// ==================
// Mongo
// ==================
mongoose.connect('mongodb://localhost/tpp');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error:'));
db.once('open', function() {
    console.log("Connected to tpp mongo db");
});
