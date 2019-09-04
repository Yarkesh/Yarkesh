const Stories = require('../../models/stories');
const Assignments = require('../../models/assignments');
const Dependencies = require('../../models/dependencies');
const AssignmentController = require('../../controllers/assignment/create');
const DependencyController = require('../../controllers/dependency/create');

module.exports.changeSprint = (req, res) => {

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
    Stories.findOne({
        where: {
            projectId: req.body.projectId,
            storyId: req.body.storyId
        }
    }).then(story => {
        oldStory = story
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
            dependency: req.body.dependency,
            assignment: req.body.assignment
        }, {
            where: {
                storyId: req.body.storyId,
                projectId: req.body.projectId
            }
        }).then(updated => {
            Dependencies.destroy({
                where: {
                    projectId: req.body.projectId,
                    storyId: req.body.storyId
                }
            }).then(dependencyDestroyed => {
                Assignments.destroy({
                    where: {
                        projectId: req.body.projectId,
                        storyId: req.body.storyId
                    }
                }).then(assignmentDestroyed => {
                    DependencyController.createDependencyFromList(req.body.projectId, req.body.dependency, req.body.storyId)
                        .then(newDepencency => {
                            AssignmentController.createAssignmentFromList(req.body.projectId, req.body.assignment, req.body.storyId)
                                .then(newAssignment => {
                                    //successfull edit
                                    Stories.findOne({
                                        where: {
                                            projectId: req.body.projectId,
                                            storyId: req.body.storyId
                                        }
                                    }).then(successUpdate => {
                                        return res.status(200).json({
                                            successUpdate
                                        })
                                    })
                                }).catch(errAssignment => {
                                    //assignment was wrong
                                    Assignments.destroy({
                                        where: {
                                            projectId: req.body.projectId,
                                            storyId: req.body.storyId
                                        }
                                    }).then(() => {
                                        Dependencies.destroy({
                                            where: {
                                                projectId: req.body.projectId,
                                                storyId: req.body.storyId
                                            }
                                        }).then(() => {
                                            AssignmentController.createAssignmentFromList(req.body.projectId, oldStory.assignment, req.body.storyId)
                                                .then(oldAssUp => {
                                                    DependencyController.createDependencyFromList(req.body.projectId, oldStory.dependency, req.body.storyId)
                                                        .then(() => {
                                                            Stories.update({
                                                                storyName: oldStory.storyName,
                                                                sprintId: oldStory.sprintId,
                                                                activityId: oldStory.activityId,
                                                                as: oldStory.as,
                                                                iWant: oldStory.iWant,
                                                                soThat: oldStory.soThat,
                                                                acceptanceTest: oldStory.acceptanceTest,
                                                                status: oldStory.status,
                                                                storyPoint: oldStory.storyPoint,
                                                                priority: oldStory.priority,
                                                                isEpic: oldStory.isEpic,
                                                                dependency: oldStory.dependency,
                                                                assignment: oldStory.assignment
                                                            }, {
                                                                where: {
                                                                    projectId: req.body.projectId,
                                                                    storyId: req.body.storyId
                                                                }
                                                            }).then(updatedtoOld2 => {
                                                                return res.status(500).json({
                                                                    err: "this assignment is not in this project",
                                                                })

                                                            })
                                                        })


                                                })
                                        })
                                    })
                                })
                        }).catch(errDependency => {
                            //dependency was wrong
                            Dependencies.destroy({
                                    where: {
                                        projectId: req.body.projectId,
                                        storyId: req.body.storyId
                                    }
                                })
                                .then(() => {
                                    DependencyController.createDependencyFromList(req.body.projectId, oldStory.dependency, req.body.storyId).then(newDep => {
                                        Assignments.destroy({
                                            where: {
                                                projectId: req.body.projectId,
                                                storyId: req.body.storyId
                                            }
                                        }).then(AssDes => {
                                            AssignmentController.createAssignmentFromList(req.body.projectId, oldStory.assignment, req.body.storyId).then(newAss => {
                                                Stories.update({
                                                    storyName: oldStory.storyName,
                                                    sprintId: oldStory.sprintId,
                                                    activityId: oldStory.activityId,
                                                    as: oldStory.as,
                                                    iWant: oldStory.iWant,
                                                    soThat: oldStory.soThat,
                                                    acceptanceTest: oldStory.acceptanceTest,
                                                    status: oldStory.status,
                                                    storyPoint: oldStory.storyPoint,
                                                    priority: oldStory.priority,
                                                    isEpic: oldStory.isEpic,
                                                    dependency: oldStory.dependency,
                                                    assignment: oldStory.assignment
                                                }, {
                                                    where: {
                                                        projectId: req.body.projectId,
                                                        storyId: req.body.storyId
                                                    }
                                                }).then(updatedtoOld => {
                                                    return res.status(500).json({
                                                        err: "this dependency is not in this project",
                                                    })

                                                })


                                            })

                                        })
                                    })



                                })
                        })
                })
            })
        }).catch(errUpdate => {
            //error updating ! 
            return res.status(500).json({
                errUpdate
            })
        })
    })


};