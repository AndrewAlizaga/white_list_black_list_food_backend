//Libs
const {body} = require("express-validator")

//Check for name & password
const accountValidator = [
    body('name').notEmpty().withMessage('Wrong request, missing name attribute'),
    body('password').notEmpty().withMessage('Wrong request, missing password attribute'),
]

module.exports = accountValidator;
