const User = require('../models/users');
const Assignment = require('../models/assignments');

module.exports.createAssignment = (req, res) => {
    Assignment.findOne({
        where: {
            userId: req.body.userId,
            storyId: req.body.storyId

        }
    }).then((assigned) => {
        if (assigned) {
            return res.status(500).json({
                error: "This assignment already exists",
                assigned
            });
        } else {
            Assignment.create({
                    storyId: req.body.storyId,
                    userId: req.body.userId
                })
                .then((assigning) => {
                    return res.status(200).json({
                        assignmentId: assigning.assignmentId,
                        userId: assigning.userId,
                        storyId: assigning.storyId
                    });
                })
                .catch((err) => {
                    return res.status(500).json({
                        error: "story not found"
                    });
                });
        }
    })



};

module.exports.getStoryAssignments = (req, res) => {
    Assignment.findAll({
            where: {
                storyId: req.body.storyId
            },
            include: [{
                model: User,
                attributes: ['userId', 'userName'],
                as: 'assignedTo'
            }],
            attributes: []
        })
        .then((assigned) => {
            return res.status(200).json({
                assigned
            });
        })
        .catch((err) => {
            return res.status(500).json({
                err
            });
        });
};