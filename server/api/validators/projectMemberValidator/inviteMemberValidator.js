const {
    check,

} = require('express-validator');
const invitedEmails = require('../../models/invitedEmails');

// Checking if the attributes provided are valid
exports.Validator = [
    // Email validation
    check('email')
    .custom((value) => !/\s/.test(value))
    .withMessage('No spaces are allowed in the email')
    .not()
    .isEmpty()
    .withMessage('email cant be empty')
    .isString()
    .withMessage('email must be string')
    .isEmail()
    .normalizeEmail()
    .withMessage('email is not valid')
    .custom((email, {
        req
    }) => {
        return invitedEmails.findOne({
            where: {
                email: email,
                projectId: req.body.projectId
            }
        }).then((result) => {
            if (result) {
                return Promise.reject('email already invited to project')
            } else {
                return true
            }
        })
    }),

    check('projectId')
    .not()
    .isEmpty()
    .withMessage('projectId cant be empty')
    .isNumeric()
    .withMessage('projectId must be a number'),

    check('message')
    .isString()
    .withMessage('message must be string')
    .isLength({
        max: 500
    })
    .withMessage('message cant be more than 500 characters long'),
];