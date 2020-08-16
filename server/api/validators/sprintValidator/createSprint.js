const {
    check
} = require('express-validator');

exports.Validator = [
    check('sprintName')
    .not()
    .isEmpty()
    .withMessage('sprintName cant be empty')
    .isString()
    .withMessage('sprintName must be string')
    .isLength({
        min: 2,
        max: 64
    })
    .withMessage('title must be  between 2 and 64 characters long'),


    check('projectId')
    .not()
    .isEmpty()
    .withMessage('projectId cant be empty')
    .isNumeric()
    .withMessage('projectId must be a number'),


]