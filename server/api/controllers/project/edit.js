const Projects = require('../../models/projects');
const Sprints = require('../../models/sprints');

const config = require('config');
const path = require('path');
const Resize = require('../image/Resize');
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


module.exports.editProject = (req, res) => {
    const imagePath = path.join(__dirname, '../../../pictures/projects');
    const info = `${req.user.userId}__${req.user.userName}.jpg`;
    const fileUpload = new Resize(imagePath, info);
    let imageUrl;
    Projects.update({
        title: req.body.title,
        description: req.body.description,
        sprintDuration: req.body.sprintDuration,
    }, {
            where: {
                projectId: req.body.projectId
            }
        }).then(async () => {

            if (req.file) {
                const filename = await fileUpload.save(req.file.buffer);
                imageUrl = config.get('app.webServer.baseUrl') + '/pictures/projects/' + filename;

            }
            return res.status(200).json({
                title: req.body.title,
                description: req.body.description,
                sprintDuration: req.body.sprintDuration,
                imageUrl
            })
        })
        .catch(err => {
            return res.status(500).json({
                editProjectError: err
            })
        })
}