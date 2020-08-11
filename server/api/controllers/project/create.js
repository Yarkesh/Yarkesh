const Projects = require('../../models/projects');
const ProjectMembers = require('../../models/projectMembers');
const Sprints = require('../../models/sprints');
const Activities = require('../../models/activities');
const config = require('config');
const Milestone = require('../../models/milestone');

exports.createProject = (req, res) => {
    //create the project
    Projects.create({
            startDate: new Date(req.body.startDate),
            dueDate: new Date(req.body.dueDate),
            title: req.body.title,
            description: req.body.description,
            creatorId: req.user.userId,
            sprintDuration: req.body.sprintDuration,
            logo: config.get('app.webServer.baseUrl') + "/pictures/projects/defaultLogo.jpg"
        })
        .then(async (project) => {
            var now = new Date(project.startDate.getTime() + 2)
            var now2 = new Date(project.startDate);
            var start = new Date(project.startDate);
            //add creator as member
            await ProjectMembers.create({
                memberId: req.user.userId,
                projectId: project.projectId
            }).catch(() => {
                return res.status(500).json({
                    error: 'creating member failed',
                    errorCode: '345'
                });
            });
            await Milestone.count({
                where: {
                    projectId: project.projectId
                }
            }).then(count => {
                Milestone.create({
                        projectId: project.projectId,
                        title: 'MVP',
                        milestoneNo: 'milestone#1',
                        dueDate: new Date(start.setDate(start.getDate() + parseInt(req.body.milestoneDuration))),
                        description: 'Your first initial software'
                    }).then(milestone => {
                        Activities.create({
                                activityName: 'Default Activity',
                                projectId: project.projectId
                            })
                            .catch(() => {
                                return res.status(500).json({
                                    error: 'couldnt create activity',
                                    errorCode: '346'
                                });
                            })
                            .then((activity) => {
                                //create default sprint
                                Sprints.count({
                                    where: {
                                        projectId: project.projectId
                                    }
                                }).then(count => {
                                    Sprints.create({
                                            projectId: project.projectId,
                                            sprintName: 'Story Pool',
                                            status: 'Open',
                                            sprintNo: 'Story Pool',
                                            startDate: now,
                                            duration: project.sprintDuration,
                                            dueDate: now2.setDate(now2.getDate())
                                        })
                                        .catch((err) => {
                                            console.log(err)
                                            return res.status(500).json({
                                                error: 'couldnt create sprint',
                                                errorCode: '347'
                                            });
                                        })
                                        .then((sprint) => {
                                            //update project to have the default activity and default sprint
                                            Projects.update({
                                                    defaultSprintId: sprint.sprintId,
                                                    defaultActivityId: activity.activityId
                                                }, {
                                                    where: {
                                                        projectId: project.projectId
                                                    }
                                                }).then(() => {
                                                    //create project successfull
                                                    return res.status(200).json({
                                                        projectId: project.projectId,
                                                        title: project.title,
                                                        description: project.description,
                                                        startDate: project.startDate,
                                                        dueDate: project.dueDate,
                                                        defaultActivityId: activity.activityId,
                                                        defaultSprintId: sprint.sprintId,
                                                        createdAt: project.createdAt,
                                                        firstMilestone: milestone.dueDate,
                                                        creator: {
                                                            name: req.user.name
                                                        }
                                                    });
                                                })
                                                .catch(() => {
                                                    return res.status(500).json({
                                                        error: 'couldnt update project',
                                                        errorCode: '348'
                                                    });
                                                })

                                        })
                                })

                            });
                    })
                    .catch(() => {
                        return res.status(500).json({
                            error: 'couldnt create milestone',
                            errorCode: '373',
                        });

                    });
            })

            //create default activity

        })

        .catch((err) => {
            console.log(err)
            return res.status(500).json({
                error: 'couldnt create project',
                errorCode: '344'
            });
        });
};