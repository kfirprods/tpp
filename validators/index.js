const loginValidator = require("./login");
const registerValidator = require("./register");
const projectValidator = require("./project");
const ruleValidator = require("./rule");


module.exports.login = loginValidator;
module.exports.register = registerValidator;
module.exports.project = projectValidator;
module.exports.rule = ruleValidator;
