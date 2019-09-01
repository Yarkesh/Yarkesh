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

module.exports.createDependencyFromList = (dependsOnList, storyId) => {
    let depRes = true
    for (let dependsOn in dependsOnList) {

        Dependency.findOne({
            where: {
                storyId: storyId,
                dependsOn: dependsOn
            }
        }).then((depended) => {
            if (depended) {
                console.log('This dependency already exists', depended.dataValues);
            } else {
                Dependency.create({
                        storyId: storyId,
                        dependsOn: dependsOn
                    })
                    .then((dependency) => {
                        console.log('dependency created', dependency.dataValues);
                    })
                    .catch((err) => {
                        depRes = false;
                        console.log('Error', err);
                    });
            }
        });
    }
    return;
};