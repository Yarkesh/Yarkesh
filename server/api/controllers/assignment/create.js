
const Assignment = require('../../models/assignments');

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


module.exports.createAssignmentFromList = (assignmentList, storyId) => {
    //TODO check if user or story does not exist 
    assignmentList.forEach((assignment) => {
        Assignment.findOne({
            where: {
                storyId: storyId,
                userId: assignment
            }
        }).then((assigned) => {
            if (assigned) {
                // return res.status(500).json({
                // 	error: 'This dependency already exists',
                // 	depended
                // });
                console.log('This assignment already exists', assigned.dataValues);
            } else {
                Assignment.create({
                    storyId: storyId,
                    userId: assignment
                })
                    .then((assigned) => {
                        // return res.status(200).json({
                        // 	message: 'dependency created'
                        // });
                        console.log('assignment created', assigned.dataValues);
                    })
                    .catch((err) => {
                        // return res.status(500).json({
                        // 	err
                        // });
                        console.log('Error', err);
                    });
            }
        });
    });
    return;
};