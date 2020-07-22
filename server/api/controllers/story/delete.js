const Stories = require('../../models/stories');
// const Sprints = require('../models/sprints');
// const Activities = require('../models/activities');
// const Dependency = require('../models/dependencies');
// const DependencyController = require('./dependencyController');
// const AssignmentController = require('./assignmentController');
module.exports.deleteStory = (req, res) => {
    Stories.destroy({
            where: {
                projectId: req.body.projectId,
                storyId: req.body.storyId
            }
        })
        .then(() => {
            res.status(200).json({
                message: 'Story Deleted'
            });
        })
        .catch((error) => {
            res.status(500).json({
                error: "cant delete story"
            });
        });
};