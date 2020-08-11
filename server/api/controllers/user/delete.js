const Users = require('../../models/users');

//why do we even have delete user ?
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
                    error: 'couldnt delete user',
                    errorCode: '370'
                });
            }
        })
        .catch(() => {
            return res.status(500).json({
                error: 'couldnt delete user',
                errorCode: '369'
            });
        });
};