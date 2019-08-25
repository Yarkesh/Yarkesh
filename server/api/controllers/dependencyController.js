const Dependency = require('../models/dependencies');
const {
    validationResult
} = require('express-validator');
const errorHandler = require('./errorHandler');

module.exports.createDependency = (req, res) => {
    Dependency.findOne({
        where: {
            storyId: req.body.storyId,
            dependsOn: req.body.dependsOn
        }
    }).then((depended) => {
        if (depended) {
            return res.status(500).json({
                error: 'This dependency already exists',
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
    });
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

module.exports.createDependencyFromList = (dependsOnList, storyId) => {
    //TODO check if story or dependsOn do not exist
    dependsOnList.forEach((dependsOn) => {
        Dependency.findOne({
            where: {
                storyId: storyId,
                dependsOn: dependsOn
            }
        }).then((depended) => {
            if (depended) {
                // return res.status(500).json({
                // 	error: 'This dependency already exists',
                // 	depended
                // });
                console.log('This dependency already exists', depended.dataValues);
            } else {
                Dependency.create({
                        storyId: storyId,
                        dependsOn: dependsOn
                    })
                    .then((dependency) => {
                        // return res.status(200).json({
                        // 	message: 'dependency created'
                        // });
                        console.log('dependency created', dependency.dataValues);
                    })
                    .catch((err) => {
                        // return res.status(500).json({
                        // 	err
                        // });
                        console.log('Error', err);
                    });
            }
        });
    });
    return;
};