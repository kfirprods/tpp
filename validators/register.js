const Joi = require('joi');
const loginValidator = require('./login');

module.exports = {
    body: {
        ...loginValidator.body,
        email: Joi.string().email().required()
    }
};
