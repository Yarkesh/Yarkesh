const {
    check
} = require('express-validator');
const Users = require('../../models/users');
const NotConfirmedUsers = require('../../models/notConfirmedUsers');

exports.confirmEmail = [
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
        return isValidated(email).catch(() => {
                return Promise.reject('email already validated')
            })
            .then(() => {
                return emailExist(email).then(() => {
                        return true;
                    })
                    .catch(() => {
                        return Promise.reject('email not found')
                    })
            })


    }),

    check('code')
    .not()
    .isEmpty()
    .withMessage('code cant be empty')
    .isString()
    .withMessage('code must be string')
    .isLength({
        min: 4,
        max: 4
    }).withMessage("code is 4 chars long")
    .custom((code, {
        req
    }) => {
        return NotConfirmedUsers.findOne({
            where: {
                email: req.body.email
            }
        }).then((notConfUser) => {
            if (notConfUser) {
                if (code !== notConfUser.confirmationCode) {
                    throw new Error('confirmation code is incorrect');
                } else {
                    return true;
                }
            } else {
                return true
            }
        }).catch()

    })

]


emailExist = (email) => {
    return new Promise((resolve, reject) => {
        return NotConfirmedUsers.findOne({
            where: {
                email: email
            }
        }).then((result) => {
            if (result) {
                return resolve();
            } else {
                return reject()
            }
        });
    })

}


isValidated = (email) => {
    return new Promise((resolve, reject) => {
        return Users.findOne({
            where: {
                email: email
            }
        }).then((result) => {
            console.log(result)
            if (result) {
                return reject();
            } else {
                return resolve()
            }
        });
    })
}