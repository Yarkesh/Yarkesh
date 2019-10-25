const {
    check,
    validationResult
} = require('express-validator');
const errorHandler = require('../../controllers/errorHandler');

exports.userSearch = [
    check('email')
    .custom((value) => !/\s/.test(value))
    .withMessage('No spaces are allowed in the email')
    .not()
    .isEmpty()
    .withMessage('email cant be empty')
    .isString()
    .withMessage('email must be string')
    .isLength({
        max: 50
    })
    .withMessage("email can't be more than 50 characters")
]

module.exports.isValid = (req, res, next) => {
    const errorsList = validationResult(req).errors;
    const handledErrorsList = errorHandler.handler(errorsList);
    if (Object.keys(handledErrorsList).length > 0) {
        return res.status(422).json({
            errorCode: '6',
            errors: handledErrorsList
        });
    } else {
        next()
    }
}