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
const Project = require('../../models/projects');
const invitedEmails = require('../../models/invitedEmails');
const _ = require('lodash');
const ProjectMembers = require('../../models/projectMembers');

const jwtSecret = config.app.webServer.jwtSecret;

exports.signUp = (req, res) => {
    // hasing the password
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        // if hashing fails
        if (err) {
            //hash fail
            return res.status(500).json({
                message: 'sign up failed',
                errorCode: '320'
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
                        // notConfirmedUserId: notConfirmeduser.userId
                    });
                })
                .catch((err) => {
                    //create fail
                    return res.status(500).json({
                        message: 'sign up failed',
                        errorCode: '321',

                    });
                });

        }
    });
};

module.exports.confirmEmail = (req, res) => {

    NotConfirmedUsers.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            NotConfirmedUsers.destroy({
                    where: {
                        email: req.body.email
                    }
                }).then(() => {
                    Users.create({
                            userName: user.userName,
                            email: user.email,
                            name: user.name,
                            password: user.password,
                            avatar: config.get('app.webServer.baseUrl') +
                                '/pictures/users/defaultAvatar.jpg'
                        }).then(user => {
                            invitedEmails.findAll({
                                where: {
                                    email: user.email
                                }
                            }).then((invites) => {
                                projectIdList = (invites.map((invite) => {
                                    return invite.projectId;
                                }))
                                _.forEach(projectIdList, (projectId) => {
                                    ProjectMembers.create({
                                        memberId: user.userId,
                                        projectId: projectId
                                    })
                                })
                                res.status(200).json({
                                    message: 'your account has been activated'
                                });
                            })


                        })
                        .catch(() => {
                            return res.status(500).json({
                                //creating new user in user table failed
                                message: 'confirmation failed',
                                errorCode: '325',
                            });
                        })

                })
                .catch(() => {
                    return res.status(500).json({
                        //destroying user in notconfirmed table failed
                        message: 'confirmation failed',
                        errorCode: '324',
                    });
                })
        })
        .catch(() => {
            return res.status(500).json({
                //couldn't find user email in not confiremd table
                message: 'confirmation failed',
                errorCode: '323',

            });
        })

};

exports.signIn = (req, res) => {
    Users.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        const jwtpayload = {
            name: user.name,
            email: user.email,
            userId: user.userId,
            userName: user.userName,
            avatar: user.avatar
        };
        jwt.sign(
            jwtpayload,
            jwtSecret, {
                expiresIn: '12h'
            },
            (err, encoded) => {
                if (err) {
                    return res.status(500).json({
                        message: "signIn failed",
                        errorCode: "326"
                    });
                } else {
                    return res.status(200).json({
                        done: true,
                        secret: 'bearer ' + encoded
                    });
                }
            }
        );
    }).catch(() => {
        return res.status(500).json({
            message: "signIn failed",
            errorCode: "327"
        });
    })


};

module.exports.inviteMember = (req, res) => {
    Users.findOne({
        where: {
            userId: req.user.userId
        }
    }).then((user) => {
        Project.findOne({
            where: {
                projectId: req.body.projectId
            }
        }).then((project) => {
            mailController.inviteEmail(req.body.email, user, project, req.body.message)

            invitedEmails.create({
                inviterId: req.user.userId,
                projectId: req.body.projectId,
                email: req.body.email,
                message: req.body.message
            }).then((invitedEmail) => {
                return res.status(200).json({
                    invitedEmail,
                    message: 'done'
                })
            })

        })
    })


}