const Projects = require('../../models/projects');
const Users = require('../../models/users');
const Sprints = require('../../models/sprints');
const Stories = require('../../models/stories');
const Activities = require('../../models/activities');
const Milestone = require('../../models/milestone');
const Assignments = require('../../models/assignments');



exports.getProjectsByCreatorId = (req, res) => {
    // finding projects created by this certain user
    Projects.findAll({
            where: {
                creatorId: req.user.userId
            }
        })
        .then((projects) => {
            return res.status(200).json({
                projects
            });
        })
        .catch((err) => {
            return res.status(500).json({
                err
            });
        });
};



exports.getProjectDetails = (req, res) => {
    Projects.findOne({
            where: {
                projectId: req.body.projectId
            },
            include: [{
                    model: Users,
                    attributes: ['name'],
                    as: 'creator'
                },
                {
                    model: Sprints,
                    attributes: ['sprintName'],
                    as: 'activeSprint'
                }
            ]
        })
        .then((projectInfo) => {
            return res.status(200).json({
                projectInfo
            });
        })
        .catch((err) => {
            return res.status(500).json({
                err
            });
        });
};
//storymap
module.exports.getPorjectSprints = (req, res) => {
    Projects.findOne({
            where: {
                projectId: req.body.projectId
            },
            attributes: ['projectId'],
            include: [{
                    model: Sprints,
                    attributes: ['sprintId', 'sprintName'],
                    as: 'sprints',
                    include: [{
                        model: Stories,
                        attributes: ['storyName', 'storyId', 'activityId', 'storyPoint'],
                        as: 'stories',
                        include: [{
                            model: Assignments,
                            attributes: ['userId'],
                            as: 'assignedTo'
                        }]
                    }]
                },
                {
                    model: Activities,
                    attributes: ['activityName', 'activityId'],
                    as: 'activity'
                }
            ]
        })
        .then((storymap) => {
            return res.status(200).json({
                sprints: storymap.sprints,
                activities: storymap.activity
            });
        })
        .catch((err) => {
            return res.status(500).json({
                err
            });
        });
};

module.exports.getPorjectSprintsDetails2 = (req, res) => {
    Sprints.findAll({
        where: {
            projectId: req.body.projectId
        },
        attributes: ['sprintId', 'sprintName'],
        order: ['createdAt'],
        include: [{
            model: Stories,
            attributes: ['storyId', 'storyName'],
            as: 'stories'
        }]
    }).then((sprints) => {
        pool = sprints[0];
        sprints.splice(0, 1);
        return res.status(200).json({
            Pool: pool,
            Others: sprints
        });
    });
};

module.exports.getProjectTimeline = (req, res) => {
    Sprints.findAll({
        where: {
            projectId: req.body.projectId
        },
        attributes: ['sprintId', 'sprintName', 'startDate', 'duration', 'dueDate'],
        order: ['startDate'],
        include: [{
            model: Stories,
            attributes: ['storyId', 'storyName', 'storyPoint'],
            as: 'stories',
            include: [{
                model: Assignments,
                attributes: ['userId'],
                as: 'assignedTo'
            }]
        }]
    }).then((sprints) => {
        Milestone.findAll({
            where: {
                projectId: req.body.projectId
            },
            attributes: ['milestoneId', 'description', 'dueDate']
        }).then(milestone => {
            return res.status(200).json({
                sprints: sprints,
                milestone: milestone
            })
        }).catch(err => {
            return res.status(500).json({
                err
            })
        })
    });
};