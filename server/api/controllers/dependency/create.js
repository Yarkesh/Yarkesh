const Dependency = require('../../models/dependencies');
const Stories = require('../../models/stories');

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
                    projectId: req.body.projectId,
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
            if (!story) {
                reject()
            } else {
                respond(story)
            }
        })
    })
};
module.exports.createDependencyFromList = (projectId, dependencyList, storyId) => {
    return new Promise((respond, reject) => {
        if (dependencyList.length == 0) {
            respond()
        }
        for (let dependsOn of dependencyList) {
            isDependencyInProject(projectId, dependsOn)
                .then(isInProject => {
                    Dependency.findOne({
                        where: {
                            storyId: storyId,
                            dependsOn: dependsOn
                        }
                    }).then((depended) => {
                        if (depended) {
                            respond(depended)
                        } else {
                            Dependency.create({
                                    projectId: projectId,
                                    storyId: storyId,
                                    dependsOn: dependsOn
                                })
                                .then((dependency) => {
                                    respond(dependency)
                                })
                                .catch((err2) => {
                                    reject(err2)
                                });
                        }
                    });
                }).catch(err => {
                    reject(err)
                })

        }
    })

};

module.export = isDependencyInProject