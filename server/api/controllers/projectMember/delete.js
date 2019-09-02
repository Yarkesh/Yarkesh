
const ProjectMembers = require('../../models/projectMembers');



module.exports.deleteMember = (req, res) => {
    ProjectMembers.destroy({
        where: {
            memberId: req.body.memberId,
            projectId: req.body.projectId
        }
    })
        .then((done) => {
            if (done == 1) {
                res.status(200).json({
                    message: 'Member Deleted'
                });
            } else {
                res.status(500).json({
                    error: 'user is not a member of this project'
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                err
            });
        });
};