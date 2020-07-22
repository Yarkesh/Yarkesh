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
    }).catch(error => {
        return res.status(500).json({
            error
        })
    })
};


module.exports.editStory = async (req, res, next) => {

    try {
        oldStory = await Stories.findOne({
            where: {
                projectId: req.body.projectId,
                storyId: req.body.storyId
            }
        })
    } catch (error) {
        return res.status(500).json({
            error: "cant find story"
        })
    }

    try {
        await Stories.update({
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
        })
    } catch (error) {
        return res.status(500).json({
            error: "cant update story"
        })
    }

    //destroying old dependencies and creating new
    try {
        await Dependencies.destroy({
            where: {
                projectId: req.body.projectId,
                storyId: req.body.storyId
            }
        })
    } catch (error) {
        return res.status(500).json({
            error: "cant destroy dependency"
        })
    }

    //destroying old assignment and creating new
    try {
        await Assignments.destroy({
            where: {
                projectId: req.body.projectId,
                storyId: req.body.storyId
            }
        })
    } catch (error) {
        return res.status(500).json({
            error: "cant destroy assignment"
        })
    }


    try {
        await DependencyController.createDependencyFromList(req.body.projectId, req.body.dependency, req.body.storyId)
    } catch (errorCreatingDependencies) {
        //dependency was wrong
        try {
            await Dependencies.destroy({
                where: {
                    projectId: req.body.projectId,
                    storyId: req.body.storyId
                }
            })
        } catch (cantDestroyDependencies) {
            return res.status(500).json({
                error: "cant destroy dependency"
            })
        }

        try {
            await Assignments.destroy({
                where: {
                    projectId: req.body.projectId,
                    storyId: req.body.storyId
                }
            })
        } catch (cantDestroyAssignments) {
            return res.status(500).json({
                error: "cant destroy assignment"
            })
        }
        await DependencyController.createDependencyFromList(req.body.projectId, oldStory.dependency, req.body.storyId)
        await AssignmentController.createAssignmentFromList(req.body.projectId, oldStory.assignment, req.body.storyId)

        await Stories.update({
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
                error: "this dependency is not in this project",
            })
        })
    }


    try {
        await AssignmentController.createAssignmentFromList(req.body.projectId, req.body.assignment, req.body.storyId)
    } catch (errorCreatingAssignments) {
        //assignment was wrong
        try {
            await Assignments.destroy({
                where: {
                    projectId: req.body.projectId,
                    storyId: req.body.storyId
                }
            })
        } catch (cantDestroyAssignment) {
            return res.status(500).json({
                error: "cant destroy assignment"
            })
        }

        try {
            await Dependencies.destroy({
                where: {
                    projectId: req.body.projectId,
                    storyId: req.body.storyId
                }
            })
        } catch (cantDestroyDependencies) {
            return res.status(500).json({
                error: "cant destroy dependency"
            })
        }

        await AssignmentController.createAssignmentFromList(req.body.projectId, oldStory.assignment, req.body.storyId)
        await DependencyController.createDependencyFromList(req.body.projectId, oldStory.dependency, req.body.storyId)

        await Stories.update({
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
                error: "this assignment is not in this project",
            })

        })
    }




    // //successfull edit
    await Stories.findOne({
        where: {
            projectId: req.body.projectId,
            storyId: req.body.storyId
        }
    }).then(successUpdate => {
        return res.status(200).json({
            successUpdate
        })
    })

}