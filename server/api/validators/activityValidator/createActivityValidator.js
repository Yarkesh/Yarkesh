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
        max: 64
    })
    .withMessage('activityName must be  between 2 and 64 characters long'),


    check('projectId')
    .not()
    .isEmpty()
    .withMessage('projectId cant be empty')
    .isNumeric()
    .withMessage('projectId must be a number'),

]