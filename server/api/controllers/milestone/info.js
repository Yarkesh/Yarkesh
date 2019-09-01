const Sprint = require('../../models/sprints');
const Story = require('../../models/stories');

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
        attributes: ['sprintId', 'sprintName']
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