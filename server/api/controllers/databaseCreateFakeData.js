const ProjectMembers = require('../models/projectMembers');
const Projects = require('../models/projects');
const Users = require('../models/users');
const Sprints = require('../models/sprints');
const Activities = require('../models/activities');
const createDependencyController = require('./dependency/create');
const Stories = require('../models/stories');
const config = require('config');
const Milestone = require('../models/milestone')

exports.createUsers = async (req, res, next) => {
    await Users.bulkCreate(
        [{
                userName: 'test',
                email: 'test@test.com',
                name: 'test',
                password: '$2b$10$kMvKfmtilo4KbZqzIHPg8uBB33jZlj1Bpt9Eid.u7R2FprQ4BRIje',
                avatar: config.get('app.webServer.baseUrl') + '/pictures/users/defaultAvatar.jpg'
            },
            {
                userName: 'ali',
                email: 'ali@ali.com',
                name: 'ali',
                password: '$2b$10$kMvKfmtilo4KbZqzIHPg8uBB33jZlj1Bpt9Eid.u7R2FprQ4BRIje',
                avatar: config.get('app.webServer.baseUrl') + '/pictures/users/defaultAvatar.jpg'
            },
            {
                userName: 'mamad',
                email: 'mamad@mamad.com',
                name: 'mamad',
                password: '$2b$10$kMvKfmtilo4KbZqzIHPg8uBB33jZlj1Bpt9Eid.u7R2FprQ4BRIje',
                avatar: config.get('app.webServer.baseUrl') + '/pictures/users/defaultAvatar.jpg'
            },
            {
                userName: 'jack',
                email: 'jack@jack.com',
                name: 'jack',
                password: '$2b$10$kMvKfmtilo4KbZqzIHPg8uBB33jZlj1Bpt9Eid.u7R2FprQ4BRIje',
                avatar: config.get('app.webServer.baseUrl') + '/pictures/users/defaultAvatar.jpg'
            },

            {
                userName: 'meti',
                email: 'meti@meti.com',
                name: 'meti',
                password: '$2b$10$kMvKfmtilo4KbZqzIHPg8uBB33jZlj1Bpt9Eid.u7R2FprQ4BRIje',
                avatar: config.get('app.webServer.baseUrl') + '/pictures/users/defaultAvatar.jpg'
            },
            {
                userName: 'alij',
                email: 'alij@alij.com',
                name: 'alij',
                password: '$2b$10$kMvKfmtilo4KbZqzIHPg8uBB33jZlj1Bpt9Eid.u7R2FprQ4BRIje',
                avatar: config.get('app.webServer.baseUrl') + '/pictures/users/defaultAvatar.jpg'
            }
        ]
    );
    await Users.count().then(count => {
        for (let index = count + 1; index < count + 51; index++) {
            Users.create({
                userName: `user${index}`,
                email: `user${index}@test.com`,
                name: `user${index}`,
                password: '$2b$10$kMvKfmtilo4KbZqzIHPg8uBB33jZlj1Bpt9Eid.u7R2FprQ4BRIje',
                avatar: config.get('app.webServer.baseUrl') + '/pictures/users/defaultAvatar.jpg'
            })

        }
    })
    return next()
};


exports.createProjects = async (req, res, next) => {
    //first project for test
    var startDate = new Date();
    var startDate = new Date(startDate.setDate(startDate.getDate() + 7));
    var dueDate = new Date(startDate)
    var dueDate = new Date(dueDate.setDate(dueDate.getDate() + 150));
    randomSprintLength = 14
    await Projects.create({
        startDate,
        dueDate,
        creatorId: '1',
        sprintDuration: randomSprintLength,
        title: `TEST`,
        description: `TEST description`,
        logo: config.get('app.webServer.baseUrl') + "/pictures/projects/defaultLogo.jpg"
    }).then(async project => {
        var now = new Date(project.startDate.getTime() + 2)
        var now2 = new Date(project.startDate);
        var start = new Date(project.startDate);

        await Milestone.create({
            projectId: project.projectId,
            title: 'MVP',
            milestoneNo: 'milestone#1',
            dueDate: new Date(start.setDate(start.getDate() + 60)),
            description: 'Your first initial software'
        })
        await ProjectMembers.create({
            memberId: 1,
            projectId: project.projectId
        })
        await Activities.create({
            activityName: 'Default Activity',
            projectId: project.projectId
        }).then(async activity => {
            await Sprints.count({
                where: {
                    projectId: project.projectId
                }
            }).then(async count => {
                await Sprints.create({
                    projectId: project.projectId,
                    sprintName: 'Story Pool',
                    status: 'Open',
                    sprintNo: 'Story Pool',
                    startDate: now,
                    duration: project.sprintDuration,
                    dueDate: now2.setDate(now2.getDate())
                }).then(async sprint => {
                    await Projects.update({
                        defaultSprintId: sprint.sprintId,
                        defaultActivityId: activity.activityId
                    }, {
                        where: {
                            projectId: project.projectId
                        }
                    })
                })
            })
        })


    })

    // -------------------------------------------------------------------------------------------//





    // await Projects.count().then(async count => {
    //     for (let index = count + 1; index < count + 31; index++) {
    //         var startDate = new Date();
    //         var startDate = new Date(startDate.setDate(startDate.getDate() + Math.floor(Math.random() * 30)));
    //         var dueDate = new Date(startDate)
    //         var dueDate = new Date(dueDate.setDate(dueDate.getDate() + Math.floor(Math.random() * 60) + 60));
    //         randomSprintLength = Math.floor(Math.random() * 20) + 7
    //         await Projects.create({
    //             startDate,
    //             dueDate,
    //             creatorId: '1',
    //             sprintDuration: randomSprintLength,
    //             title: `project${index}`,
    //             description: `project${index} description`,
    //             logo: config.get('app.webServer.baseUrl') + "/pictures/projects/defaultLogo.jpg"
    //         }).then(async project => {
    //             var now = new Date(project.startDate.getTime() + 2)
    //             var now2 = new Date(project.startDate);
    //             var start = new Date(project.startDate);

    //             await Milestone.create({
    //                 projectId: project.projectId,
    //                 title: 'MVP',
    //                 milestoneNo: 'milestone#1',
    //                 dueDate: new Date(start.setDate(start.getDate() + 60)),
    //                 description: 'Your first initial software'
    //             })
    //             await ProjectMembers.create({
    //                 memberId: 1,
    //                 projectId: project.projectId
    //             })
    //             await Activities.create({
    //                 activityName: 'Default Activity',
    //                 projectId: project.projectId
    //             }).then(async activity => {
    //                 await Sprints.count({
    //                     where: {
    //                         projectId: project.projectId
    //                     }
    //                 }).then(async count => {
    //                     await Sprints.create({
    //                         projectId: project.projectId,
    //                         sprintName: 'Story Pool',
    //                         status: 'Open',
    //                         sprintNo: 'Story Pool',
    //                         startDate: now,
    //                         duration: project.sprintDuration,
    //                         dueDate: now2.setDate(now2.getDate())
    //                     }).then(async sprint => {
    //                         await Projects.update({
    //                             defaultSprintId: sprint.sprintId,
    //                             defaultActivityId: activity.activityId
    //                         }, {
    //                             where: {
    //                                 projectId: project.projectId
    //                             }
    //                         })
    //                     })
    //                 })
    //             })
    //         })
    //     }
    // })




    // await Projects.count().then(async count => {
    //     for (let index = count + 1; index < count + 100; index++) {
    //         var startDate = new Date();
    //         var startDate = new Date(startDate.setDate(startDate.getDate() + Math.floor(Math.random() * 30)));
    //         var dueDate = new Date(startDate)
    //         var dueDate = new Date(dueDate.setDate(dueDate.getDate() + Math.floor(Math.random() * 60) + 60));
    //         randomNumber = Math.floor(Math.random() * 5) + 1;
    //         randomSprintLength = Math.floor(Math.random() * 20) + 7
    //         await Projects.create({
    //             startDate,
    //             dueDate,
    //             creatorId: randomNumber,
    //             sprintDuration: randomSprintLength,
    //             title: `project${index}`,
    //             description: `project${index} description`,
    //             logo: config.get('app.webServer.baseUrl') + "/pictures/projects/defaultLogo.jpg"
    //         }).then(async project => {
    //             var now = new Date(project.startDate.getTime() + 2)
    //             var now2 = new Date(project.startDate);
    //             var start = new Date(project.startDate);

    //             await Milestone.create({
    //                 projectId: project.projectId,
    //                 title: 'MVP',
    //                 milestoneNo: 'milestone#' + (count + 1),
    //                 dueDate: new Date(start.setDate(start.getDate() + 60)),
    //                 description: 'Your first initial software'
    //             })
    //             await ProjectMembers.create({
    //                 memberId: randomNumber,
    //                 projectId: project.projectId
    //             })
    //             await Activities.create({
    //                 activityName: 'Default Activity',
    //                 projectId: project.projectId
    //             }).then(async activity => {
    //                 await Sprints.count({
    //                     where: {
    //                         projectId: project.projectId
    //                     }
    //                 }).then(async count => {
    //                     await Sprints.create({
    //                         projectId: project.projectId,
    //                         sprintName: 'Story Pool',
    //                         status: 'Open',
    //                         sprintNo: 'Story Pool',
    //                         startDate: now,
    //                         duration: project.sprintDuration,
    //                         dueDate: now2.setDate(now2.getDate())
    //                     }).then(async sprint => {
    //                         await Projects.update({
    //                             defaultSprintId: sprint.sprintId,
    //                             defaultActivityId: activity.activityId
    //                         }, {
    //                             where: {
    //                                 projectId: project.projectId
    //                             }
    //                         })
    //                     })
    //                 })
    //             })


    //         })
    //     }
    // })

    return next()
};

exports.createMilestones = async (req, res, next) => {
    Projects.findOne({
        where: {
            projectId: 1,
            title: 'TEST'
        }
    }).then(async project => {
        for (let index = 2; index < 6; index++) {
            var start = new Date(project.startDate);
            await Milestone.create({
                projectId: project.projectId,
                title: `my milestone ${index}`,
                milestoneNo: `milestone#${index}`,
                dueDate: new Date(start.setDate(start.getDate() + 60 + (index - 1) * 30)),
                description: `description for your milestone here. milestone ${index}`
            })
        }
    })

    return next()
}


exports.createSprints = async (req, res, next) => {
    await Projects.findOne({
        where: {
            projectId: 1,
            title: 'TEST'
        }
    }).then(async project => {
        for (let index = 1; index < 11; index++) {
            await Sprints.findOne({
                where: {
                    projectId: project.projectId
                },
                attributes: ['dueDate'],
                order: [
                    ['dueDate', 'DESC']
                ]
            }).then(async (sprint) => {
                    const start = new Date(sprint.dueDate.getTime() + 2)
                    const end = new Date(sprint.dueDate.getTime())
                    let due = new Date(end.setDate(start.getDate() + project.sprintDuration))
                    await Sprints.count({
                        where: {
                            projectId: project.projectId
                        }
                    }).then(async count => {
                        Sprints.create({
                            projectId: project.projectId,
                            sprintName: `my sprint${index}`,
                            status: "future",
                            sprintNo: 'sprint#' + (count),
                            startDate: start,
                            duration: project.sprintDuration,
                            dueDate: due,
                        })
                    })
                }

            )
        }
    })

    return next()
}

exports.createActivities = async (req, res, next) => {
    await Projects.findOne({
        where: {
            projectId: 1,
            title: 'TEST'
        }
    }).then(async project => {
        for (let index = 1; index < 11; index++) {
            await Activities.create({
                projectId: project.projectId,
                activityName: `my activity ${index}`
            })

        }
    })

    return next()
}

exports.createMembers = async (req, res, next) => {
    await Projects.findOne({
        where: {
            projectId: 1,
            title: 'TEST'
        }
    }).then(async project => {
        for (let index = 2; index < 7; index++) {
            ProjectMembers.create({
                memberId: index,
                projectId: project.projectId
            })
        }
    })
    return next()
}

exports.createStories = async (req, res, next) => {
    await Projects.findOne({
        where: {
            projectId: 1,
            title: 'TEST'
        }
    }).then(project => {
        priorities = ['could', 'should', 'must']
        for (let index = 1; index < 50; index++) {
            Stories.create({
                storyName: `Story${index}`,
                sprintId: Math.floor(Math.random() * 9) + 1,
                activityId: Math.floor(Math.random() * 9) + 1,
                as: "some person",
                iWant: "something",
                soThat: "something happens",
                acceptanceTest: {
                    "test": [{
                            "text": "test 1",
                            "done": "true"
                        },
                        {
                            "text": "test 2",
                            "done": "false"
                        }
                    ]
                },
                status: "todo",
                storyPoint: Math.floor(Math.random() * 5) + 1,
                priority: priorities[Math.floor(Math.random() * 3)],
                isEpic: Math.random() >= 0.2,
                dependency: [],
                assignment: [],
                creatorId: "1",
                projectId: "1"
            })

        }
    })
    return res.json({
        mess: "done"
    })

}