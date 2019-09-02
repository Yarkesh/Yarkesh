const Dependency = require('../../models/dependencies');

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

const isDependencyInProject = (projectId, dependsOnId) => {
    return new Promise((respond, reject) => {
        Stories.findOne({
            where: {
                storyId: dependsOnId,
                projectId: projectId
            }
        }).then((story) => {
            console.log("STORY : ", story.dataValues)
            if (!story) {
                respond(false)
            } else {
                respond(true)
            }
        })
    })
};
module.exports.createDependencyFromList = (req) => {
    for (let dependsOn of req.body.dependency) {
        return new Promise((respond, reject) => {
            isDependencyInProject(req.body.projectId, dependsOn)
                .then(isInProject => {
                    if (isInProject) {
                        console.log("then", dependsOn)
                        Dependency.findOne({
                            where: {
                                storyId: req.body.storyId,
                                dependsOn: dependsOn
                            }
                        }).then((depended) => {
                            if (depended) {
                                // console.log('This dependency already exists', depended.dataValues);
                            } else {
                                Dependency.create({
                                        storyId: req.body.storyId,
                                        dependsOn: dependsOn
                                    })
                                    .then((dependency) => {
                                        // console.log('dependency created', dependency.dataValues);
                                    })
                                    .catch((err2) => {
                                        // console.log('Error', err);
                                        respond(err2)
                                    });
                            }
                        });
                    } else if (!isInProject) {
                        console.log("catch", dependsOn);
                        respond(false)
                    }

                })
        })
    }


};

module.export = isDependencyInProject