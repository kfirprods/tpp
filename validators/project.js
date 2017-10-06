const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const loginValidator = require("./login");
const constants = require("../consts");

module.exports = {
    body: {
        // Title must start with a digit or a letter, but spaces are allowed within
        title: Joi.string().regex(/^[\w\d][\w\d\s]+$/).min(3).max(32).required(),
        rules: Joi.array().items(Joi.objectId()).required(),
        userPermissions: Joi.array().items(Joi.object({
            username: loginValidator.body.username,
            permission: Joi.string().valid(Object.values(constants.PROJECT_USER_PERMISSIONS)).required()
        })),
        repository: Joi.object({
            address: Joi.string().required(),
            username: Joi.string().allow(""),
            password: Joi.string().allow(""),
            sourceBranch: Joi.string().default("default"),
            targetBranch: Joi.string().default("tpp")
        }).required()
    }
};
