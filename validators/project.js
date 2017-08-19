var Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

var loginValidator = require("./login");
var constants = require("../consts");

module.exports = {
    body: {
        // Title must start with a digit or a letter, but spaces are allowed within
        title: Joi.string().regex(/^[\w\d][\w\d\s]+/).min(3).max(30).required(),
        rules: Joi.array().items(Joi.objectId()).required(),
        userPermissions: Joi.array().items(Joi.object({
            username: loginValidator.body.username,
            permission: Joi.string().valid(Object.values(constants.PROJECT_USER_PERMISSIONS)).required()
        }))
    }
};
