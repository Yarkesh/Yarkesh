const bcrypt = require('bcrypt');
const randomstring = require('randomstring');
const Users = require('../../models/users');
const NotConfirmedUsers = require('../../models/notConfirmedUsers');
const mail = require('../mailController');
// const multer = require('multer');
// const upload = multer({ dest: '../../../../pictures/' })
// const path = require('path');
// const Resize = require('../../routes/uploadMiddleware');
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


// module.exports.updateAvatar = async (req, res) => {
//     const imagePath = path.join(__dirname, '../../../pictures');
//     const fileUpload = new Resize(imagePath);
//     if (!req.file) {
//         res.status(401).json({ error: 'Please provide an image' });
//     }
//     const filename = await fileUpload.save(req.file.buffer);
//     return res.status(200).json({ name: filename });
//     // Users.update({
//     //     avatar: "/pictures/" + req.user.userId + '__' + req.user.userName + '.jpg',
//     // },
//     //     {
//     //         where: {
//     //             userId: req.user.userId
//     //         }
//     //     }
//     // ).then(response => {
//     // return res.status(200).json({
//     //     what: req.body.message
//     // })
//     // })


// }