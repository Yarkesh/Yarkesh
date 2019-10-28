const {
    check,
    validationResult
} = require('express-validator');
const errorHandler = require('../../controllers/errorHandler');
const Users = require('../../models/users');
const NotConfirmedUsers = require('../../models/notConfirmedUsers');
const bcrypt = require('bcrypt')

exports.Validator = [
    check('password')
    .custom((password, {
        req
    }) => {
        return comparePassword2(req.user.userId, password).catch((err) => {
            return Promise.reject(err)
        }).then(() => {
            return true
        })
    }),



    check('newPassword')
    .not()
    .isEmpty()
    .withMessage('newPassword cant be empty')
    .isString()
    .withMessage('newPassword must be string')
    .isLength({
        min: 6,
        max: 40
    })
    .withMessage('newPassword must be at least 6 characters long , max 40 chars')
    .matches(/\d/)
    .withMessage('newPassword must contain a number')

    .custom((valuee, {
        req
    }) => {
        if (valuee !== req.body.confirmNewPassword) {
            throw new Error('newPassword confirmation is incorrect');
        } else {
            return true;
        }
    })
    //TODO new password can't be the same as the old one
]


comparePassword2 = (userId, password) => {
    return new Promise((resolve, reject) => {
        return Users.findOne({
            where: {
                userId: userId
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
            errorCode: '7',
            errors: handledErrorsList
        });
    } else {
        next()
    }
}