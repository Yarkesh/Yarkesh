const Milestone = require('../../models/milestone');
const Project = require('../../models/projects');

module.exports.editMilestone = async (req, res) => {

    //find project
    try {
        project = await Project.findOne({
            where: {
                projectId: req.body.projectId
            }
        })
    } catch (error) {
        return res.status(500).json({
            error: "project not found"
        })

    }

    var start = new Date(project.startDate);
    var addedDate = new Date(start.setDate(start.getDate() + parseInt(req.body.milestoneDuration)))

    if (project.dueDate < addedDate) {
        return res.status(422).json({
            error: {
                "milestoneDuration": ["the milestone Duration you entered exceeds the project dueDate"]
            }
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
                error: 'couldnt update milestone'
            });
        });




};