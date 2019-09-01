const Projects = require('../../models/projects');
const ProjectMembers = require('../../models/projectMembers');
const Sprints = require('../../models/sprints');
const Activities = require('../../models/activities');

exports.createProject = (req, res) => {
    // creating project with foreign key for user
    Projects.create({
            title: req.body.title,
            description: req.body.description,
            creatorId: req.user.userId,
            // activeSprint: req.body.activeSprint,
            sprintDuration: req.body.sprintDuration
        })
        .then((project) => {
            ProjectMembers.create({
                memberId: req.user.userId,
                projectId: project.projectId
            });

            Activities.create({
                activityName: 'Default Activity',
                projectId: project.projectId
            }).then((activity) => {
                Sprints.create({
                    projectId: project.projectId,
                    sprintName: 'Story Pool',
                    status: 'Open'
                }).then((sprint) => {
                    Projects.update({
                        activeSprint: sprint.sprintId,
                        defaultSprintId: sprint.sprintId,
                        defaultActivityId: activity.activityId
                    }, {
                        where: {
                            projectId: project.projectId
                        }
                    });
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
                });
            })

        })
        .catch((err) => {
            return res.status(500).json({
                message: 'Project FAILED !',
                err
            });
        });
};