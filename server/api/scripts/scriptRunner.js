const Users = require('../models/users');
const NotConfirmedUsers = require('../models/notConfirmedUsers');
const moment = require('moment')
const {
    Op
} = require('sequelize')
const Sprint = require('../models/sprints');
const Story = require('../models/stories');
const Project = require('../models/projects');
const _ = require('lodash');
const cron = require('node-cron');


module.exports.runAllScripts = () => {
    this.deleteLateNotConfirmedUsersScript(moment())
    this.setActiveSprintScript()

}

module.exports.deleteLateNotConfirmedUsersScript = (time) => {
    const job = cron.schedule(
        '0 0 0 */2 * *',
        () => {
            NotConfirmedUsers.destroy({
                where: {
                    createdAt: {
                        [Op.lt]: time.subtract(2, 'days').toDate()
                    }
                }
            }).then(() => {
                console.log("Date : ", new Date(), "Deleted notConfirmedUsers from 2 days ago")
            }).catch((err) => {
                console.log("ERROR", err)
            })
        }, {
            timezone: 'Asia/Tehran'
        }
    );
    job.start();
}

module.exports.setActiveSprintScript = () => {
    const job = cron.schedule(
        '0 0 0 * * *', this.setActiveSprint(moment()), {
            timezone: 'Asia/Tehran'
        }
    );

    job.start();
}


module.exports.setActiveSprint = (time) => {
    //find all projects
    Project.findAll({
        where: {},
    }).then((projects) => {
        projectIdList = (projects.map((project) => {
            return project.projectId;
        }))
        //foreach project
        _.forEach(projectIdList, (projectId) => {
            Sprint.findOne({
                where: {
                    startDate: {
                        [Op.lt]: time
                    },
                    dueDate: {
                        [Op.gt]: time
                    },
                    projectId: projectId
                },
            })


            Sprint.update({
                status: "active"
            }, {
                where: {
                    startDate: {
                        [Op.lt]: time
                    },
                    dueDate: {
                        [Op.gt]: time
                    },
                }
            })
            Sprint.update({
                status: "finished"
            }, {
                where: {
                    dueDate: {
                        [Op.lt]: time
                    }
                }
            })
            Sprint.update({
                status: "future"
            }, {
                where: {
                    startDate: {
                        [Op.gt]: time
                    }
                }
            })

        })
    })
}