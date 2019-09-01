const Milestone = require('../../models/milestone');

module.exports.getMilestones = (req, res) => {
    Milestone.findAll({
            attributes: ['milestoneId', 'deadline', 'description']
        })
        .then((milestones) => {
            return res.status(200).json({
                milestones
            });
        })
        .catch((err) => {
            return res.status(500).json({
                message: 'Couldn\'t find milestones',

            });
        });
};