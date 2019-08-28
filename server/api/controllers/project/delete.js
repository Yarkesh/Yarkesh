const Projects = require('../../models/projects');

module.exports.deleteProject = (req, res) => {
    Projects.destroy({
        where: {
            projectId: req.body.projectId
        }
    })
        .then(() => {
            res.status(200).json({
                message: 'Project Deleted'
            });
        })
        .catch((err) => {
            res.status(500).json({
                err
            });
        });
};
