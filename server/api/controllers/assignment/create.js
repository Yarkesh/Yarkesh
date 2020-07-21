const Assignment = require('../../models/assignments');
const ProjectMembers = require('../../models/projectMembers');

module.exports.createAssignment = (req, res) => {
    Assignment.findOne({
        where: {
            storyId: req.body.storyId,
            userId: req.user.userId
        }
    }).then((assigned) => {
        if (assigned) {
            return res.status(500).json({
                error: 'This assignment already exists',
                assigned
            });
        } else {
            Assignment.create({
                    projectId: req.body.projectId,
                    storyId: req.body.storyId,
                    userId: req.user.userId
                })
                .then(() => {
                    return res.status(200).json({
                        message: 'assignment created'
                    });
                })
                .catch((error) => {
                    return res.status(500).json({
                        error
                    });
                });
        }
    });
};

const isUserInProject = (projectId, userId) => {
    return new Promise((respond, reject) => {
        ProjectMembers.findOne({
            where: {
                memberId: userId,
                projectId: projectId
            }
        }).then((user) => {
            if (!user) {
                reject()
            } else {
                respond(user)
            }
        })
    })
};
module.exports.createAssignmentFromList = (projectId, assignment, storyId) => {
    return new Promise((respond, reject) => {
        if (assignment.length == 0) {
            respond()
        }
        for (let assUser of assignment) {
            isUserInProject(projectId, assUser)
                .then(isInProject => {
                    Assignment.findOne({
                        where: {
                            storyId: storyId,
                            userId: assUser
                        }
                    }).then((assigned) => {
                        if (assigned) {
                            respond(assigned)
                        } else {
                            Assignment.create({
                                    projectId: projectId,
                                    storyId: storyId,
                                    userId: assUser
                                })
                                .then((assignment) => {
                                    respond(assignment)
                                })
                                .catch((err2) => {
                                    reject(err2)
                                });
                        }
                    });
                }).catch(err => {
                    reject(err)
                })

        }
    })

};

module.export = isUserInProject