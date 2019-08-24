const Dependency = require('../models/dependencies');
const {
    validationResult
} = require('express-validator');
const errorHandler = require('./errorHandler');

module.exports.createDependency = (req, res) => {
    const errorsList = validationResult(req).errors;
    const handledErrorsList = errorHandler.handler(errorsList);
    if (Object.keys(handledErrorsList).length > 0) {
        return res.status(422).json(handledErrorsList);
    }
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