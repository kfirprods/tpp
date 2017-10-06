// ==================
// Imports
// ==================
const express = require('express');
const session = require('express-session');
const expressValidation = require('express-validation');
const expressFileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const models = require('./models');
const cors = require('cors');

// ==================
// Express
// ==================
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(session({ secret: 'tea-pee-pee' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(expressFileUpload());
app.use(require('./routes'));

// Error handler
app.use(function (err, req, res) {
    // specific for validation errors
    if (err instanceof expressValidation.ValidationError) {
        return res.status(err.status).json(err);
    }

    // other type of errors, it *might* also be a Runtime Error
    if (process.env.NODE_ENV !== 'production') {
        console.log(err);
        return res.status(500).send(err.stack);
    } else {
        return res.sendStatus(500);
    }
});

app.listen(3001, function () {
    console.log('tpp backend is now listening on port 3001!')
});


// ==================
// Mongo
// ==================
mongoose.connect('mongodb://localhost/tpp');

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error:'));
db.once('open', function() {
    console.log("Connected to tpp mongo db");
});
