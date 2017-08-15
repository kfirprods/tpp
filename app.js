// ==================
// Imports
// ==================
var express = require('express');
var session = require('express-session');
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var passport = require('passport');
var models = require('./models');
var cors = require("cors");

// ==================
// Express
// ==================
var app = express();

app.use(cors());
app.use(session({ secret: 'tea-pee-pee', resave: true, saveUninitialized: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(require('./routes'));

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
