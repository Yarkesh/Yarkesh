
const ProjectMembers = require('../../models/projectMembers');


module.exports.leaveProject = (req, res) => {
    ProjectMembers.destroy({
        where: {
            memberId: req.user.userId
        }
    })
        .then((done) => {
            if (done == 1) {
                res.status(200).json({
                    message: 'You have succesfully left this project'
                });
            } else {
                res.status(500).json({
                    error: 'user is not a member of this project'
                });
            }
        })
        .catch((error) => {
            res.status(500).json({
                error
            });
        });
};