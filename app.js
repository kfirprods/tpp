// ==================
// Imports
// ==================
var express = require('express');
var mongoose = require('mongoose');
var models = require('./models');

var app = express();


// ==================
// Mongo
// ==================
mongoose.connect('mongodb://localhost/tpp');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to tpp mongo db");
});

// ==================
// Express
// ==================
app.get('/', function (req, res) {
    models.User.find({}, function(err, foundUsers) {
       console.log(foundUsers);
    });
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});
