const {
    check
} = require('express-validator');
const Users = require('../../models/users');
const NotConfirmedUsers = require('../../models/notConfirmedUsers');

exports.forgotPassword = [
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