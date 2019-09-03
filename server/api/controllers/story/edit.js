const Stories = require('../../models/stories');
const Assignments = require('../../models/assignments');
const Dependencies = require('../../models/dependencies');
const AssignmentController = require('../../controllers/assignment/create');
const DependencyController = require('../../controllers/dependency/create');

module.exports.changeSprint = (req, res, next) => {

    Stories.update({
        sprintId: req.body.sprintId
    }, {
        where: {
            storyId: req.body.storyId,
            projectId: req.body.projectId
        }
    }).then(updated => {
        return res.status(200).json({
            message: "updated sprintId"
        })
    }).catch(err => {
        return res.status(500).json({
            err
        })
    })
};


module.exports.editStory = (req, res, next) => {

    Stories.update({
        storyName: req.body.storyName,
        sprintId: req.body.sprintId,
        activityId: req.body.activityId,
        as: req.body.as,
        iWant: req.body.iWant,
        soThat: req.body.soThat,
        acceptanceTest: req.body.acceptanceTest,
        status: req.body.status,
        storyPoint: req.body.storyPoint,
        priority: req.body.priority,
        isEpic: req.body.isEpic,
    }, {
        where: {
            storyId: req.body.storyId,
            projectId: req.body.projectId
        }
    }).then(updated => {
        if (req.body.dependency.length != 0) {
            Dependencies.destroy({
                where: {
                    projectId: req.body.projectId,
                    storyId: req.body.storyId
                }
            }).then(destroyed => {
                DependencyController.createDependencyFromList(req, req.body.storyId).then(newDepencency => {
                    AssignmentController.createAssignmentFromList(req, req.body.storyId).then(newAssignment => {
                        return res.status(200).json({
                            message: "updated story"
                        })
                    }).catch(errAssignment => {
                        Assignments.destroy({
                                where: {
                                    projectId: req.body.projectId,
                                    storyId: req.body.storyId
                                }
                            })
                            .then(() => {
                                return res.status(500).json({
                                    err: "this assignment is not in this project"
                                })
                            })
                    })
                }).catch(errDependency => {
                    Dependencies.destroy({
                            where: {
                                projectId: req.body.projectId,
                                storyId: req.body.storyId
                            }
                        })
                        .then(() => {
                            return res.status(500).json({
                                err: "this dependency is not in this project"
                            })
                        })
                })
            })
        }


    }).catch(err => {
        return res.status(500).json({
            err
        })
    })
};