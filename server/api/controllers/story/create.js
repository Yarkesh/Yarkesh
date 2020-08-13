const Stories = require('../../models/stories');
const Sprints = require('../../models/sprints');
const Activities = require('../../models/activities');
const DependencyController = require('../dependency/create');
const ProjectMembers = require('../../models/projectMembers');
const AssignmentController = require('../assignment/create');
const Projects = require('../../models/projects');
const Assignments = require('../../models/assignments');

exports.createStory = async (req, res) => {
    let sprintFoundId, activityFoundId;
    try {
        project = await Projects.findOne({
            where: {
                projectId: req.body.projectId,
            },
            attributes: ['defaultSprintId', 'defaultActivityId']
        });
    } catch (error) {
        return res.status(500).json({
            error: "cant find project"
        })
    }

    try {
        sprintFound = await Sprints.findOne({
            where: {
                projectId: req.body.projectId,
                sprintId: project.defaultSprintId
            }
        });
    } catch (error) {
        return res.status(500).json({
            error: "cant find sprint"
        })
    }

    try {
        activityFound = await Activities.findOne({
            where: {
                projectId: req.body.projectId,
                activityId: project.defaultActivityId
            }
        });
    } catch (error) {
        return res.status(500).json({
            error: "cant find activity"
        })
    }


    sprintFoundId = sprintFound.sprintId;
    if (req.body.sprintId != null) {
        sprintFoundId = req.body.sprintId;
    }

    activityFoundId = activityFound.activityId;
    if (req.body.activityId != null) {
        activityFoundId = req.body.activityId;
    }

    try {
        story = await Stories.create({
            storyName: req.body.storyName,
            sprintId: sprintFoundId,
            activityId: activityFoundId,
            as: req.body.as,
            iWant: req.body.iWant,
            soThat: req.body.soThat,
            acceptanceTest: req.body.acceptanceTest,
            status: req.body.status,
            storyPoint: req.body.storyPoint,
            priority: req.body.priority,
            isEpic: req.body.isEpic,
            creatorId: req.user.userId,
            projectId: req.body.projectId,
            dependency: req.body.dependency,
            assignment: req.body.assignment
        });
    } catch (error) {
        return res.status(500).json({
            error: 'story FAILED !'
        });
    }

    try {
        await DependencyController.createDependencyFromList(req.body.projectId, req.body.dependency, story.storyId);
    } catch (error) {
        //destory story if we can't create dependencies
        await Stories.destroy({
                where: {
                    projectId: req.body.projectId,
                    storyId: story.storyId
                }
            })
            .then(() => {
                return res.status(500).json({
                    error: "this dependency is not in this project"
                })
            })

    }

    try {
        await AssignmentController.createAssignmentFromList(req.body.projectId, req.body.assignment, story.storyId);
    } catch (error) {
        //destory story if we can't create assignments
        await Stories.destroy({
            where: {
                projectId: req.body.projectId,
                storyId: story.storyId
            }
        }).then(() => {
            return res.status(500).json({
                error: "this user you want to assign is not in this project"
            })
        })
    }


    return res.status(200).json({
        story
    })

};