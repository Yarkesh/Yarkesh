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
        .catch(() => {
            return res.status(500).json({
                message: 'couldnt delete project',
                errorCode: '349'
            });
        });
};