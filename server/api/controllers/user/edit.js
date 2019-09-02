const bcrypt = require('bcrypt');
const randomstring = require('randomstring');
const Users = require('../../models/users');
const NotConfirmedUsers = require('../../models/notConfirmedUsers');
const mail = require('../mailController');

module.exports.forgotPassword = (req, res) => {
    Users.findAll({
        where: {
            email: req.body.email
        }
    }).then((users) => {
        if (users.length != 0) {
            let forgotPasswordCode = randomstring.generate({
                length: 4,
                charset: 'numeric'
            });
            mail
                .forgotPassword(users[0].email, forgotPasswordCode)
                .then(() => {
                    Users.update({
                        forgotPasswordCode
                    }, {
                            where: {
                                email: users[0].email
                            }
                        });
                    return res.status(200).json({
                        message: 'forgot password message sent'
                    });
                })
                .catch((err) => {
                    return res.status(500).json({
                        err
                    });
                });
        }
    });

    NotConfirmedUsers.findAll({
        where: {
            email: req.body.email
        }
    }).then((users) => {
        if (users.length != 0) {
            let forgotPasswordCode = randomstring.generate({
                length: 4,
                charset: 'numeric'
            });
            mail
                .forgotPassword(users[0].email, forgotPasswordCode)
                .then(() => {
                    NotConfirmedUsers.update({
                        forgotPasswordCode
                    }, {
                            where: {
                                email: users[0].email
                            }
                        });
                    return res.status(200).json({
                        message: 'forgot password message sent'
                    });
                })
                .catch((err) => {
                    return res.status(500).json({
                        err
                    });
                });
        }
    });
};

module.exports.changePassword = (req, res) => {
    Users.findAll({
        where: {
            email: req.body.email
        }
    }).then((users) => {
        if (users.length != 0) {
            bcrypt.hash(req.body.password, 10, (error, hash) => {
                if (hash) {
                    if (req.body.forgotPasswordCode == users[0].forgotPasswordCode) {
                        Users.update({
                            password: hash
                        }, {
                                where: {
                                    email: users[0].email
                                }
                            }).then(() => {
                                return res.status(200).json({
                                    message: 'password changed1'
                                });
                            });
                    } else if (error) {
                        return res.status(500).json({
                            message: 'hashing failure !'
                        });
                    }
                }
            });
        }
    });

    NotConfirmedUsers.findAll({
        where: {
            email: req.body.email
        }
    }).then((users) => {
        if (users.length != 0) {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (hash) {
                    if (req.body.forgotPasswordCode == users[0].forgotPasswordCode) {
                        NotConfirmedUsers.update({
                            password: hash
                        },

                            {
                                where: {
                                    email: users[0].email
                                }
                            }
                        ).then(() => {
                            return res.status(200).json({
                                message: 'password changed2'
                            });
                        });
                    } else if (err) {
                        return res.status(500).json({
                            message: 'hashing failure !'
                        });
                    }
                }
            });
        }
    });
};
