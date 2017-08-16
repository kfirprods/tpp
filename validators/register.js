var Joi = require('joi');
var loginValidator = require('./login');

module.exports = {
    body: {
        ...loginValidator.body,
        email: Joi.string().email().required()
    }
};
