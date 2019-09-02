const Stories = require('../../models/stories');
const Sprints = require('../../models/sprints');
const Activities = require('../../models/activities');
const DependencyController = require('../dependency/create');

const AssignmentController = require('../assignment/create');
const Projects = require('../../models/projects');

exports.createStory = async (req, res) => {
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
                // TODO sheet
                Stories.create({
                        storyName: req.body.storyName,
                        sprintId: sprintFoundId,
                        activityId: activityFoundId,
                        as: req.body.as,
                        iWant: req.body.iWant,
                        soThat: req.body.soThat,
                        acceptanceTest: req.body.acceptanceTest,
                        status: 'ToDo',
                        storyPoint: req.body.storyPoint,
                        priority: req.body.priority,
                        isEpic: req.body.isEpic,
                        creatorId: req.user.userId,
                        projectId: req.body.projectId
                    })
                    .then((story) => {
                        DependencyController.createDependencyFromList(req)
                            .then(result => {
                                console.log("HERE IN STORY THEN")
                                if (result) {
                                    AssignmentController.createAssignmentFromList(
                                        req.body.assignment,
                                        story.storyId
                                    );
                                    return res.status(200).json({
                                        story
                                    });
                                } else if (!result) {
                                    console.log("HERE IN STORY CATCH")
                                    return res.status(500).json({
                                        err: "this dependency is not in this project"
                                    })
                                }

                            })

                    })
                    .catch((err) => {
                        console.log(err);
                        return res.status(500).json({
                            message: 'story FAILED !',
                            err
                        });
                    });
            });
        });
    })

};