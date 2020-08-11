const {
    check,
    validationResult
} = require('express-validator');
const errorHandler = require('../../controllers/errorHandler');

exports.Validator = [
    check('storyName')
    .not()
    .isEmpty()
    .withMessage('cant be empty')
    .isString()
    .withMessage('must be string')
    .isLength({
        min: 2,
        max: 32
    })
    .withMessage('must be between 2 and 32 characters long'),

    check('projectId')
    .not()
    .isEmpty()
    .withMessage('projectId cant be empty')
    .isNumeric()
    .withMessage('projectId must be a number'),

    check('as')
    .not()
    .isEmpty()
    .withMessage(' cant be empty')
    .isString()
    .withMessage(' must be string')
    .isLength({
        min: 2,
        max: 500
    })
    .withMessage('must be between 2 and 500 characters long'),

    check('iWant')
    .not()
    .isEmpty()
    .withMessage(' cant be empty')
    .isString()
    .withMessage(' must be string')
    .isLength({
        min: 2,
        max: 500
    })
    .withMessage('must be between 2 and 500 characters long'),

    check('soThat')
    .not()
    .isEmpty()
    .withMessage(' cant be empty')
    .isString()
    .withMessage(' must be string')
    .isLength({
        min: 2,
        max: 500
    })
    .withMessage('must be between 2 and 500 characters long'),

    check('acceptanceTest.*.text')
    .not()
    .isEmpty()
    .withMessage(' cant be empty')
    .isString()
    .withMessage(' must be string')
    .isLength({
        min: 2,
        max: 500
    })
    .withMessage('must be between 2 and 500 characters long'),

    check('acceptanceTest.*.checked')
    .isIn(['true', 'false'])
    .withMessage('must be true or false'),

    check('status')
    .isString()
    .withMessage('must be string')
    .isIn(['todo', 'done', 'in progress'])
    .withMessage('must be in [todo , done , in progress]'),

    check('storyPoint')
    .not()
    .isEmpty()
    .withMessage('cant be empty')
    .isNumeric()
    .withMessage('must be a number'),

    check('priority')
    .isString()
    .withMessage('must be string')
    .isIn(['could', 'should', 'must']),

    check('isEpic')
    .isIn(['true', 'false'])
    .withMessage('must be true or false'),

    check('dependency')
    .isArray()
    .withMessage('must be array'),

    check('dependency[*]')
    .isNumeric()
    .withMessage('must be number'),

    check('assignment')
    .isArray()
    .withMessage('must be array'),

    check('assignment[*]')
    .isNumeric()
    .withMessage('must be number'),
]