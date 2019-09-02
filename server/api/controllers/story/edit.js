const Stories = require('../../models/stories');

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