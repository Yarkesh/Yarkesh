const Sprint = require('../models/sprints');
const Story = require('../models/stories');
const Project = require('../models/projects');
const Dependency = require('../models/dependencies');

module.exports.createDependency = (req, res) => {
    Dependency.findOne({
        where: {
            storyId: req.body.storyId,
            dependsOn: req.body.dependsOn
        }
    }).then((depended) => {
        if (depended) {
            return res.status(500).json({
                error: "This dependency already exists",
                depended
            });
        } else {
            Dependency.create({
                    storyId: req.body.storyId,
                    dependsOn: req.body.dependsOn
                })
                .then(() => {
                    return res.status(200).json({
                        message: 'dependency created'
                    });
                })
                .catch((err) => {
                    return res.status(500).json({
                        err
                    });
                });
        }
    })



};

module.exports.getStoryDependencies = (req, res) => {
    Dependency.findAll({
            where: {
                storyId: req.body.storyId
            }
        })
        .then((depends) => {
            return res.status(200).json({
                depends
            });
        })
        .catch((err) => {
            return res.status(500).json({
                err
            });
        });
};