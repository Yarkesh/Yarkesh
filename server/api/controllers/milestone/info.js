const Milestone = require('../../models/milestone');

module.exports.getMilestones = (req, res) => {
    Milestone.findAll({
            where: {
                projectId: req.body.projectId
            },
            order: [
                ['dueDate', 'ASC']
            ]
        })
        .then((milestones) => {
            return res.status(200).json({
                milestones
            });
        })
        .catch(() => {
            return res.status(500).json({
                error: 'couldnt get milestones'
            });
        });
};