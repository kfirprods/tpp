var Joi = require('joi');

var constants = require("../consts");

module.exports = {
    body: {
        // Title must start with a digit or a letter, but spaces are allowed within
        title: Joi.string().regex(/^[\w\d#-][\w\d#-\s]+/).min(3).max(30).required(),
        ruleType: Joi.string().valid(Object.values(constants.RULE_TYPES)).required(),
        regularExpressions: Joi.array().items(Joi.string()).required()
    }
};
