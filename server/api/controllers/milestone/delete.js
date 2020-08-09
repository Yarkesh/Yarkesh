const Milestone = require('../../models/milestone');
const Project = require('../../models/projects');


module.exports.deleteMilestone = async (req, res) => {

    try {
        milestone = await Milestone.findOne({
            where: {
                projectId: req.body.projectId,
                milestoneId: req.body.milestoneId
            }
        })
    } catch (error) {
        return res.status(500).json({
            error: "cant find milestone"
        })
    }



    await Milestone.destroy({
            where: {
                projectId: req.body.projectId,
                milestoneId: req.body.milestoneId
            }
        }).then(() => {
            return res.status(200).json({
                message: 'milestone deleted'
            })
        })
        .catch(() => {
            return res.status(500).json({
                error: 'couldnt delete milestone'
            })
        })



}