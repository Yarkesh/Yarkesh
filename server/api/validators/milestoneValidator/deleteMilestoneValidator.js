const {
    check
} = require('express-validator');

exports.Validator = [

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

]