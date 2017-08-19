var loginValidator = require("./login");
var registerValidator = require("./register");
var projectValidator = require("./project");
var ruleValidator = require("./rule");


module.exports.login = loginValidator;
module.exports.register = registerValidator;
module.exports.project = projectValidator;
module.exports.rule = ruleValidator;
