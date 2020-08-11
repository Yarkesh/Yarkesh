const {
    check
} = require('express-validator');

exports.Validator = [

    check('sprintId')
    .not()
    .isEmpty()
    .withMessage('sprintId cant be empty')
    .isNumeric()
    .withMessage('sprintId must be a number'),


    check('projectId')
    .not()
    .isEmpty()
    .withMessage('projectId cant be empty')
    .isNumeric()
    .withMessage('projectId must be a number'),

]