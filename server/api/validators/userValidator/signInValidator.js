const {
    check
} = require('express-validator');
const Users = require('../../models/users');
const NotConfirmedUsers = require('../../models/notConfirmedUsers');
const Stories = require('../../models/stories');
const bcrypt = require('bcrypt');



exports.signIn = [
    check('email')
    .isEmail()
    .normalizeEmail()
    .withMessage(
        'email is not valid'
    )
    .custom((email) => {
        return Users.findOne({
            where: {
                email: email
            }
        }).then((res) => {
            if (!res) {
                return NotConfirmedUsers.findOne({
                    where: {
                        email: email
                    }
                }).then((notConfirmed) => {
                    if (notConfirmed) {
                        return Promise.reject('email not confirmed , please confirm your email')
                    } else {
                        return Promise.reject('email not found');

                    }
                })


            }
        });
    }),
    check('password')
    .custom((password, {
        req
    }) => {
        return Users.findOne({
            where: {
                email: req.body.email
            }
        }).then((user) => {
            if (user) {
                console.log(req.body)
                bcrypt.compare(
                    password,
                    user.password,
                    (err, check) => {
                        if (err) {
                            return Promise.reject('compare not successfull')
                        } else
                        if (!check) {
                            return Promise.reject('password incorrect1')
                        }
                    }
                );
            } else {
                NotConfirmedUsers.findOne({
                    where: {
                        email: req.body.email
                    }
                }).then(notConfirmedUser => {
                    if (notConfirmedUser) {
                        bcrypt.compare(
                            password,
                            notConfirmedUser.password,
                            (err, check) => {
                                if (!check) {
                                    Promise.reject('password incorrect2')
                                }

                            }
                        );
                    }

                })
            }
        })

    })

]