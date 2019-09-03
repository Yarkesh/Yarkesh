const Stories = require('../../models/stories');
const Sprints = require('../../models/sprints');
const Activities = require('../../models/activities');
const DependencyController = require('../dependency/create');
const ProjectMembers = require('../../models/projectMembers');
const AssignmentController = require('../assignment/create');
const Projects = require('../../models/projects');
const Assignments = require('../../models/assignments');
exports.createStory = (req, res) => {
    var sprintFoundId, activityFoundId;
    Projects.findOne({
        where: {
            projectId: req.body.projectId,
        },
        attributes: ['defaultSprintId', 'defaultActivityId']
    }).then(project => {
        Sprints.findOne({
            where: {
                projectId: req.body.projectId,
                sprintId: project.defaultSprintId
            }
        }).then((sprintFound) => {
            Activities.findOne({
                where: {
                    projectId: req.body.projectId,
                    activityId: project.defaultActivityId
                }
            }).then((activityFound) => {
                sprintFoundId = sprintFound.sprintId;
                if (req.body.sprintId != null) {
                    sprintFoundId = req.body.sprintId;
                }
                activityFoundId = activityFound.activityId;
                if (req.body.activityId != null) {
                    activityFoundId = req.body.activityId;
                }
                Stories.create({
                        storyName: req.body.storyName,
                        sprintId: sprintFoundId,
                        activityId: activityFoundId,
                        as: req.body.as,
                        iWant: req.body.iWant,
                        soThat: req.body.soThat,
                        acceptanceTest: req.body.acceptanceTest,
                        status: 'Todo',
                        storyPoint: req.body.storyPoint,
                        priority: req.body.priority,
                        isEpic: req.body.isEpic,
                        creatorId: req.user.userId,
                        projectId: req.body.projectId
                    })
                    .then((story) => {
                        DependencyController.createDependencyFromList(req, story.storyId)
                            .then(dependencyResult => {
                                AssignmentController.createAssignmentFromList(req, story.storyId)
                                    .then(assignmentResult => {
                                        return res.status(200).json({
                                            story
                                        });
                                    }).catch(err => {
                                        Stories.destroy({
                                            where: {
                                                projectId: req.body.projectId,
                                                storyId: story.storyId
                                            }
                                        }).then(() => {
                                            return res.status(500).json({
                                                err: "this user you want to assign is not in this project"
                                            })
                                        })
                                    })

                            }).catch(err => {
                                Stories.destroy({
                                        where: {
                                            projectId: req.body.projectId,
                                            storyId: story.storyId
                                        }
                                    })
                                    .then(() => {
                                        return res.status(500).json({
                                            err: "this dependency is not in this project"
                                        })
                                    })

                            })

                    })
                    .catch((err) => {
                        return res.status(500).json({
                            message: 'story FAILED !',
                            err
                        });
                    });
            });
        });
    })

};