const Sprint = require('../../models/sprints');
const Story = require('../../models/stories');
const Project = require('../../models/projects');
const moment = require('moment')
const {
    Op
} = require('sequelize')
module.exports.getSprintStories = (req, res) => {
    Sprint.findAll({
            where: {
                sprintId: req.body.sprintId
            },
            include: [{
                model: Story,
                attributes: ['storyName'],
                as: 'stories'
            }]
        })
        .then((sprints) => {
            return res.status(200).json({
                sprints
            });
        })
        .catch((err) => {
            return res.status(500).json({
                message: 'Couldnt find sprints',

            });
        });
};



module.exports.getProjectSprints = (req, res) => {
    Sprint.findAll({
            where: {
                projectId: req.body.projectId
            },
            attributes: ['sprintId', 'sprintName', 'startDate', 'duration', 'dueDate']
        })
        .then((sprints) => {
            return res.status(200).json({
                sprints
            });
        })
        .catch((err) => {
            return res.status(500).json({
                message: 'Couldn\'t find sprints',

            });
        });
};


module.exports.findActiveSprint = (req, res) => {
    Sprint.findOne({
            where: {
                startDate: {
                    [Op.lt]: moment()
                },
                dueDate: {
                    [Op.gt]: moment()
                },
                projectId: req.body.projectId
            },
            attributes: ['sprintId', 'sprintName', 'startDate', 'duration', 'dueDate']
        })
        .then((sprint) => {
            Project.update({
                activeSprintId: sprint.sprintId
            }, {
                where: {
                    projectId: req.body.projectId
                }
            }).then(project => {
                res.status(200).json({
                    message: "activesprint updated"
                })

            })
        })
        .catch((err) => {
            return res.status(500).json({
                message: 'Couldn\'t find sprints',

            });
        });
};