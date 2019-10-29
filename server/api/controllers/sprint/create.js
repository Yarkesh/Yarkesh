const Sprint = require('../../models/sprints');
const Project = require('../../models/projects');

module.exports.createSprint = (req, res) => {

    getLastDueDate(req).then(lastSprint => {
        Project.findOne({
            where: {
                projectId: req.body.projectId
            }
        }).then(project => {
            const start = new Date(lastSprint.getTime() + 2)
            const end = new Date(lastSprint.getTime())
            let due = new Date(end.setDate(start.getDate() + project.sprintDuration))
            Sprint.create({
                    projectId: req.body.projectId,
                    sprintName: req.body.sprintName,
                    status: "future",
                    startDate: start,
                    duration: project.sprintDuration,
                    dueDate: due,

                })
                .then((sprint) => {
                    return res.status(200).json({
                        sprintId: sprint.sprintId,
                        sprintName: sprint.sprintName,
                        startDate: sprint.startDate,
                        duration: sprint.duration,
                        dueDate: sprint.dueDate
                    });
                })
                .catch(() => {
                    return res.status(500).json({
                        message: 'couldnt create sprint',
                        errorCode: '357'
                    });
                });

        }).catch(() => {
            return res.status(500).json({
                message: 'couldnt create sprint',
                errorCode: '356'
            });
        })

    })



};

getLastDueDate = (req) => {
    return new Promise((res, rej) => {
        Sprint.findOne({
            where: {
                projectId: req.body.projectId
            },
            attributes: ['dueDate'],
            order: [
                ['dueDate', 'DESC']
            ]
        }).then((sprint) => {
                res(sprint.dueDate);
            }

        ).catch(() => {
            rej()
        })

    })



}