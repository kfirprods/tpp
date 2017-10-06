const Joi = require('joi');

const constants = require("../consts");


module.exports = {
    body: {
        // Title must start with a digit or a letter, but spaces are allowed within
        title: Joi.string().regex(/^[\w\d#\-][\w\d#\-\s]+$/).min(3).max(32).required(),
        description: Joi.string().default("This rule has no description").allow(""),
        categories: Joi.array().items(Joi.string()).required(),
        ruleType: Joi.string().valid(Object.values(constants.RULE_TYPES)).required(),
        regularExpressions: Joi.array().items(Joi.string()).required()
    }
};
