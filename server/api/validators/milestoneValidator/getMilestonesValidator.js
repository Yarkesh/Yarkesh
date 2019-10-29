const {
    check
} = require('express-validator');

exports.Validator = [

    check('projectId')
    .not()
    .isEmpty()
    .withMessage('projectId cant be empty')
    .isString()
    .withMessage('projectId must be string')
    .isNumeric()
    .withMessage('projectId must be a number'),

]