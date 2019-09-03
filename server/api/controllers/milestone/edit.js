const Milestone = require('../../models/milestone');
const Project = require('../../models/projects');

module.exports.editMilestone = (req, res) => {
    Milestone.update({
            description: req.body.description,
            projectId: req.body.projectIdNew
        }, {
            where: {
                milestoneId: req.body.milestoneId
            }
        })
        .then((milestone) => {
            return res.status(200).json({
                milestone
            });
        })
        .catch((err) => {
            return res.status(500).json({
                err
            });
        });



};