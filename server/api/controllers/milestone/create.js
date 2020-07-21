const Milestone = require('../../models/milestone');
const Project = require('../../models/projects');

module.exports.createMilestone = (req, res) => {
    Project.findOne({
        where: {
            projectId: req.body.projectId
        }
    }).then(project => {
        var start = new Date(project.startDate);
        var addedDate = new Date(start.setDate(start.getDate() + req.body.milestoneDuration))
        // var DateAdded = new Date(addedDate)
        // console.log(addedDate)
        if (project.dueDate < addedDate) {
            return res.status(400).json({
                error: "the milestone Duration you entered exceeds the project dueDate"
            })
        }
        Milestone.count({
            where: {
                projectId: req.body.projectId
            }
        }).then(count => {
            Milestone.create({
                    projectId: req.body.projectId,
                    title: req.body.title,
                    dueDate: addedDate,
                    milestoneNo: 'milestone#' + (count + 1),
                    description: req.body.description,
                })
                .then((milestone) => {
                    return res.status(200).json({
                        milestone
                    });
                })
                .catch(() => {
                    return res.status(500).json({
                        error: 'couldnt create milestone',
                        errorCode: '373',
                    });

                });
        })

    })
    // }).catch((err) => {
    //     return res.status(500).json({
    //         message: 'couldnt create milestone',
    //         errorCode: err,
    //     });
    // })

};

module.exports.createMilestoneFromDate = (req, res) => {
    Milestone.create({
            title: req.body.title,
            projectId: req.body.projectId,
            dueDate: req.body.dueDate,
            description: req.body.description,
        })
        .then((milestone) => {
            return res.status(200).json({
                error: "milestone created successfully",
                milestone
            });
        })
        .catch(() => {
            return res.status(500).json({
                error: 'couldnt create milestone',
                errorCode: '373',
            });

        });
};


getLastMilestoneDueDate = (req) => {
    return new Promise((res, rej) => {
        Project.findOne({
            where: {
                projectId: req.body.projectId
            }
        }).then(project => {
            Milestone.findOne({
                where: {
                    projectId: req.body.projectId
                },
                attributes: ['dueDate'],
                order: [
                    ['dueDate', 'DESC']
                ]
            }).then((milestone) => {
                if (!milestone) {
                    res(new Date(project.createdAt.getTime() + 1))
                } else {
                    res(new Date((milestone.dueDate.getTime())));
                }
            }).catch(() => {
                // errorCode: "375"
                rej('375')
            })
        }).catch(() => {
            // errorCode: "376"
            rej('376')
        })
    })
}