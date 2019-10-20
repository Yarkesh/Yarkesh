const Users = require('../../models/users');
const NotConfirmedUsers = require('../../models/notConfirmedUsers');
const moment = require('moment')
const {
    Op
} = require('sequelize')
module.exports.deleteUser = (req, res) => {
    Users.destroy({
            where: {
                userId: req.user.userId
            }
        })
        .then((done) => {
            if (done == 1) {
                return res.status(200).json({
                    message: 'User Deleted'
                });
            } else {
                return res.status(500).json({
                    error: "user couldn't be found"
                })
            }
        })
        .catch((err) => {
            res.status(500).json({
                err
            });
        });
};

module.exports.findLateNotConfirmedUsers = (req, res) => {
    NotConfirmedUsers.destroy({
            where: {
                createdAt: {
                    [Op.lt]: moment().subtract(1, 'days').toDate()
                }
            }
        })
        .then((lateUsers) => {
            return res.status(200).json({
                numberOfDestoryedUsers: lateUsers
            });

        })
        .catch((err) => {
            return res.status(500).json({
                err
            });
        });
};


