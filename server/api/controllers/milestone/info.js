const Milestone = require('../../models/milestone');

module.exports.getMilestones = (req, res) => {
    Milestone.findAll({
            where: {
                projectId: req.body.projectId
            },
            attributes: ['milestoneId', 'title', 'dueDate', 'description']
        })
        .then((milestones) => {
            return res.status(200).json({
                milestones
            });
        })
        .catch(() => {
            return res.status(500).json({
                error: 'couldnt get milestones',
                errorCode: '377',
            });
        });
};