const User = require('../../models/users');
const Assignment = require('../../models/assignments');

module.exports.getStoryAssignments = (req, res) => {
    Assignment.findAll({
            where: {
                storyId: req.body.storyId
            },
            include: [{
                model: User,
                attributes: ['userId', 'nickName'],
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