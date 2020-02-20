const Projects = require('../../models/projects');
const config = require('config');
const path = require('path');
const Resize = require('../image/Resize');
const Milestone = require('../../models/milestone');
const Sprint = require('../../models/sprints');
const _ = require('lodash');

module.exports.editProject = (req, res) => {
    Projects.findOne({
            where: {
                projectId: req.body.projectId
            }
        }).then(oldProject => {
            oldStart = oldProject.startDate;
            startDate = new Date(req.body.startDate)
            var dif = startDate.getTime() - oldStart.getTime()
            let imageUrl = oldProject.logo
            const imagePath = path.join(__dirname, '../../../pictures/projects');
            const ImageName = `project${req.body.projectId}.jpg`;
            let fileUpload = new Resize(imagePath, ImageName);
            if (req.file) {
                imageUrl = config.get('app.webServer.baseUrl') + '/pictures/projects/' + ImageName
            }
            Projects.update({
                    title: req.body.title,
                    // startDate: req.body.startDate,
                    dueDate: req.body.dueDate,
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
                    await Milestone.findAll({
                        where: {
                            projectId: oldProject.projectId
                        }
                    }).then((milestones) => {
                        _.forEach(milestones, (value, key) => {
                            Milestone.update({
                                dueDate: new Date(value.dueDate.getTime() + dif)
                            }, {
                                where: {
                                    milestoneId: value.milestoneId
                                }
                            })
                        })
                    })
                    await Sprint.findAll({
                        where: {
                            projectId: oldProject.projectId
                        }
                    }).then((sprints) => {
                        _.forEach(sprints, (value, key) => {
                            Sprint.update({
                                startDate: new Date(value.startDate.getTime() + dif),
                                dueDate: new Date(value.dueDate.getTime() + dif)
                            }, {
                                where: {
                                    sprintId: value.sprintId
                                }
                            })
                        })
                    })
                    await Projects.findOne({
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