const Sprint = require('../../models/sprints');
// const Story = require('../models/stories');

module.exports.createSprint = (req, res) => {

    Sprint.create({
        projectId: req.body.projectId,
        sprintName: req.body.sprintName,
        status: req.body.status,
        duration: req.body.duration,
        dueDate: req.body.dueDate
    })
        .then((sprint) => {
            return res.status(200).json({
                sprintId: sprint.sprintId,
                sprintName: sprint.sprintName
            });
        })
        .catch((err) => {
            return res.status(500).json({
                err
            });
        });
};
