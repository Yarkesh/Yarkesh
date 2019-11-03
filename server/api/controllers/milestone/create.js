const Milestone = require('../../models/milestone');
const Project = require('../../models/projects');

module.exports.createMilestone = (req, res) => {
    getLastMilestoneDueDate(req).then(lastMilestone => {
        Project.findOne({
            where: {
                projectId: req.body.projectId
            }
        }).then(project => {
            const end = new Date(lastMilestone.getTime())
            Milestone.create({
                    projectId: req.body.projectId,
                    title: req.body.title,
                    dueDate: new Date(end.setDate(end.getDate() + project.sprintDuration * req.body.howManyDurations)),
                    description: req.body.description,
                })
                .then((milestone) => {
                    return res.status(200).json({
                        milestone
                    });
                })
                .catch(() => {
                    return res.status(500).json({
                        message: 'couldnt create milestone',
                        errorCode: '373',
                    });

                });
        })
    }).catch((err) => {
        return res.status(500).json({
            message: 'couldnt create milestone',
            errorCode: err,
        });
    })

};

module.exports.createMilestoneFromDate = (req, res) => {
    Milestone.create({
            title: req.body.title,
            projectId: req.body.projectId,
            dueDate: new Date(req.body.dueDate),
            description: req.body.description,
        })
        .then((milestone) => {
            return res.status(200).json({
                message: "milestone created successfully",
                milestone
            });
        })
        .catch(() => {
            return res.status(500).json({
                message: 'couldnt create milestone',
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