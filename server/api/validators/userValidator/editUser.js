const {
    check,
} = require('express-validator');

// Checking if the attributes provided are valid
exports.Validator = [
    // nickName validation
    check('nickName')
    .not()
    .isEmpty()
    .withMessage('nickName cant be empty')
    .isString()
    .withMessage('nickName must be string')
    .isLength({
        min: 2,
        max: 32
    })
    .withMessage('nickName must be  between 2 and 32 characters long'),

    // name validation
    check('name')
    .not()
    .isEmpty()
    .withMessage('name cant be empty')
    .isString()
    .withMessage('name must be string')
    .isLength({
        min: 2,
        max: 32
    })
    .withMessage('name must be  between 2 and 32 characters long'),
];