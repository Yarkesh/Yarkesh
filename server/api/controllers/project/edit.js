const Projects = require('../../models/projects');
const config = require('config');
const path = require('path');
const Resize = require('../image/Resize');


module.exports.editProject = (req, res) => {
    Projects.findOne({
            where: {
                projectId: req.body.projectId
            }
        }).then(oldProject => {
            let imageUrl = oldProject.logo
            const imagePath = path.join(__dirname, '../../../pictures/projects');
            const ImageName = `project${req.body.projectId}.jpg`;
            let fileUpload = new Resize(imagePath, ImageName);
            if (req.file) {
                imageUrl = config.get('app.webServer.baseUrl') + '/pictures/projects/' + ImageName
            }
            Projects.update({
                    title: req.body.title,
                    description: req.body.description,
                    sprintDuration: req.body.sprintDuration,
                    logo: imageUrl
                }, {
                    where: {
                        projectId: req.body.projectId
                    }
                }).then(async () => {
                    if (req.file) {
                        const filename = await fileUpload.save(req.file.buffer);
                        imageUrl
                    }
                    Projects.findOne({
                        where: {
                            projectId: req.body.projectId
                        }
                    }).then(updatedProject => {
                        return res.status(200).json({
                            updatedProject
                        })
                    })

                })
                .catch(err => {
                    return res.status(500).json({
                        message: 'couldnt update project',
                        errorCode: '366'
                    });
                })

        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({
                error: 'cant find project'
            })
        })

}