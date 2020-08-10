const {
    check
} = require('express-validator');

exports.Validator = [

    check('projectId')
    .not()
    .isEmpty()
    .withMessage('cant be empty')
    .isNumeric()
    .withMessage('must be a number'),


    check('activityId')
    .not()
    .isEmpty()
    .withMessage('cant be empty')
    .isNumeric()
    .withMessage('must be a number'),
]