const {
    check
} = require('express-validator');

exports.userSearch = [
    check('email')
    .custom((value) => !/\s/.test(value))
    .withMessage('No spaces are allowed in the email')
    .not()
    .isEmpty()
    .withMessage('email cant be empty')
    .isString()
    .withMessage('email must be string')
    .isLength({
        max: 50
    })
    .withMessage("email can't be more than 50 characters")
]