const Milestone = require('../../models/milestone');

module.exports.editMilestone = (req, res) => {
    Milestone.update({
            title: req.body.title,
            description: req.body.description,
        }, {
            where: {
                milestoneId: req.body.milestoneId
            }
        })
        .then(() => {
            return res.status(200).json({
                message: "milestone updated"
            });
        })
        .catch(() => {
            return res.status(500).json({
                message: 'couldnt update milestone',
                errorCode: '374',
            });
        });



};