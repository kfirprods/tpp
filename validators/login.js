const Joi = require('joi');

module.exports = {
    body: {
        username: Joi.string().alphanum().min(3).max(32).required(),
        password: Joi.string().min(3).max(32).required()
    }
};
