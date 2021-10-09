//Libs
const {body} = require("express-validator")

//Check for name & password
const postValidator = [
    body('title').notEmpty().withMessage('Wrong request, missing title attribute'),
    body('text').notEmpty().withMessage('Wrong request, missing text attribute'),
]

module.exports = postValidator;
