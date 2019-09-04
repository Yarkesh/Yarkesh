const Projects = require('../../models/projects');
const Sprints = require('../../models/sprints');

const config = require('config');
const path = require('path');
const Resize = require('../image/Resize');
const fs = require('fs')

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


module.exports.editProject = async (req, res) => {
    const imagePath = path.join(__dirname, '../../../pictures/projects');
    const info = `${req.body.projectId}__${req.body.title}.jpg`;
    const fileUpload = new Resize(imagePath, info);

    var promise1 = new Promise((resolve, reject) => {

        Projects.findOne({
            where: {
                projectId: req.body.projectId
            }
        }).then(project => {
            console.log(project, 'project in')
            if (req.body.title) {
                // console.log(req.body.title, "1");
                title = req.body.title;
                resolve([title, project]);
            }
            else if (!req.body.title) {
                title = project.title;
                resolve([title, project]);
            }

            // console.log(project.title, '2');
            // title = project.title;
            // resolve(title);
        })
        // if (req.body.title) {
        //     console.log(req.body.title, "1");
        //     title = req.body.title;
        //     resolve(title);
        // } else if (!req.body.title) {
        //     Projects.findOne({
        //         where: {
        //             projectId: req.body.projectId
        //         }
        //     }).then(project => {

        //         console.log(project.title, '2');
        //         title = project.title;
        //         resolve(title);
        //     })
        // }
    });

    promise1.then((value) => {
        // console.log(project, 'project')
        // console.log(title, "@")
        let lastImagePath = path.join(__dirname, '..', '..', '..', 'pictures', 'projects', req.body.projectId + '__' + value[1].title + '.jpg');
        // console.log(lastImagePath, 'last');

        let logo = config.get('app.webServer.baseUrl') + '/pictures/projects/' + req.body.projectId + '__' + value[0] + '.jpg';

        Projects.update({
            title,
            description: req.body.description,
            sprintDuration: req.body.sprintDuration
        }, {
                where: {
                    projectId: req.body.projectId
                }
            }).then(async (project) => {

                if (req.file) {
                    const filename = await fileUpload.save(req.file.buffer);
                    Projects.update({
                        logo
                    }, {
                            where: {
                                projectId: req.body.projectId
                            }
                        })



                    try {
                        fs.unlinkSync(lastImagePath)
                        //file removed
                    } catch (err) {
                        console.error(err)
                    }




                    return res.status(200).json({
                        title: req.body.title,
                        description: req.body.description,
                        sprintDuration: req.body.sprintDuration,
                        logo
                    })

                } else if (!req.file) {
                    return res.status(200).json({
                        title: req.body.title,
                        description: req.body.description,
                        sprintDuration: req.body.sprintDuration,
                        logo: project.logo
                    })
                }
            })
            .catch(err => {
                return res.status(500).json({
                    editProjectError: err
                })
            })
    });
}