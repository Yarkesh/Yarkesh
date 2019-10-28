const {
    check
} = require('express-validator');

exports.Validator = [

    check('sprintId')
    .not()
    .isEmpty()
    .withMessage('sprintId cant be empty')
    .isString()
    .withMessage('sprintId must be string')
    .isNumeric()
    .withMessage('sprintId must be a number'),


    check('projectId')
    .not()
    .isEmpty()
    .withMessage('projectId cant be empty')
    .isString()
    .withMessage('projectId must be string')
    .isNumeric()
    .withMessage('projectId must be a number'),

]