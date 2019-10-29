const {
    check
} = require('express-validator');

exports.Validator = [
    check('activityName')
    .not()
    .isEmpty()
    .withMessage('activityName cant be empty')
    .isString()
    .withMessage('activityName must be string')
    .isLength({
        min: 2,
        max: 32
    })
    .withMessage('activityName must be  between 2 and 32 characters long'),


    check('projectId')
    .not()
    .isEmpty()
    .withMessage('projectId cant be empty')
    .isString()
    .withMessage('projectId must be string')
    .isNumeric()
    .withMessage('projectId must be a number'),

]