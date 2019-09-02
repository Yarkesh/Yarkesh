const Stories = require('../../models/stories');
const Sprints = require('../../models/sprints');
const Activities = require('../../models/activities');
const Dependency = require('../../models/dependencies');

exports.getProjectStories = (req, res) => {
    // finding projects created by this certain user
    Stories.findAll({
        where: {
            projectId: req.body.projectId
        },
        attributes: ['storyId', 'storyName']
    })
        .then((stories) => {
            return res.status(200).json({
                stories
            });
        })
        .catch((err) => {
            return res.status(500).json({
                message: 'finding story failed',
                err
            });
        });
};
exports.getProjectStoriesWithDetail = (req, res) => {
    // finding projects created by this certain user
    Stories.findAll({
        where: {
            projectId: req.body.projectId
        }
    })
        .then((stories) => {
            return res.status(200).json({
                stories
            });
        })
        .catch((err) => {
            return res.status(500).json({
                message: 'finding story failed',
                err
            });
        });
};


module.exports.getStoryDetials = (req, res) => {
    Stories.findAll({
        where: {
            storyId: req.body.storyId
        },
        include: [{
            model: Dependency,
            attributes: ['dependsOn']
        }]
    })
        .then((storyDetails) => {
            return res.status(200).json({
                storyDetails
            });
        })
        .catch((error) => {
            return res.status(500).json({
                error
            });
        });
};

exports.getProjectStoriesBacklog = (req, res) => {
    // finding projects created by this certain user
    Stories.findAll({
        where: {
            projectId: req.body.projectId
        },
        attributes: [
            'storyId',
            'storyName',
            'as',
            'iWant',
            'soThat',
            'status',
            'storyPoint',
            'priority',
            'isEpic'
        ],

        include: [{
            model: Sprints,
            attributes: ['sprintName'],
            as: 'sprint'
        },
        {
            model: Activities,
            attributes: ['activityName'],
            as: 'activity'
        }
        ]
    })
        .then((stories) => {
            return res.status(200).json({
                stories
            });
        })
        .catch((err) => {
            return res.status(500).json({
                message: 'finding story failed',
                err
            });
        });
};
