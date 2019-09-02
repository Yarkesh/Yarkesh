const Projects = require('../../models/projects');
const Sprints = require('../../models/sprints');

module.exports.setActiveSprint = (req, res) => {
    Sprints.findOne({
        where: {
            sprintId: req.body.activeSprint,
            projectId: req.body.projectId
        }
    }).then((sprint) => {
        if (sprint) {
            Projects.update(
                {
                    activeSprint: req.body.activeSprint
                },
                {
                    where: {
                        projectId: req.body.projectId
                    }
                }
            )
                .then((updated) => {
                    return res.status(200).json({
                        updated
                    });
                })
                .catch((err) => {
                    return res.status(500).json({
                        message: 'cant change activesprint',
                        err
                    });
                });
        } else {
            return res.status(500).json({
                message: 'sprint not found'
            });
        }
    });
};