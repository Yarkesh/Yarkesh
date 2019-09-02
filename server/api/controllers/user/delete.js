const Users = require('../../models/users');


module.exports.deleteUser = (req, res) => {
    Users.destroy({
        where: {
            userId: req.user.userId
        }
    })
        .then((done) => {
            if (done == 1) {
                res.status(200).json({
                    message: 'User Deleted'
                });
            } else {
                res.status(500).json({
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