var Joi = require('joi');

module.exports = {
    body: {
        username: Joi.string().required(),
        password: Joi.string().regex(/.{3,32}/).required()
    }
};
