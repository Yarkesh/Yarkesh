const Milestone = require('../../models/milestone');
const Project = require('../../models/projects');

module.exports.createMilestone = async (req, res) => {

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
    console.log(addedDate)
    if (project.dueDate < addedDate) {
        return res.status(422).json({
            error: {
                "milestoneDuration": ["the milestone Duration you entered exceeds the project dueDate"]
            }
        })
    }

    try {
        milestone = await Milestone.findOne({
            where: {
                projectId: req.body.projectId
            },
            order: [
                ['createdAt', 'DESC']
            ],
        })
    } catch (error) {
        return res.status(500).json({
            error: "cant get milestone number"
        })
    }
    if (milestone) {
        milestoneNo = parseInt(milestone.milestoneNo.split("milestone#")[1]) + 1
    } else {
        milestoneNo = 1
    }

    await Milestone.create({
            projectId: req.body.projectId,
            title: req.body.title,
            dueDate: addedDate,
            milestoneNo: 'milestone#' + milestoneNo,
            description: req.body.description,
        })
        .then((milestone) => {
            return res.status(200).json({
                milestone
            });
        })
        .catch(() => {
            return res.status(500).json({
                error: 'couldnt create milestone'
            });

        });


};

// module.exports.createMilestoneFromDate = (req, res) => {
//     Milestone.create({
//             title: req.body.title,
//             projectId: req.body.projectId,
//             dueDate: req.body.dueDate,
//             description: req.body.description,
//         })
//         .then((milestone) => {
//             return res.status(200).json({
//                 error: "milestone created successfully",
//                 milestone
//             });
//         })
//         .catch(() => {
//             return res.status(500).json({
//                 error: 'couldnt create milestone',
//                 errorCode: '373',
//             });

//         });
// };


// getLastMilestoneDueDate = (req) => {
//     return new Promise((res, rej) => {
//         Project.findOne({
//             where: {
//                 projectId: req.body.projectId
//             }
//         }).then(project => {
//             Milestone.findOne({
//                 where: {
//                     projectId: req.body.projectId
//                 },
//                 attributes: ['dueDate'],
//                 order: [
//                     ['dueDate', 'DESC']
//                 ]
//             }).then((milestone) => {
//                 if (!milestone) {
//                     res(new Date(project.createdAt.getTime() + 1))
//                 } else {
//                     res(new Date((milestone.dueDate.getTime())));
//                 }
//             }).catch(() => {
//                 // errorCode: "375"
//                 rej('375')
//             })
//         }).catch(() => {
//             // errorCode: "376"
//             rej('376')
//         })
//     })
// }