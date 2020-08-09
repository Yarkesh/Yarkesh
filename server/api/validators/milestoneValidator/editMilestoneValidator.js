const {
    check
} = require('express-validator');

exports.Validator = [
    check('title')
    .not()
    .isEmpty()
    .optional()
    .isString()
    .withMessage('title must be string')
    .isLength({
        min: 2,
        max: 32
    })
    .withMessage('title must be  between 2 and 32 characters long'),

    check('description')
    .optional()
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
    .withMessage('projectId cant be empty')
    .isNumeric()
    .withMessage('projectId must be a number'),

    check('milestoneId')
    .not()
    .isEmpty()
    .withMessage('cant be empty')
    .isNumeric()
    .withMessage('must be a number'),

    check('milestoneDuration')
    .optional()
    .not()
    .isEmpty()
    .withMessage('cant be empty')
    .isNumeric()
    .withMessage('must be a number'),
]