const Sprint = require('../../models/sprints');
const Project = require('../../models/projects');
// const Story = require('../models/stories');

module.exports.createSprint = (req, res) => {
    getLastDueDate(req).then(lastSprint => {

        // console.log(lastSprint.dueDate);

        Project.findOne({
            where: {
                projectId: req.body.projectId
            }
        }).then(project => {

            var start = lastSprint;
            var due = lastSprint.setDate(lastSprint.getDate() + project.sprintDuration);
            // console.log("1", lastSprin1.dataValues)
            // console.log("2", lastSprint2.dataValues)
            // console.log(lastSprint2.dueDate);

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
                .catch((err) => {
                    return res.status(500).json({
                        err
                    });
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
                ['createdAt', 'DESC']
            ]
        }).then((sprint) => {
            // console.log(sprint.dueDate);

            res(sprint.dueDate);
        }

        ).catch(() => {
            rej()
        })

    })



}
