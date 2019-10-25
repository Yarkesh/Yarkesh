const {
    check,
    validationResult
} = require('express-validator');
const errorHandler = require('../../controllers/errorHandler');
const Users = require('../../models/users');
const NotConfirmedUsers = require('../../models/notConfirmedUsers');
const bcrypt = require('bcrypt');


exports.signIn = [
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
    .isLength({
        min: 7,
        max: 50
    })
    .withMessage("email can't be more than 50 characters long")
    .custom((email) => {
        return isConfirmed(email)
            .catch(() => {
                return isNotConfirmed(email)
                    .catch(() => {
                        return Promise.reject('email not found');
                    })
                    .then(() => {
                        return Promise.reject(
                            'email not activated. please confirm your email'
                        );
                    });
            })
            .then(() => {
                return true;
            });
    }),

    check('password')
    .custom((password, {
        req
    }) => {
        return comparePassword(req.body.email, password).catch((err) => {
            return Promise.reject(err)
        }).then(() => {
            return true
        })
    })

];

isConfirmed = (email) => {
    return new Promise((resolve, reject) => {
        return Users.findOne({
            where: {
                email: email
            }
        }).then((result) => {
            if (result) {
                return resolve();
            } else {
                return reject();
            }
        });
    });
};

//this email exissts in notConfirmedUsers table
isNotConfirmed = (email) => {
    return new Promise((resolve, reject) => {
        return NotConfirmedUsers.findOne({
            where: {
                email: email
            }
        }).then((result) => {
            if (result) {
                return resolve();
            } else {
                return reject();
            }
        });
    });
};

comparePassword = (email, password) => {
    return new Promise((resolve, reject) => {
        return Users.findOne({
            where: {
                email: email
            }
        }).then((user) => {
            if (user) {
                return bcrypt.compare(password, user.password, (error, correct) => {
                    if (error) {
                        return reject('compare not successfull');
                    } else if (!correct) {
                        return reject('password incorrect');
                    } else if (correct) {
                        return resolve();
                    }

                });
            } else {
                resolve()
            }
        });
    });
};


module.exports.isValid = (req, res, next) => {
    const errorsList = validationResult(req).errors;
    const handledErrorsList = errorHandler.handler(errorsList);
    if (Object.keys(handledErrorsList).length > 0) {
        return res.status(422).json({
            errorCode: '3',
            errors: handledErrorsList
        });
    } else {
        next()
    }
}