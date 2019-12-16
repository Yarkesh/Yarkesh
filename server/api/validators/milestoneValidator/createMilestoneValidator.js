const {
    check
} = require('express-validator');

exports.Validator = [
    check('title')
    .not()
    .isEmpty()
    .withMessage('title cant be empty')
    .isString()
    .withMessage('title must be string')
    .isLength({
        min: 2,
        max: 32
    })
    .withMessage('title must be  between 2 and 32 characters long'),


    check('projectId')
    .not()
    .isEmpty()
    .withMessage('projectId cant be empty')
    .isNumeric()
    .withMessage('projectId must be a number'),

]