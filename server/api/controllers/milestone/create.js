const Milestone = require('../../models/milestone');
// const Story = require('../models/stories');

module.exports.createMilestone = (req, res) => {

    Milestone.create({
            projectId: req.body.projectId,
            deadline: req.body.deadline,
            description: req.body.description,
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