const {
    check
} = require('express-validator');
const Users = require('../../models/users');
const NotConfirmedUsers = require('../../models/notConfirmedUsers');
const bcrypt = require('bcrypt');

exports.changePassword = [
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
        return emailExist(email).then(() => {
                return true;
            })
            .catch(() => {
                return Promise.reject('email not found')
            })


    }),

    check('forgotPasswordCode')
    .not()
    .isEmpty()
    .withMessage('code cant be empty')
    .isString()
    .withMessage('code must be string')
    .isLength({
        min: 4,
        max: 4
    }).withMessage("code is 4 chars long")

    .custom((forgotPasswordCode, {
        req
    }) => {
        return compareCode(req.body.email, forgotPasswordCode).catch((err) => {
            return Promise.reject(err)
        }).then(() => {
            return true
        })
    })

]


emailExist = (email) => {
    return new Promise((resolve, reject) => {
        return Users.findOne({
            where: {
                email: email
            }
        }).then((user) => {
            if (user) {
                return resolve();
            } else {
                return NotConfirmedUsers.findOne({
                    where: {
                        email: email
                    }
                }).then((notConfUser) => {
                    if (notConfUser) {
                        return resolve()
                    } else {
                        return reject()
                    }
                })
            }
        });
    })

}


compareCode = (email, code) => {
    return new Promise((resolve, reject) => {
        return Users.findOne({
            where: {
                email: email
            }
        }).then((user) => {
            if (user) {
                if (code == user.forgotPasswordCode) {
                    return resolve();

                } else {
                    return reject('Code incorrect');

                }
            } else {
                return NotConfirmedUsers.findOne({
                    where: {
                        email: email
                    }
                }).then((notConfUser) => {
                    if (notConfUser) {
                        if (code == notConfUser.forgotPasswordCode) {
                            return resolve();

                        } else {
                            return reject('Code incorrect');

                        }
                    } else {
                        resolve()
                    }
                })
            }
        });
    });
};