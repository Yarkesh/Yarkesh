const Milestone = require('../../models/milestone');
const Project = require('../../models/projects');

module.exports.editMilestone = (req, res) => {
    Project.findOne({
        where: {
            projectId: req.body.projectId
        }
    }).then(project => {
        var start = new Date(project.startDate);
        var addedDate = new Date(start.setDate(start.getDate() + parseInt(req.body.milestoneDuration)))

        if (project.dueDate < addedDate) {
            return res.status(400).json({
                error: "the milestone Duration you entered exceeds the project dueDate"
            })
        }
        Milestone.update({
                title: req.body.title,
                description: req.body.description,
                dueDate: addedDate
            }, {
                where: {
                    projectId: req.body.projectId,
                    milestoneId: req.body.milestoneId
                }
            }).then(done => {
                return res.status(200).json({
                    message: 'milestone updated'
                })
            })
            .catch(() => {
                return res.status(500).json({
                    error: 'couldnt update milestone',
                    errorCode: '374',
                });
            });
    })




};