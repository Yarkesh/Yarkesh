const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const {
    validationResult
} = require('express-validator');
const randomstring = require('randomstring');
const Users = require('../../models/users');
const errorHandler = require('../errorHandler');
const NotConfirmedUsers = require('../../models/notConfirmedUsers');
const mailController = require('../mailController');

const jwtSecret = config.app.webServer.jwtSecret;

exports.signUp = (req, res) => {
    // TODO FIX ERRORHANDLER
    // first we go to validation to validate the errors.
    // then we get a list and we call errorHandler.handler on it
    // then we get another list called handledErrorsList which contains errors
    const errorsList = validationResult(req).errors;
    const handledErrorsList = errorHandler.handler(errorsList);
    if (Object.keys(handledErrorsList).length > 0) {
        return res.status(422).json({
            errorCode: '1',
            errors: handledErrorsList
        });
    }
    // hasing the password
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        // if hashing fails
        if (err) {
            //hash fail
            return res.status(500).json({
                message: 'sign up failed',
                errorCode: '20'
            });
        } else if (hash) {
            //creating confirmation code
            let confirmationCode = randomstring.generate({
                length: 4,
                charset: 'numeric'
            });
            NotConfirmedUsers.create({
                    userName: req.body.userName,
                    email: req.body.email,
                    name: req.body.name,
                    password: hash,
                    confirmationCode: confirmationCode
                }).then((notConfirmeduser) => {
                    //sending confirmation email
                    mailController
                        .emailVerification(req.body.email, confirmationCode)
                    return res.status(200).json({
                        // sign up success
                        message: 'sign up complete, email verfication sent',
                        userName: notConfirmeduser.userName,
                        email: notConfirmeduser.email,
                        notConfirmedUserId: notConfirmeduser.userId
                    });


                })
                .catch((err) => {
                    //create fail
                    return res.status(500).json({
                        message: 'sign up failed',
                        errorCode: '21',
                        err
                    });
                });

        }
    });
};

module.exports.confirmEmail = (req, res) => {
    const errorsList = validationResult(req).errors;
    const handledErrorsList = errorHandler.handler(errorsList);
    if (Object.keys(handledErrorsList).length > 0) {
        return res.status(422).json(handledErrorsList);
    }
    NotConfirmedUsers.findAll({
            where: {
                email: req.body.email
            }
        })
        .then((users) => {
            let confirmedUser = users[0];
            if (req.body.code == confirmedUser.confirmationCode) {
                NotConfirmedUsers.destroy({
                    where: {
                        email: req.body.email
                    }
                });
                Users.create({
                    userName: confirmedUser.userName,
                    email: confirmedUser.email,
                    name: confirmedUser.name,
                    password: confirmedUser.password,
                    avatar: config.get('app.webServer.baseUrl') +
                        '/pictures/users/defaultAvatar.jpg'
                });
                return res.status(200).json({
                    message: 'your account has been activated'
                });
            }
        })
        .catch();
};

exports.signIn = (req, res) => {
    const errorsList = validationResult(req).errors;
    const handledErrorsList = errorHandler.handler(errorsList);
    if (Object.keys(handledErrorsList).length > 0) {
        return res.status(422).json(handledErrorsList);
    }
    // finding the user in database with given email
    NotConfirmedUsers.findAll({
            where: {
                email: req.body.email
            }
        })
        .then((unconfirmedUser) => {
            if (unconfirmedUser.length != 0) {
                return res.status(500).json({
                    message: 'account not verified.verify your email please'
                });
            }
            // ! fix this shit
        })
        .catch();

    Users.findAll({
            where: {
                email: req.body.email
            }
        })
        .then((user) => {
            // if user with such email does not exist
            if (user.length == 0) {
                return res.status(404).json({
                    message: 'email or password incorrect'
                });
                // if user with this email exists
            } else {
                let firstuser = user[0];
                // checking if the password given is equal to the password in database
                bcrypt.compare(
                    req.body.password,
                    firstuser.password,
                    (err, check) => {
                        if (err) {
                            return res.status(500).json({
                                message: 'compare not complete'
                            });
                        } else if (check) {
                            // if passwords are correct
                            // creating the jwt for user
                            const jwtpayload = {
                                name: firstuser.name,
                                email: firstuser.email,
                                userId: firstuser.userId,
                                userName: firstuser.userName,
                                avatar: firstuser.avatar
                            };
                            jwt.sign(
                                jwtpayload,
                                jwtSecret, {
                                    expiresIn: '10h'
                                },
                                (err, encoded) => {
                                    if (err) {
                                        throw new Error('error in jwt');
                                    } else {
                                        return res.status(200).json({
                                            done: true,
                                            secret: 'bearer ' + encoded
                                        });
                                    }
                                }
                            );
                            // if passwords did not match that means password incorrect
                        } else {
                            return res.status(404).json({
                                message: 'email or password incorrect'
                            });
                        }
                    }
                );
            }
        })
        // ! fix this shit
        .catch();
};