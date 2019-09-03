const bcrypt = require('bcrypt');
const randomstring = require('randomstring');
const Users = require('../../models/users');
const NotConfirmedUsers = require('../../models/notConfirmedUsers');
const mail = require('../mailController');
const config = require('config')
const path = require('path');
const Resize = require('../image/Resize');
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


module.exports.editProfile = (req, res) => {
    const imagePath = path.join(__dirname, '../../../pictures/users');
    const info = `${req.user.userId}__${req.user.userName}.jpg`;
    const fileUpload = new Resize(imagePath, info);
    let imageUrl = config.get('app.webServer.baseUrl') + '/pictures/users/' + req.user.userId + '__' + req.user.userName + '.jpg';
    console.log(req.body.name)
    Users.update({
        name: req.body.name,
        avatar: imageUrl
    }, {
            where: {
                userId: req.user.userId
            }
        }).then(async () => {
            if (req.file) {
                const filename = await fileUpload.save(req.file.buffer);
            }
            return res.status(200).json({
                name: req.body.name,
                imageUrl

            })
        })
        .catch(err => {
            return res.status(500).json({
                editProfileError: err
            })
        })
}
module.exports.editPassword = (req, res) => {
    Users.findOne({
        where: {
            userId: req.user.userId
        }
    }).then(user => {
        bcrypt.compare(req.body.password, user.password, (err, same) => {
            if (same) {
                if (req.body.password == req.body.confirmPassword) {
                    bcrypt.hash(req.body.password, 10, (err, hash) => {
                        if (hash) {
                            Users.update({
                                password: hash
                            }, {
                                    where: {
                                        userId: req.user.userId
                                    }
                                }).then(() => {
                                    return res.status(200).json({
                                        message: 'password has changed'
                                    })
                                })
                        }
                    })
                }
                else {
                    return res.status(500).json({
                        message: 'confirm password must match the password'
                    })
                }
            }
            else {
                return res.status(500);
            }
        })
    })
}