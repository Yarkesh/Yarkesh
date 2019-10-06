const Projects = require('../../models/projects');
const ProjectMembers = require('../../models/projectMembers');
const Sprints = require('../../models/sprints');
const Activities = require('../../models/activities');
const config = require('config')
exports.createProject = (req, res) => {
    //createProject express validtaor
    const errorsList = validationResult(req).errors;
    const handledErrorsList = errorHandler.handler(errorsList);
    if (Object.keys(handledErrorsList).length > 0) {
        return res.status(422).json({
            errorCode: '8',
            errors: handledErrorsList
        });
    }
    // creating project with foreign key for user
    Projects.create({
            title: req.body.title,
            description: req.body.description,
            creatorId: req.user.userId,
            sprintDuration: req.body.sprintDuration,
            logo: config.get('app.webServer.baseUrl') + "/pictures/projects/defaultLogo.jpg"
        })
        .then((project) => {
            var now = new Date(project.createdAt.getTime() + 2)
            var now2 = new Date(project.createdAt);
            ProjectMembers.create({
                memberId: req.user.userId,
                projectId: project.projectId
            }).catch(() => {
                return res.status(500).json({
                    message: 'creating member failed',
                    errorCode: '345'
                });
            });
            Activities.create({
                    activityName: 'Default Activity',
                    projectId: project.projectId
                })
                .catch(() => {
                    return res.status(500).json({
                        message: 'couldnt create activity',
                        errorCode: '346'
                    });
                })
                .then((activity) => {
                    Sprints.create({
                            projectId: project.projectId,
                            sprintName: 'Story Pool',
                            status: 'Open',
                            startDate: now,
                            duration: project.sprintDuration,
                            dueDate: now2.setDate(now2.getDate())
                        })
                        .catch(() => {
                            return res.status(500).json({
                                message: 'couldnt create sprint',
                                errorCode: '347'
                            });
                        })
                        .then((sprint) => {
                            Projects.update({
                                    activeSprint: sprint.sprintId,
                                    defaultSprintId: sprint.sprintId,
                                    defaultActivityId: activity.activityId
                                }, {
                                    where: {
                                        projectId: project.projectId
                                    }
                                }).then(project => {
                                    return res.status(200).json({
                                        title: project.title,
                                        projectId: project.projectId,
                                        description: project.description,
                                        activeSprint: sprint.sprintName,
                                        createdAt: project.createdAt,
                                        creator: {
                                            name: req.user.name
                                        }
                                    });
                                })
                                .catch(() => {
                                    return res.status(500).json({
                                        message: 'couldnt update project',
                                        errorCode: '348'
                                    });
                                })

                        });
                })

        })
        .catch((err) => {
            return res.status(500).json({
                message: 'couldnt create project',
                errorCode: '344'
            });
        });
};