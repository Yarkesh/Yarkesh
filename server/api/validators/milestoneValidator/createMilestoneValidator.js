const {
    check
} = require('express-validator');

exports.Validator = [
    check('title')
    .not()
    .isEmpty()
    .withMessage('cant be empty')
    .isString()
    .withMessage('must be string')
    .isLength({
        min: 2,
        max: 32
    })
    .withMessage('must be  between 2 and 32 characters long'),


    check('description')
    .isString()
    .withMessage('must be string')
    .isLength({
        min: 2,
        max: 500
    })
    .withMessage('must be  between 2 and 500 characters long'),


    check('projectId')
    .not()
    .isEmpty()
    .withMessage('cant be empty')
    .isNumeric()
    .withMessage('must be a number'),


    check('milestoneDuration')
    .not()
    .isEmpty()
    .withMessage('cant be empty')
    .isNumeric()
    .withMessage('must be a number')
]